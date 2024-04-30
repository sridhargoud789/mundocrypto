var CryptoJS = require("crypto-js");
var b64 = require("crypto-js/enc-base64");

const encrypt = (val) => {
  let cipher = CryptoJS.AES.encrypt(
    val,
    process.env.NEXT_PUBLIC_ENCRYPT_KEY
  ).toString();
  //let encrypted = b64.stringify(cipher)
  return cipher;
};

const decrypt = (encrypted) => {
  try {
    let decipher = CryptoJS.AES.decrypt(
      val,
      process.env.NEXT_PUBLIC_ENCRYPT_KEY
    ).toString();
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    return decrypted + decipher.final("utf8");
  } catch (error) {
    return "failed";
  }
};

const encryptv1 = (val) => {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(
    val,
    process.env.NEXT_PUBLIC_ENCRYPT_KEY
  ).toString();
  return ciphertext;
};

const decryptv1 = (val) => {
  // Encrypt
  var bytes = CryptoJS.AES.decrypt(val, process.env.NEXT_PUBLIC_ENCRYPT_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
  encrypt,
  decrypt,
  encryptv1,
  decryptv1,
};
