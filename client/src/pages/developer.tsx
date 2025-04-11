import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

export default function Developer() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const CodeExample = ({ language, code }: { language: string, code: string }) => (
    <div className="relative">
      <div className="absolute top-2 right-2">
        <Badge variant="outline" className="bg-gray-100">{language}</Badge>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const EndpointCard = ({ title, endpoint, method, description, responseType }: { 
    title: string,
    endpoint: string,
    method: string,
    description: string,
    responseType: string
  }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge className={method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
            {method}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md mb-3">
          <code className="text-sm font-mono">{endpoint}</code>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => copyToClipboard(endpoint, endpoint)}
            className="h-8 w-8"
          >
            {copiedEndpoint === endpoint ? <CheckIcon className="h-4 w-4 text-green-600" /> : <CopyIcon className="h-4 w-4" />}
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Response:</span> {responseType}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-2">Developer API</h1>
      <p className="text-gray-600 mb-6">
        Integrate the AlgoTrust reputation system into your applications
      </p>
      
      <Tabs defaultValue="endpoints">
        <TabsList className="mb-6">
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="endpoints" className="space-y-6">
          <EndpointCard
            title="Get Reputation Score"
            endpoint="/api/reputation/:walletAddress"
            method="GET"
            description="Retrieve a wallet's reputation score and details"
            responseType="JSON including score and metadata"
          />
          
          <EndpointCard
            title="Get Reputation Factors"
            endpoint="/api/reputation/:walletAddress/factors"
            method="GET"
            description="Retrieve the detailed breakdown of reputation factors"
            responseType="JSON array of factor objects"
          />
          
          <EndpointCard
            title="Get Soulbound NFTs"
            endpoint="/api/nfts/:walletAddress"
            method="GET"
            description="Retrieve all Soulbound NFTs owned by a wallet"
            responseType="JSON array of NFT objects"
          />
          
          <EndpointCard
            title="Get Transactions"
            endpoint="/api/transactions/:walletAddress"
            method="GET"
            description="Retrieve transaction history for a wallet"
            responseType="JSON array of transaction objects"
          />
          
          <EndpointCard
            title="Run Reputation Analysis"
            endpoint="/api/analyze/:walletAddress"
            method="POST"
            description="Trigger a new reputation analysis for a wallet"
            responseType="JSON with analysis results"
          />
          
          <EndpointCard
            title="Run Advanced Analysis"
            endpoint="/api/analyze-advanced/:walletAddress"
            method="POST"
            description="Trigger advanced AI-powered reputation analysis"
            responseType="JSON with detailed analysis results"
          />
        </TabsContent>
        
        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle>API Authentication</CardTitle>
              <CardDescription>Secure your API requests with API keys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To access the AlgoTrust API, you need to include your API key in the request headers.
                API keys can be obtained by registering as a developer on our platform.
              </p>
              
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-semibold mb-2">Authentication Header</h3>
                <code className="bg-gray-200 p-2 rounded text-sm block">
                  X-API-Key: your_api_key_here
                </code>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Rate Limits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Free tier: 100 requests per day</li>
                  <li>Developer tier: 1,000 requests per day</li>
                  <li>Business tier: 10,000 requests per day</li>
                </ul>
              </div>
              
              <Button className="mt-4">Register for API Access</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Integrate AlgoTrust API in your applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">JavaScript / TypeScript</h3>
                <CodeExample 
                  language="JavaScript" 
                  code={`// Fetch a wallet's reputation score
const fetchReputationScore = async (walletAddress) => {
  const response = await fetch(
    \`https://api.algotrust.io/api/reputation/\${walletAddress}\`,
    {
      headers: {
        'X-API-Key': 'your_api_key_here'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch reputation score');
  }
  
  return response.json();
};

// Example usage
fetchReputationScore('ALGO1234567890XXXX')
  .then(data => console.log('Reputation score:', data.score))
  .catch(error => console.error(error));`}
                />
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Python</h3>
                <CodeExample 
                  language="Python" 
                  code={`import requests

def get_reputation_score(wallet_address, api_key):
    """Fetch reputation score for a wallet address"""
    url = f"https://api.algotrust.io/api/reputation/{wallet_address}"
    headers = {
        "X-API-Key": api_key
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()

# Example usage
try:
    api_key = "your_api_key_here"
    wallet = "ALGO1234567890XXXX"
    result = get_reputation_score(wallet, api_key)
    print(f"Reputation score: {result['score']}")
except requests.exceptions.RequestException as e:
    print(f"Error fetching reputation: {e}")`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}