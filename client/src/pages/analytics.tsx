import { useAlgoWallet } from "@/hooks/use-algo-wallet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, TrendingUp, RefreshCw, Activity } from "lucide-react";

export default function Analytics() {
  const { walletAddress } = useAlgoWallet();

  if (!walletAddress) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <Alert variant="default" className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            Please connect your Algorand wallet to view your analytics.
          </AlertDescription>
        </Alert>
        
        <div className="grid place-items-center py-12">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Reputation Analytics</h2>
            <p className="text-gray-600 mb-6">
              Get detailed insights about your on-chain activity and reputation score.
              Connect your wallet to access analytics.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Reputation Analytics</h1>
        <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Score</CardDescription>
            <CardTitle className="text-4xl font-bold">76</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 font-medium flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              +4 points in last 30 days
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Transactions</CardDescription>
            <CardTitle className="text-4xl font-bold">42</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 font-medium flex items-center">
              <Activity className="mr-1 h-4 w-4" />
              Last transaction: 2 days ago
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Soulbound NFTs</CardDescription>
            <CardTitle className="text-4xl font-bold">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 font-medium">
              Reputation + DeFi Contributor
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="history">
        <TabsList className="mb-4">
          <TabsTrigger value="history">Score History</TabsTrigger>
          <TabsTrigger value="factors">Factor Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Peer Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Score Progression</CardTitle>
              <CardDescription>Your reputation score changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Chart visualization will appear here</p>
                  <p className="text-sm">Historical data is being processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="factors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reputation Factors</CardTitle>
              <CardDescription>The key components that make up your score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Transaction History</span>
                    <span className="text-sm font-medium">82/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: "82%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">DeFi Participation</span>
                    <span className="text-sm font-medium">75/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: "75%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">DAO Governance</span>
                    <span className="text-sm font-medium">45/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{width: "45%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">NFT Activity</span>
                    <span className="text-sm font-medium">64/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: "64%"}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Peer Comparison</CardTitle>
              <CardDescription>How your score compares to other wallets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Peer comparison data will appear here</p>
                  <p className="text-sm">Anonymized data is being processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}