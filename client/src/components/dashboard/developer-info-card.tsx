import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DeveloperInfoCard: FC = () => {
  return (
    <Card className="rounded-xl shadow-sm bg-black text-white">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Developer Integration</h3>
        <p className="text-sm text-gray-300 mb-4">
          Integrate this reputation system into your DApp with our API and smart contracts.
        </p>
        
        <div className="bg-[#171717] p-3 rounded-md font-mono text-xs overflow-x-auto mb-4">
          <code className="text-[#00BF63]">
            # Python Example<br />
            import algorand_reputation<br /><br />
            
            # Initialize client<br />
            client = algorand_reputation.Client(api_key="YOUR_API_KEY")<br /><br />
            
            # Get user reputation<br />
            score = client.get_reputation("USER_WALLET_ADDRESS")<br />
            print(f"Reputation Score: {'{score.value}'}/1000")
          </code>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-[#00BF63] text-black hover:bg-opacity-90 transition duration-150"
            asChild
          >
            <a href="/docs/api" target="_blank" rel="noopener noreferrer">
              View API Documentation
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="w-full bg-transparent border border-[#404040] text-white hover:bg-[#171717]"
            asChild
          >
            <a href="/developer/get-api-key" target="_blank" rel="noopener noreferrer">
              Get API Key
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperInfoCard;
