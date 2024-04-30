/* eslint-disable */
import axios from "axios";

import { pbkdf2 } from "crypto";
let publicKey = "894929d4-d5d3-424a-8ffb-3fb08f54d347"; // Enter your Public API Key
let privateKey = "0db1242e-ced0-4375-89ad-584e9618e7b7"; // Enter your Private API Key
let httpMethod = "POST";
let apiEndpoint = "https://mpaas-api.mettl.com/v2/init";
let timestamp = Math.floor(new Date().getTime() / 1000);

/*
http://localhost:3000/api/proctorreport
{
    "userId": 1349,
    "groupName": "test_courseId_27_moduleId_0",
    "name": "Sridhar Goud",
    "email": "sridhargoud78900@test.com",
    "courseId": 0
}
*/
export default async (req, res) => {
  const { userId, groupName, name, email, courseId } = req.body;
  const verb = "GET";
  const reportFormat = 1;
  const urlWithoutProtocol = "mpaas-api.mettl.com/v2/report";
  const parentGroupID = 70231; //as per your details

  const url =
    "https://mpaas-api.mettl.com/v2/report/?groupName=" +
    groupName +
    "&publicKey=" +
    publicKey +
    "&reportFormat=" +
    reportFormat +
    "&userId=" +
    userId +
    "";

  console.log("url:", url);

  const parametersString =
    "GETmpaas-api.mettl.com/v2/report/" +
    groupName +
    "\n" +
    publicKey +
    "\n" +
    reportFormat +
    "\n" +
    userId +
    "";

  console.log("----parametersString:----->", parametersString);
  const sig = await getSignature(parametersString);
  console.log("----sig------------>", sig.signature.toUpperCase());
  var config = {
    method: "get",
    url,
    headers: {
      Authorization: sig.signature.toUpperCase(),
      "Content-Type": "application/json;",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const response = await axios(config);
  try {
    const { sharedUrl, ciScore, ciBand } = response.data.data;
    console.log("----response.data.data------------>", response.data.data[0]);
    res
      .status(200)
      .json({ sharedUrl: response.data.data["sharedUrl : "], ciScore, ciBand });
  } catch (e) {
    res.status(500).json(e);
  }
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
