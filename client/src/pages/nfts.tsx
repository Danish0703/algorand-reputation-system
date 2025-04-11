import { useAlgoWallet } from "@/hooks/use-algo-wallet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NFTs() {
  const { walletAddress } = useAlgoWallet();

  if (!walletAddress) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <Alert variant="default" className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            Please connect your Algorand wallet to view your Soulbound NFTs.
          </AlertDescription>
        </Alert>
        
        <div className="grid place-items-center py-12">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Your Soulbound NFTs</h2>
            <p className="text-gray-600 mb-6">
              Soulbound NFTs represent your reputation score and achievements on the Algorand blockchain.
              Connect your wallet to view your collection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-6">Your Soulbound NFTs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reputation Score NFT</CardTitle>
            <CardDescription>Issued on April 10, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square rounded-lg bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
              <svg className="w-32 h-32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z" fill="#00BF63" fillOpacity="0.2"/>
                <path d="M36.5172 42H31.6552V18H36.5172V42Z" fill="#00BF63"/>
                <path d="M28.3448 42H23.4828V24.8276H28.3448V42Z" fill="#00BF63"/>
                <path d="M20.1724 42H15.3103V31.6552H20.1724V42Z" fill="#00BF63"/>
                <path d="M44.8276 42H39.9655V24.8276H44.8276V42Z" fill="#00BF63"/>
              </svg>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Score Level</div>
                <div className="text-2xl font-bold">76/100</div>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>DeFi Contributor</CardTitle>
            <CardDescription>Issued on March 25, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square rounded-lg bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
              <svg className="w-32 h-32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z" fill="#6C40B5" fillOpacity="0.2"/>
                <path d="M20 20H40V40H20V20Z" fill="#6C40B5"/>
                <path d="M30 15V45" stroke="#6C40B5" strokeWidth="2"/>
                <path d="M15 30H45" stroke="#6C40B5" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Achievement</div>
                <div className="text-lg font-bold">DeFi Expert</div>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="opacity-60">
          <CardHeader>
            <CardTitle>DAO Governance</CardTitle>
            <CardDescription>Not yet earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square rounded-lg bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
              <svg className="w-32 h-32 text-gray-300" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M30 15L45 40H15L30 15Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">Achievement</div>
                <div className="text-lg font-bold text-gray-500">Locked</div>
              </div>
              <Button variant="outline" disabled>View Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}