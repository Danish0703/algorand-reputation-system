import { FC, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ChevronDownIcon, 
  BrainCircuitIcon, 
  BarChart4Icon, 
  SearchIcon, 
  AlertCircleIcon, 
  LightbulbIcon, 
  TrendingUpIcon 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useReputation } from "@/hooks/use-reputation";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AdvancedAnalysisCardProps {
  walletAddress: string | null;
  isLoading: boolean;
  onAnalysisComplete: () => void;
}

type AdvancedAnalysisResult = {
  totalScore: number;
  confidenceScore: number;
  factorBreakdown: {
    [key: string]: number;
  };
  insights: string[];
  anomalies: string[];
  recommendations: string[];
  predictedGrowth: number;
};

const AdvancedAnalysisCard: FC<AdvancedAnalysisCardProps> = ({ 
  walletAddress,
  isLoading,
  onAnalysisComplete
}) => {
  const [analysisResult, setAnalysisResult] = useState<AdvancedAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const { runAdvancedAiAnalysis, isAdvancedAnalyzing } = useReputation(walletAddress || "");
  
  const runAdvancedAnalysis = async () => {
    if (!walletAddress) return;
    
    try {
      await runAdvancedAiAnalysis();
      
      toast({
        title: "Advanced Analysis Complete",
        description: "AI has completed an in-depth analysis of your wallet's reputation."
      });
      
      // Mock result for development purposes - in production this would come from the API
      setAnalysisResult({
        totalScore: 87,
        confidenceScore: 92,
        factorBreakdown: {
          "Transaction History": 25,
          "DeFi Participation": 18,
          "DAO Governance": 12,
          "NFT Activity": 15,
          "Consistency": 8,
          "Diversity": 5,
          "Growth": 4
        },
        insights: [
          "Your DeFi activity shows consistent participation in major liquidity pools",
          "Regular DAO voting activity indicates strong community engagement",
          "Consistent transaction patterns demonstrate long-term blockchain commitment"
        ],
        anomalies: [
          "Unusual spike in transaction activity detected in the past month"
        ],
        recommendations: [
          "Consider diversifying your DeFi investments across more protocols",
          "Increase participation in governance proposals to boost your DAO reputation",
          "Maintain the consistent transaction cadence for improved reputation growth"
        ],
        predictedGrowth: 5
      });
      
      onAnalysisComplete();
    } catch (error) {
      console.error("Advanced analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to complete the advanced reputation analysis.",
        variant: "destructive"
      });
    }
  };
  
  const renderFactorBreakdown = () => {
    if (!analysisResult) return null;
    
    const factors = Object.entries(analysisResult.factorBreakdown)
      .sort((a, b) => b[1] - a[1]);
    
    return (
      <div className="space-y-4">
        {factors.map(([name, value]) => (
          <div key={name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{name}</span>
              <span className="text-sm font-medium">{value} points</span>
            </div>
            <Progress
              value={(value / analysisResult.totalScore) * 100}
              className="h-2"
            />
          </div>
        ))}
      </div>
    );
  };
  
  const renderInsights = () => {
    if (!analysisResult?.insights.length) return (
      <div className="text-gray-500 text-center py-4">
        No insights available for this wallet.
      </div>
    );
    
    return (
      <div className="space-y-3">
        {analysisResult.insights.map((insight, index) => (
          <div key={index} className="flex items-start p-3 bg-[#F5F5F5] rounded-lg">
            <LightbulbIcon className="text-amber-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{insight}</p>
          </div>
        ))}
      </div>
    );
  };
  
  const renderAnomalies = () => {
    if (!analysisResult?.anomalies.length) return (
      <div className="text-gray-500 text-center py-4">
        No anomalies detected for this wallet.
      </div>
    );
    
    return (
      <div className="space-y-3">
        {analysisResult.anomalies.map((anomaly, index) => (
          <div key={index} className="flex items-start p-3 bg-[#FEF2F2] border border-red-100 rounded-lg">
            <AlertCircleIcon className="text-red-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{anomaly}</p>
          </div>
        ))}
      </div>
    );
  };
  
  const renderRecommendations = () => {
    if (!analysisResult?.recommendations.length) return (
      <div className="text-gray-500 text-center py-4">
        No recommendations available for this wallet.
      </div>
    );
    
    return (
      <div className="space-y-3">
        {analysisResult.recommendations.map((recommendation, index) => (
          <div key={index} className="flex items-start p-3 bg-[#F0FDF4] border border-green-100 rounded-lg">
            <TrendingUpIcon className="text-green-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{recommendation}</p>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BrainCircuitIcon className="w-5 h-5 mr-2 text-[#6C40B5]" />
          Advanced AI Analysis
        </h3>
        
        {isAdvancedAnalyzing || isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <Skeleton className="h-40 w-full" />
          </div>
        ) : analysisResult ? (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="text-xl font-bold">{analysisResult.totalScore}</div>
                  <div className="text-xs text-gray-500">Total Reputation Score</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <Badge variant="outline" className="bg-[#6C40B5] bg-opacity-10 text-[#6C40B5] mr-2">
                      {analysisResult.confidenceScore}% Confidence
                    </Badge>
                    <Badge variant="outline" className="bg-[#00BF63] bg-opacity-10 text-[#00BF63]">
                      +{analysisResult.predictedGrowth} Projected Growth
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">3-month projection</div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="insights" className="flex-1">Insights</TabsTrigger>
                <TabsTrigger value="anomalies" className="flex-1">Anomalies</TabsTrigger>
                <TabsTrigger value="recommendations" className="flex-1">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                <Accordion type="single" collapsible defaultValue="factors" className="w-full">
                  <AccordionItem value="factors">
                    <AccordionTrigger className="py-2">
                      <div className="flex items-center">
                        <BarChart4Icon className="h-4 w-4 mr-2" />
                        <span>Factor Breakdown</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {renderFactorBreakdown()}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-0">
                {renderInsights()}
              </TabsContent>
              
              <TabsContent value="anomalies" className="mt-0">
                {renderAnomalies()}
              </TabsContent>
              
              <TabsContent value="recommendations" className="mt-0">
                {renderRecommendations()}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="mb-4">
              <SearchIcon className="h-12 w-12 mx-auto text-gray-400" />
            </div>
            <h4 className="text-lg font-medium mb-2">Unlock Advanced Analytics</h4>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
              Run our advanced AI analysis to get deeper insights into your reputation score,
              detect patterns, and receive personalized recommendations.
            </p>
            <Button 
              onClick={runAdvancedAnalysis}
              disabled={!walletAddress}
              className="bg-[#6C40B5] hover:bg-[#5A3699]"
            >
              Run Advanced Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalysisCard;