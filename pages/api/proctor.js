/* eslint-disable */
import axios from "axios";
import { pbkdf2 } from "crypto";
let publicKey = "894929d4-d5d3-424a-8ffb-3fb08f54d347"; // Enter your Public API Key
let privateKey = "0db1242e-ced0-4375-89ad-584e9618e7b7"; // Enter your Private API Key
let httpMethod = "POST";
let apiEndpoint = "https://mpaas-api.mettl.com/v1/init";
let timestamp = Math.floor(new Date().getTime() / 1000);

export default async (req, res) => {
  const { userId, groupName, name, email, courseId } = req.body;

  const data = {
    publicKey,
    userId,
    groupName,
    proctoringSettings: {
      screenCapture: true,
      recording: true,
      audioProctoring: true,
      authorization: false,
    },
    expiryTime: 6,
    userMetaData: {
      name,
      email,
      courseId,
    },
  };
  const stringToSignAll = JSON.stringify(data);

  const sig = await getSignature(stringToSignAll);
  console.log("sig------------>", sig.signature.toUpperCase());
  var config = {
    method: "post",
    url: apiEndpoint,
    headers: {
      Authorization: sig.signature.toUpperCase(),
      "Content-Type": "application/json; utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: stringToSignAll,
  };

  const resp = await axios(config);
  const formattedJSON = JSON.parse(resp.data.data);
  res.json(formattedJSON);
};

const getSignature = async (stringToSignAll) => {
  const signature = new Promise((resolve) => {
    pbkdf2(stringToSignAll, privateKey, 1001, 25, "SHA1", (err, derivedKey) => {
      if (err) {
        console.log({ err });
      }
      resolve(derivedKey.toString("hex"));
    });
  });
  return { signature: await signature };
};
