// src/utils/algorand.ts
// (Already created in commit 8, just a placeholder to mark its significance)
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

const ALGOD_SERVER = "http://localhost:4001";
const ALGOD_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const ALGOD_PORT = "";

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);
const peraWallet = new PeraWalletConnect();

export const REPUTATION_APP_ID = 123; // TODO: Replace with your deployed contract's app ID

export const getAccountAddress = async (): Promise<string | null> => {
  const accounts = await peraWallet.getConnectedAccounts();
  return accounts.length > 0 ? accounts[0] : null;
};

export const connectToPera = async (): Promise<string[]> => {
  const accounts = await peraWallet.connect();
  return accounts;
};

export const disconnectFromPera = async (): Promise<void> => {
  await peraWallet.disconnect();
};
