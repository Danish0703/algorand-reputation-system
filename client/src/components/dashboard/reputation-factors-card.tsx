import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReputationFactor } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

interface ReputationFactorsCardProps {
  factors: ReputationFactor[];
  isLoading: boolean;
}

const ReputationFactorsCard: FC<ReputationFactorsCardProps> = ({ 
  factors,
  isLoading
}) => {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reputation Factors</h3>
        
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))
          ) : factors && factors.length > 0 ? (
            // Show real data
            factors.map((factor) => (
              <div key={factor.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{factor.factorName}</span>
                  <span className="text-sm font-medium text-[#171717]">{factor.score}/{factor.maxScore}</span>
                </div>
                <div className="w-full bg-[#E5E5E5] rounded-full h-2">
                  <div 
                    className="bg-[#00BF63] h-2 rounded-full" 
                    style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            // Default factors if no data
            [
              { name: "Transaction History", score: 92, maxScore: 100 },
              { name: "DeFi Participation", score: 78, maxScore: 100 },
              { name: "DAO Governance", score: 65, maxScore: 100 },
              { name: "NFT Activity", score: 88, maxScore: 100 }
            ].map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                  <span className="text-sm font-medium text-[#171717]">{factor.score}/{factor.maxScore}</span>
                </div>
                <div className="w-full bg-[#E5E5E5] rounded-full h-2">
                  <div 
                    className="bg-[#00BF63] h-2 rounded-full" 
                    style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full text-gray-700"
          >
            View Detailed Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReputationFactorsCard;
