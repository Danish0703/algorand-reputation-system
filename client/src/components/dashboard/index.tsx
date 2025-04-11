import { FC, useState } from "react";
import ReputationScoreCard from "./reputation-score-card";
import ReputationFactorsCard from "./reputation-factors-card";
import SoulboundNFTsCard from "./soulbound-nfts-card";
import TransactionHistoryCard from "./transaction-history-card";
import ReputationBenefitsCard from "./reputation-benefits-card";
import DeveloperInfoCard from "./developer-info-card";
import AdvancedAnalysisCard from "./advanced-analysis-card";
import { useReputation } from "@/hooks/use-reputation";
import { useAlgoWallet } from "@/hooks/use-algo-wallet";
import { Button } from "@/components/ui/button";
import { DownloadIcon, ZapIcon, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard: FC = () => {
  const { walletAddress } = useAlgoWallet();
  const [showAdvancedAnalysis, setShowAdvancedAnalysis] = useState(false);
  const { 
    reputation, 
    factors, 
    transactions, 
    nfts, 
    isLoading, 
    isFetching,
    runAiAnalysis
  } = useReputation(walletAddress || "ALGO1234567890XXXX"); // Use a default address if not connected
  
  const { toast } = useToast();
  
  const handleExportData = () => {
    // In a real app, this would generate a CSV or JSON file for download
    toast({
      title: "Export initiated",
      description: "Your data export is being prepared.",
    });
  };
  
  const handleRunAnalysis = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Algorand wallet first.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await runAiAnalysis();
      toast({
        title: "Analysis complete",
        description: "Your reputation score has been updated based on the latest analysis.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error running the AI analysis. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="pt-16 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 mt-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#171717]">Reputation Dashboard</h2>
            <p className="text-gray-500 mt-1">View your blockchain reputation score and Soulbound NFTs</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="outline" 
              className="text-gray-700"
              onClick={handleExportData}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button 
              variant="outline"
              className={showAdvancedAnalysis ? "bg-[#6C40B5] text-white" : "text-gray-700"}
              onClick={() => setShowAdvancedAnalysis(!showAdvancedAnalysis)}
            >
              <Layers className="w-4 h-4 mr-2" />
              {showAdvancedAnalysis ? "Hide Advanced" : "Advanced Analysis"}
            </Button>
            <Button 
              className="bg-[#6C40B5] text-white hover:bg-opacity-90"
              onClick={handleRunAnalysis}
              disabled={isFetching}
            >
              <ZapIcon className="w-4 h-4 mr-2" />
              Run AI Analysis
            </Button>
          </div>
        </div>
        
        {/* Advanced Analysis Section (Conditional) */}
        {showAdvancedAnalysis && (
          <div className="mb-6">
            <AdvancedAnalysisCard 
              walletAddress={walletAddress} 
              isLoading={isLoading} 
              onAnalysisComplete={() => runAiAnalysis()}
            />
          </div>
        )}
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Score and Stats */}
          <div className="lg:col-span-1 space-y-6">
            <ReputationScoreCard reputation={reputation} isLoading={isLoading} />
            <ReputationFactorsCard factors={factors} isLoading={isLoading} />
          </div>
          
          {/* Middle Column - NFTs and Activity */}
          <div className="lg:col-span-2 space-y-6">
            <SoulboundNFTsCard nfts={nfts} isLoading={isLoading} />
            <TransactionHistoryCard transactions={transactions} isLoading={isLoading} />
          </div>
          
          {/* Right Column - Benefits and Integration */}
          <div className="lg:col-span-1 space-y-6">
            <ReputationBenefitsCard score={reputation?.score || 0} isLoading={isLoading} />
            <DeveloperInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
