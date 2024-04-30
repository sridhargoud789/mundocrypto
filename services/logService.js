// import Raven from "raven-js";

// function init() {
//   Raven.config("https://9876d350903a4d0183efb24096c26cda@sentry.io/1462756", {
//     release: "1-0-0",
//     environment: "development-test"
//   }).install();
// }

function log(error) {
  // Raven.captureException(error);
}

export default {
 // init,
  log
};
