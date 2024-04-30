import axios from "axios";
import _ from "lodash";
import { encrypt } from "./crpyto";
import http from "./httpService";

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

//const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const proxyUrl = "";

const apiEndpoint = proxyUrl + process.env.NEXT_PUBLIC_API_BASE_URL;

const options = {
  clearCacheEntry: false,
  headers: {
    "content-type": "application/json",
  },
};

const NEXT_PUBLIC_GOOGLE_PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLuMXTPrPYIxuW\nNDlADYalKeLX4eroBy/lo3CPsUCxBPbX0omdWQN8HdMjndFfs+8C4zdA0diysPo4\nJI6BN9mxcys/6RMW5IhI89MKRE4x/Q6mVF6Hq44xA4t/AeTWgc3BrUrwzqPFkYTD\n7lOwFiTxdbZn/7wJQvFh08L6fGbd+eu8PzlyUiICK0jskoL3fK/LxUUQJhUldrge\n8VyaJAoe8SQ17G+6qOssyqPjL4NBuXKzEe5uQmnnNy7r4dS8gIJ7uhqJspHyiNYx\nB0PnNoTDLQIRYvk2HjCOzTQfpprNEJcu2nw2/QcwBo08lDp/OBj3P5VzhbAk9zj6\nPPG2PE4ZAgMBAAECggEAHtnPy4UhWHKTSOnbtEwtaccFZ/VPIkLZtAhOPCnMRtfI\n8eIbnk0j7qCC9aUpVzmOe9Ig70YCxPzGx8hxdDbFrCO+waJFlnVBVkWRCMBTVH/4\nFKQ43zQnB7EmZ4jH44bWEVBxmt9lhGkxwTd5oPRENUoYN3j45tt7u87ae3MUuOSi\nIjtFu+6wrJIjDTZcCWr+g7QVZXpa4voSAY2zlFye2ym5t8rT4/BsvUfAzkNUyOan\nx3YRIaHwJTjoyKOiZjTnGau1ftzCTZVv0Z7K03Eew0NNuoPRjpIhbf5WRXWQXqa9\ntwIuTsrMeq6iBsZgHi1YsM0DnhA5q1E+kkvwOYpbqQKBgQDyoxNzd0mhjtmwNS8z\noGRa+qLLNKpJwyauvLBk8AXqeeoBSNfiVZFg3fher2YwnilGIUk7cjP9rfkKy9oy\nIekHTUNY+fOtsb+bd39FByKvAob1ROEezei41FpIe7MrVQUzgV6x4t7+ujENL8mz\n1PEPta+YzOo1iBlriCrAlgQ0+wKBgQDW8Qh81MuK8Sgp1bPtjRTtnyWlaNNdiOBS\naJtSTdrWevfX7byi4zfRNynzmxkEdX3k6OvQ0+j1OvPNPorVKjK2SYtTu1TdNgK/\nujQMpLexQJY0Mzb2OHIiywPPFTE1aLGq0ynDzaYXUGLnT7DzDkmKp18jjiQk5sT0\n9QY1uw5U+wKBgEJ7Zmf75mPrBUCfwfguWXEIPbTaEFK3sxCryNVPYv+VOgXyFJ0C\nfxwAlf4zpxdpLrv1gOBV8WLv2U4Y/wc/fV8vz2VAz4DnNC3/9xJN2zYCxkHMBrbv\nCnYiUT6NDlGwMQWky/KHzDwVfj0zu9uXXBnG2X9PnljemsB5BeXQ9QQjAoGBAKIl\nHHEHGjFLcS/1/ZDjj/kdyIl6hZCW9BpWvW0ePEr2YsdqmZYLcI0MX0JdK0c41ur7\nZwGXCrMMcOTRHGxoM+9dlZRpykBCQVqfPiqXi9dUULs6M2kU9c0Xd10dsIyI2RZz\ny5rhJT2LL8EtVeBVU9ccIeIxlUSdLdFYkgGwhcRHAoGBAJunwAkt8Hwp6MOVxrhv\ngQ6iHGJDTGrT8UeYcI7lYytTIuRel/axISQIQ/inYbK65oMsi31dU73hhIxeG/no\nfz6hCpgn+C5eqsPBaF0+izc0gx/nIGT6u3jZzPDUsEnDq/zkPoOjbkbshtnGMSzf\nKGKMqNPp4p+knMtWc4K+3Rgj\n-----END PRIVATE KEY-----\n";
const NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL =
  "mundonodejs@steam-talent-385412.iam.gserviceaccount.com";

const serviceAccountAuth = new JWT({
  email: NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
  key: NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export function checkSession(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/public/api/check-auth-token",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function proctoringinit(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: currentURL + "/api/proctor",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  return axios(config);
}
export function proctoringReport(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: currentURL + "/api/proctorreport",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  return axios(config);
}

export function sendOTP(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/send-otp",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}

export function verifyOTP(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/verify-otp",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}

export function uploadProfilePic(data) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/upload-profile-pic",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };

  return axios(config);
}

export function saveProctoringReport(data) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/save-exam-reports",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };

  return axios(config);
}

export function login(req, clearCacheEntry = false) {
  const encryptedPassword = encrypt(req.password);

  var data = JSON.stringify({
    email: req.email,
    password: encryptedPassword,
    course_id: req.course_id,
  });

  var config = {
    method: "post",
    url: apiEndpoint + "/public/api/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function signup(req, clearCacheEntry = false) {
  const encryptedPassword = encrypt(req.password);

  const data = JSON.stringify({
    email: req.email,
    password: encryptedPassword,
    phone_number: req.phone_number,
    adult: 1,
    accept_private_policy: 1,
    walletAddress: req.walletAddress,
    name: req.fullName,
    is_phone_verified: req.is_phone_verified,
    course_id: req.course_id,
  });

  var config = {
    method: "post",
    url: apiEndpoint + "/public/api/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function changePassword(req, clearCacheEntry = false) {
  const currentPassword = encrypt(req.currentPassword);
  const newPassword = encrypt(req.newPassword);

  const data = JSON.stringify({
    currentPassword,
    newPassword,
  });

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/reset-password",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function editProfile(req, clearCacheEntry = false) {
  const data = JSON.stringify({
    name: req.firstName,
    last_name: req.last_name,
    address_line1: req.address_line1,
    address_line2: req.address_line2,
    state: req.state,
    country: req.country,
    phone_number: req.phone_number,
    date_birth: "",
    gender: "",
  });

  var config = {
    method: "post",
    url: apiEndpoint + "/public/api/edit-profile",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export async function getCategories(req, clearCacheEntry = false) {
  const optionsWithAuth = {
    headers: {
      "content-type": "application/json",
      language: localStorage.getItem("language_code") === "en" ? "en" : null,
    },
  };

  return http.get(apiEndpoint + "/api/categories", optionsWithAuth);
}

export async function tokenValue(req, clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,
    headers: {
      "content-type": "application/json",
    },
  };

  return http.get(apiEndpoint + "/public/api/token-value", optionsWithAuth);
}
export async function getCourseList(req, clearCacheEntry = false) {
  const optionsWithAuth = {
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
      language: localStorage.getItem("language_code") === "en" ? "en" : null,
    },
  };
  const url =
    req === undefined
      ? "/api/course-list"
      : "/api/course-list?search=" + req + "";
  return http.get(apiEndpoint + url, optionsWithAuth);
}
export async function getPackageList(req, clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,
    headers: {
      "content-type": "application/json",
    },
  };

  return http.get(apiEndpoint + "/api/package-list", optionsWithAuth);
}
export async function getPackageDetails(id, clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "content-type": "application/json",
    },
  };

  return http.get(apiEndpoint + "/api/package-details/" + id, optionsWithAuth);
}

export async function getCourseDetails(id, clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
      language: localStorage.getItem("language_code") === "en" ? "en" : null,
    },
  };

  return http.get(apiEndpoint + "/api/course-details/" + id, optionsWithAuth);
}

export function addToCart(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/cart",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function forgotPassword(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/public/api/forgot-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}
// /api/user/expert-talk
export function expertTalk() {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/expert-talk",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return axios(config);
}

export function resetPassword(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/public/api/change-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export async function getUserWishList(clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,

    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return http.get(apiEndpoint + "/api/user/wish/list", optionsWithAuth);
}

export function addToWishlist(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/wish",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function removeFromWishList(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);
  const config = {
    method: "delete",
    url: apiEndpoint + "/api/user/wish",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };
  return axios(config);
}

export function claimRewards(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/clain-rewards",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function claimMCRewards(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/collect-mc-wallet-reward",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}
export function edit_Profile(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/edit-profile",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}
export function startCourseRequest(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/start-course-request",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function updateDefaultWallet(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/wallet/default",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function removeItemFromCart(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);
  const config = {
    method: "delete",
    url: apiEndpoint + "/api/user/cart",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };
  return axios(config);
}

export function deleteUserWallet(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);
  const config = {
    method: "delete",
    url: apiEndpoint + "/api/user/wallet",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };
  return axios(config);
}

export async function getUserCartList(clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,

    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return http.get(apiEndpoint + "/api/user/cart/list", optionsWithAuth);
}

export async function getUserWalletList(clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,

    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return http.get(apiEndpoint + "/api/user/wallet/list", optionsWithAuth);
}

export async function getMyCourses(clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,

    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
      // language: localStorage.getItem("language_code") === "en" ? "en" : null,
    },
  };
  return http.get(apiEndpoint + "/api/user/my-courses", optionsWithAuth);
}
export function getCourseInit(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/course-init",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
      language:
        localStorage.getItem("language_code") === null ||
        localStorage.getItem("language_code") === "es"
          ? null
          : localStorage.getItem("language_code"),
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function endLecture(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "put",
    url: apiEndpoint + "/api/user/end-lecture",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

export function getUserProfileDetails() {
  var config = {
    method: "get",
    url: apiEndpoint + "/api/user/",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return axios(config);
}

export function getMCWalletBalance() {
  var axios = require("axios");

  var config = {
    method: "get",
    url: apiEndpoint + "/api/user/wallet-info",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return axios(config);
}

export function getAddressList() {
  var axios = require("axios");

  var config = {
    method: "get",
    url: apiEndpoint + "/api/user/address-list",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return axios(config);
}

export function getNFTData(hash) {
  var axios = require("axios");

  var config = {
    method: "get",
    url: "https://ipfs.io/ipfs/" + hash,
  };

  return axios(config);
}

export function requestLecture(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/lecture-video-access",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
      language: localStorage.getItem("language_code") === "en" ? "en" : null,
    },
    data: data,
  };
  return axios(config);
}
export function redeemMCTokens(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/redeem-mc-token",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

export function checkMCTDiscount(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/check-mct-discount",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

export function checkReferralDiscount(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/check-referral",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

export function updateLastWatch(req, clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,

    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };
  return http.post(
    apiEndpoint + "/api/user/update-last-watch",
    req,
    optionsWithAuth
  );
}

export function requestExam(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/request-exam",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

export function startExam(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "put",
    url: apiEndpoint + "/api/user/start-exam",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function submitAnswer(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "put",
    url: apiEndpoint + "/api/user/submit-answer",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function completeExam(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "put",
    url: apiEndpoint + "/api/user/complete-exam",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function getExamResult(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/exam-result",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}
export function verifyPayment(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/payment-verify",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}
export function cartCheckout(req, clearCacheEntry = false) {
  const url = _.isEmpty(localStorage.getItem("access_token"))
    ? "/api/user/cart-checkout-v1"
    : "/api/user/cart-checkout";
  var config = {
    method: "post",
    url: apiEndpoint + url,
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}
export function nftCheckout(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/nft-purchase-checkout",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function partialCheckout(req, clearCacheEntry = false) {
  const url = _.isEmpty(localStorage.getItem("access_token"))
    ? "/api/user/partial-pay-v1"
    : "/api/user/partial-pay";

  var config = {
    method: "post",
    url: apiEndpoint + url,
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function walletLink(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/wallet/verify",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function web3Login(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/public/api/web3-login",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function linkEmailToWallet(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/link-email",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function coinValue(req, clearCacheEntry = false) {
  var config = {
    method: "get",
    url: apiEndpoint + "/public/api/token-value",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function mintNFT(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/mint-nft",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function downloadNFT(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/download-nft",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function brochureLeads(req, clearCacheEntry = false) {
  var data = JSON.stringify(req);

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/save-marketing-detals",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
}

export function getQuestionsAnswers(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/get-question-answers",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}
export function addQuestionsAnswers(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/add-question-answers",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}

export function deleteQA(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/delete-question-answers",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}
export function addQAComments(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/add-question-comments",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}
export function addQALikes(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/add-question-like",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}

export function getNotes(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/get-notes",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}
export function addNotes(data) {
  const currentURL = window.location.origin;

  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/add-course-notes",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
    data,
  };

  return axios(config);
}

export function addAnnouncementComments(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/add-announcement-comments",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function getAnnouncements(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/get-announcements",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function enableCourseRemainders(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/enable-course-notifications",
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function getALLArticles(req, clearCacheEntry = false) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/article/get-published-articles",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function getArticleTags(req, clearCacheEntry = false) {
  var config = {
    method: "get",
    url: apiEndpoint + "/api/article/get-article-tags",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}
export function getArticledetailsBySlug(req, clearCacheEntry = false) {
  const language = localStorage.getItem("language_code") === "en" ? "en" : "es";
  const urlEndpoint =
    language === "en" ? "get-article-details-en" : "get-article-details-es";
  const url = apiEndpoint + "/api/article/" + urlEndpoint;

  var config = {
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export function specialpartialCheckout(req, clearCacheEntry = false) {
  const url = _.isEmpty(localStorage.getItem("access_token"))
    ? "/api/user/special-partial-pay-v1"
    : "/api/user/special-partial-pay";

  var config = {
    method: "post",
    url: apiEndpoint + url,
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(req),
  };

  return axios(config);
}

export async function addTelegramUserToGoogleSheet(data, googleSpeedSheetId) {
  const NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID =
    "1gCgqdJj4bnNolczZY92ReudHY4cFABSx9jEysHtqlek";
  const req = [data];

  const doc = new GoogleSpreadsheet(googleSpeedSheetId, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRows(req);
}
export async function addMandateQAToGoogleSheet(data) {
  const NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID =
    "1p5aTtiZsbdslwZRAFjzhonEJnoak5bx2-gxGl56KqbQ";
  const req = [data];

  const doc = new GoogleSpreadsheet(
    NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID,
    serviceAccountAuth
  );

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRows(req);
}

export function updateEmployeeType(data) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/employee-type",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };

  return axios(config);
}

export function updateMandateQA(data) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/mandate-qa",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };

  return axios(config);
}
export function updateTelegramSubmitted(data) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/telegram-submitted",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };

  return axios(config);
}

export function getExamResults(data) {
  var config = {
    method: "post",
    url: apiEndpoint + "/api/user/get-user-exam-results",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
    data: data,
  };

  return axios(config);
}

export async function getCourseLectures(id, clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };

  return http.get(
    apiEndpoint + "/api/user/get-course-lectures/" + id,
    optionsWithAuth
  );
}

export async function getMyInvoices(clearCacheEntry = false) {
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,

    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };
  return http.get(apiEndpoint + "/api/user/user-invoices", optionsWithAuth);
}

export async function getGeoLocation(clearCacheEntry = false) {
  const optionsWithAuth = {
    headers: {
      "content-type": "application/json",
    },
  };
  return http.get(
    "https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location",
    optionsWithAuth
  );
}

export async function getVatRateByCountry(clearCacheEntry = false) {
  const geoData = await getGeoLocation();
  const { country } = geoData.data;
  const optionsWithAuth = {
    clearCacheEntry: clearCacheEntry,

    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("access_token"),
    },
  };
  return http.get(
    apiEndpoint + `/api/user/get-country-vat/${country}`,
    optionsWithAuth
  );
}
