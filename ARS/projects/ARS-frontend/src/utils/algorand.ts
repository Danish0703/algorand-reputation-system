// src/utils/algorand.ts
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

const ALGOD_SERVER = "http://localhost:4001"; // Or Algorand node URL
const ALGOD_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; // Or your Algorand node token
const ALGOD_PORT = ""; // Leave empty for default or specify

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT); // This line is the focus
const peraWallet = new PeraWalletConnect();

//Define REPUTATION_APP_ID constant
export const REPUTATION_APP_ID = 123; // TODO: Replace with your deployed contract's app ID

export const getAccountAddress = async (): Promise<string | null> => {
  const accounts = await peraWallet.getConnectedAccounts();
  return accounts.length > 0 ? accounts[0] : null;
};//Implemented getAccountAddress utility

export const connectToPera = async (): Promise<string[]> => {
  const accounts = await peraWallet.connect();
  return accounts;
};

export const disconnectFromPera = async (): Promise<void> => {
  await peraWallet.disconnect();
};
