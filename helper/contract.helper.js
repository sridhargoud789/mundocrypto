import { ethers } from "ethers";
import courseContractABI from "../Contracts/courses.json";
import tokenContractABI from "../Contracts/token.json";

export const courseContractHelper = async (methodName, data = []) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const courseContract = new ethers.Contract(
    "0xD02BF2bA28AB6FC3B2dDd2859bB683a96333fAAF",
    courseContractABI,
    signer
  );

  return courseContract[`${methodName}`](...data);
};

export const tokenContractHelper = async (methodName, data = []) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const gas = await signer.estimateGas();
  const tokenContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    tokenContractABI,
    signer
  );
  return await tokenContract[`${methodName}`](...data);
};
