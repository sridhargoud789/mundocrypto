const { atom, selector } = require("recoil");

const { recoilPersist } = require("recoil-persist");

const { persistAtom } = recoilPersist();

const userObject = atom({
  key: "userOBJ",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

const cartObject = atom({
  key: "cartOBJ",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const userProfileObject = atom({
  key: "userProfileOBJ",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const courseInitObject = atom({
  key: "ciOBJ",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export { userObject, cartObject, userProfileObject, courseInitObject };
