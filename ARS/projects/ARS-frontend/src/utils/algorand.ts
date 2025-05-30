// src/utils/algorand.ts
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

const ALGOD_SERVER = "http://localhost:4001";
const ALGOD_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const ALGOD_PORT = "";

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);
const peraWallet = new PeraWalletConnect();

export const REPUTATION_APP_ID = 123;

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

export const callAppMethod = async (
  method: string,
  args: any[],
  senderAddress: string
) => {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();
    // ABI method names are typically passed as a string and encoded
    // Arguments need to be encoded based on their ABI type.
    // For simplicity, this example assumes uint64 args or address bytes for the appArgs.
    const appArgs = args.map((arg) => {
      if (typeof arg === 'number') {
        return algosdk.encodeUint64(arg);
      } else if (algosdk.isValidAddress(arg)) {
        return algosdk.decodeAddress(arg).publicKey;
      }
      return arg; // Fallback for other types, though ABI calls need specific handling
    });

    const comp = algosdk.makeApplicationCallTxnFromObject({
      from: senderAddress,
      appIndex: REPUTATION_APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      suggestedParams: suggestedParams,
      appArgs: [new Uint8Array(Buffer.from(method)), ...appArgs], // Method name as first arg
    });

    const txns = [comp];
    const signedTxns = await peraWallet.signTransaction([
      {
        txn: comp.toByte(),
        signers: [senderAddress],
      },
    ]);

    const txResponse = await algodClient.sendRawTransaction(signedTxns.map(t => t.blob)).do();
    return txResponse; // Return the full response for txId
  } catch (error) {
    console.error(`Error calling ${method}:`, error);
    throw error;
  }
};

export const getGlobalStateValue = async (key: string): Promise<any> => {
  const appInfo = await algodClient.getApplicationByID(REPUTATION_APP_ID).do();
  const globalState = appInfo.params["global-state"];
  const encodedKey = Buffer.from(key).toString('base64');
  const stateEntry = globalState.find((entry: any) => entry.key === encodedKey);

  if (stateEntry) {
    if (stateEntry.value.type === 1) { // Uint
      return stateEntry.value.uint;
    } else { // Bytes
      return Buffer.from(stateEntry.value.bytes, 'base64').toString();
    }
  }
  return null;
};

export const getReputationScore = async (address: string, senderAddress: string): Promise<number | null> => {
  // This function is already quite specific for get_score and uses makeApplicationCallTxnFromObject,
  // which is an improvement over the generic makeApplicationNoOpTxn if you need more control
  // over specific ABI method arguments. The generic `callAppMethod` can be used for simpler NoOp calls
  // or when not expecting a direct ABI return from logs.
  // The `getReputationScore` implementation here already uses an explicit ABI call setup.
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();
    const methodArgs = {
      name: "get_score",
      args: [algosdk.decodeAddress(address).publicKey],
    };

    const comp = algosdk.makeApplicationCallTxnFromObject({
      from: senderAddress,
      appIndex: REPUTATION_APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      suggestedParams: suggestedParams,
      appArgs: [new Uint8Array(Buffer.from(methodArgs.name)), methodArgs.args[0]],
    });

    const txns = [comp];
    const signedTxns = await peraWallet.signTransaction([
      {
        txn: comp.toByte(),
        signers: [senderAddress],
      },
    ]);

    const { txId } = await algodClient.sendRawTransaction(signedTxns.map(t => t.blob)).do();
    const result = await algosdk.waitForConfirmation(algodClient, txId, 4);

    const logs = result["logs"];
    if (logs && logs.length > 0) {
      // Assuming the last log is the ABI return value
      const decodedReturn = new Uint8Array(Buffer.from(logs[logs.length - 1], 'base64'));
      return new algosdk.ABI.Uint(64).decode(decodedReturn);
    }
    return null;

  } catch (error) {
    console.error("Error getting reputation score:", error);
    throw error;
  }
};
