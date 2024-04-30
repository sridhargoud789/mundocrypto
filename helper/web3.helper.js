import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
export const injected = new InjectedConnector({
  supportedChainIds: [process.env.NEXT_PUBLIC_CHAIN_ID],
});

export async function getUserWalletAddress() {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return address;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export const getLibrary = (provider) => {
  return new Web3Provider(provider);
};
