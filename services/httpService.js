// import axios from "axios";

import Axios from "axios";
import { setupCache } from "axios-cache-adapter";
import localforage from "localforage";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";

import logger from "./logService";

// const token = localStorage.getItem("token");
// axios.defaults.headers.common["x-auth-token"] = token;
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type,Accept, Authortization";
// axios.defaults.headers.common["Acces-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS";

// import {setup} from 'axios-cache-adapter'

// in minutes
let maxAge = 20;

// fetch(`/Configuration.json`)
//     .then((r) => r.json())
//     .then((data) => {
//         //
//         maxAge = data.cacheTimeLimit;
//     });

const CACHE_MAX_AGE = maxAge * 60 * 1000;

// Extracting 'axios-cache-adapter/src/exclude' as importing it leads to webpack not compiling it.
function exclude(config = {}, req) {
  const { exclude = {}, debug } = config;

  if (typeof exclude.filter === "function" && exclude.filter(req)) {
    debug(`Excluding request by filter ${req.url}`);

    return true;
  }

  // do not cache request with query
  const hasQueryParams = req.url.match(/\?.*$/) || !isEmpty(req.params);

  if (exclude.query && hasQueryParams) {
    debug(`Excluding request by query ${req.url}`);

    return true;
  }

  const paths = exclude.paths || [];
  const found = find(paths, (regexp) => req.url.match(regexp));

  if (found) {
    debug(`Excluding request by url match ${req.url}`);

    return true;
  }

  return false;
}

// Create a store.
const cacheStore = localforage.createInstance({ name: "mc-academy" });

// Define the cache adapter.
const cacheAdapter = setupCache({
  // Attempt reading stale cache data when response status is either 4xx or 5xx
  readOnError: (error, request) => {
    return error?.response?.status >= 400 && error?.response?.status < 600;
  },
  // Deactivate `clearOnStale` option so that we can actually read stale cache data
  clearOnStale: false,

  // Invalidate only when a specific option is passed through config
  invalidate: async (config, request) => {
    if (request.clearCacheEntry) {
      await config.store.removeItem(config.uuid);
    }
  },

  debug: false,
  exclude: {
    filter: (req) => {
      const method = req.method.toLowerCase();
      return (req.cache && req.cache.exclude) || method !== "get";
    },
  },
  key: (req) => {
    return (req.cache && req.cache.key) || req.url;
  },
  maxAge: CACHE_MAX_AGE,
  store: cacheStore,
});

const getKey = cacheAdapter.config.key;
const debug = cacheAdapter.config.debug;

// Our adapter factory which handles network errors, and groups.
const myAdapter = function (adapter) {
  return async function (req) {
    const isExcluded = exclude(cacheAdapter.config, req);
    const key = getKey(req);

    // Add the key to the groups.
    if (!isExcluded && req.cache && req.cache.groups) {
      const groupsCacheKey = "__groups";
      const groupsKeys = (await cacheStore.getItem(groupsCacheKey)) || {};
      let hasSetAny = false;

      // Loop over each group.
      for (let group of req.cache.groups) {
        if (!(group in groupsKeys)) {
          groupsKeys[group] = [];
        }
        if (groupsKeys[group].indexOf(key) < 0) {
          hasSetAny = true;
          groupsKeys[group].push(key);
        }
      }

      // Commit the changes.
      if (hasSetAny) {
        await cacheStore.setItem(groupsCacheKey, groupsKeys);
      }
    }

    let res;
    try {
      res = await adapter(req);
    } catch (e) {
      debug("request-failed", req.url);
      if (
        e.request &&
        req.cache &&
        req.cache.useOnNetworkError &&
        !isExcluded
      ) {
        // Mimic the behaviour of axios-cache-adapter, but directly get from store.
        res = await cacheStore.getItem(key);
        if (res && res.data) {
          res = res.data;
          res.config = req;
          res.request = {
            networkError: true,
            fromCache: true,
          };
          return res;
        }
      }

      throw e;
    }

    return res;
  };
};

const axios = Axios.create({
  // The cache adapter.
  //adapter: myAdapter(cacheAdapter.adapter),
  cache: {
    // key: null,
    useOnNetworkError: true,
  },
});

const get = async function (url, config) {
  return axios.get(url, config);
};

const clearCacheByKey = async function (key) {
  console.log("Clearing cache by key: " + key);
  let result = await cacheStore.getItem(key);
  if (result && "expires" in result) {
    result.expires = 1;
    await cacheStore.setItem(key, result);
  }
};

const clearCacheByGroup = async function (group) {
  console.log("Clearing cache by group: " + group);
  const groups = (await cacheStore.getItem("__groups")) || {};
  const keys = groups[group] || [];
  for (let key of keys) {
    await clearCacheByKey(key);
  }
};

const clearCacheByGroups = function (groups) {
  return Promise.all(groups.map(clearCacheByGroup));
};

const purgeCache = async function () {
  console.log("Clearing all caches");
  await cacheStore.clear();
};

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
}

export default {
  get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,

  clearCacheByKey,
  clearCacheByGroup,
  clearCacheByGroups,
  purgeCache,
};
