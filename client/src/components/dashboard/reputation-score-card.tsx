import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReputationScore from "@/components/ui/reputation-score";
import { ReputationScore as ReputationScoreType } from "@shared/schema";
import { formatLongevity } from "@/lib/utils";
import { TrendingUpIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ReputationScoreCardProps {
  reputation?: ReputationScoreType;
  isLoading: boolean;
}

const ReputationScoreCard: FC<ReputationScoreCardProps> = ({ 
  reputation,
  isLoading
}) => {
  return (
    <Card className="rounded-xl shadow-sm relative overflow-hidden">
      {reputation && reputation.score >= 700 && (
        <div className="absolute right-0 top-0 h-16 w-16">
          <div className="absolute transform rotate-45 bg-[#00BF63] text-white font-medium text-xs py-1 right-[-35px] top-[32px] w-[170px] text-center">
            Verified
          </div>
        </div>
      )}
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reputation Score</h3>
        
        <div className="flex flex-col items-center justify-center pb-2">
          {isLoading ? (
            <div className="flex flex-col items-center w-full">
              <Skeleton className="h-40 w-40 rounded-full mb-4" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          ) : (
            <>
              <ReputationScore 
                score={reputation?.score || 0} 
                maxScore={1000}
                size="lg"
              />
              
              <div className="text-center mt-2">
                {reputation && reputation.score > 0 && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00BF63] bg-opacity-10 text-[#00BF63]">
                    <TrendingUpIcon className="w-3 h-3 mr-1" />
                    +23 points this month
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xs text-gray-500 mb-1">Consistency</div>
              {isLoading ? (
                <Skeleton className="h-5 w-10 mx-auto" />
              ) : (
                <div className="font-semibold text-[#171717]">
                  {reputation?.consistency || 0}%
                </div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Longevity</div>
              {isLoading ? (
                <Skeleton className="h-5 w-10 mx-auto" />
              ) : (
                <div className="font-semibold text-[#171717]">
                  {formatLongevity(reputation?.longevity || 0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Diversity</div>
              {isLoading ? (
                <Skeleton className="h-5 w-10 mx-auto" />
              ) : (
                <div className="font-semibold text-[#171717]">
                  {reputation?.diversity || 0}%
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReputationScoreCard;
