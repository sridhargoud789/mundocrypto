const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "es",
  },
  localeDetection: false,
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "./locales",
};
