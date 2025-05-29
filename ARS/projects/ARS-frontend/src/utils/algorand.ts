// src/utils/algorand.ts (New File)
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

// Configuration for your Algorand network
const ALGOD_SERVER = "http://localhost:4001"; // Or your Algorand node URL
const ALGOD_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; // Or your Algorand node token
const ALGOD_PORT = ""; // Leave empty for default or specify

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);
const peraWallet = new PeraWalletConnect();

// Placeholder for App ID
export const REPUTATION_APP_ID = 123; // TODO: Replace with your deployed contract's app ID

// Helper function to get the current connected account
export const getAccountAddress = async (): Promise<string | null> => {
  const accounts = await peraWallet.getConnectedAccounts();
  return accounts.length > 0 ? accounts[0] : null;
};

// Function to connect to Pera Wallet
export const connectToPera = async (): Promise<string[]> => {
  const accounts = await peraWallet.connect();
  return accounts;
};

// Function to disconnect from Pera Wallet
export const disconnectFromPera = async (): Promise<void> => {
  await peraWallet.disconnect();
};

// Contract interaction functions will be added here
