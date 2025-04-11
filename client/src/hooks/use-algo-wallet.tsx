import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getWallet, disconnectWallet } from "@/lib/algo-wallet";
import { useToast } from "./use-toast";

interface AlgoWalletContextType {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const AlgoWalletContext = createContext<AlgoWalletContextType>({
  walletAddress: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
});

export const AlgoWalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  
  // Check for previously connected wallet on mount
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("algorand-wallet-address");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
  }, []);
  
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const wallet = getWallet();
      const address = await wallet.connect();
      
      setWalletAddress(address);
      localStorage.setItem("algorand-wallet-address", address);
      
      toast({
        title: "Wallet connected",
        description: "Your Algorand wallet has been connected successfully.",
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      
      // Provide more specific error messages based on the error
      let errorMessage = "Failed to connect to your Algorand wallet. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('rejected')) {
          errorMessage = "Connection was rejected. Please approve the connection request in your wallet.";
        } else if (error.message.includes('timeout')) {
          errorMessage = "Connection timed out. Please try again or check if your wallet app is running.";
        } else if (error.message.includes('not installed') || error.message.includes('compatible wallet')) {
          errorMessage = "No compatible wallet found. Please install an Algorand wallet app.";
        } else if (error.message.includes('Missing project ID')) {
          errorMessage = "WalletConnect configuration issue. Please contact support.";
        } else if (error.message.includes('Network connection')) {
          errorMessage = "Network connection error. Please check your internet connection.";
        } else {
          // Use the actual error message if it's available
          errorMessage = `Connection failed: ${error.message}`;
        }
      }
      
      toast({
        title: "Connection failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnect = () => {
    disconnectWallet();
    setWalletAddress(null);
    localStorage.removeItem("algorand-wallet-address");
    
    toast({
      title: "Wallet disconnected",
      description: "Your Algorand wallet has been disconnected.",
    });
  };
  
  return (
    <AlgoWalletContext.Provider
      value={{
        walletAddress,
        connectWallet,
        disconnectWallet: disconnect,
        isConnecting,
      }}
    >
      {children}
    </AlgoWalletContext.Provider>
  );
};

export const useAlgoWallet = () => useContext(AlgoWalletContext);
