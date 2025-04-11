import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircleIcon, LockIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ReputationBenefitsCardProps {
  score: number;
  isLoading: boolean;
}

interface Benefit {
  name: string;
  description: string;
  requiredScore: number;
  unlocked: boolean;
}

const ReputationBenefitsCard: FC<ReputationBenefitsCardProps> = ({ 
  score,
  isLoading 
}) => {
  // Define benefits and their required scores
  const benefits: Benefit[] = [
    {
      name: "DeFi Lending Discounts",
      description: "Your score qualifies for up to 15% lower interest rates",
      requiredScore: 750,
      unlocked: score >= 750
    },
    {
      name: "DAO Governance Boost",
      description: "1.2x voting power in participating DAOs",
      requiredScore: 700,
      unlocked: score >= 700
    },
    {
      name: "High-Value NFT Access",
      description: "Need 850+ score to unlock (currently " + score + ")",
      requiredScore: 850,
      unlocked: score >= 850
    },
    {
      name: "Verified Marketplace Seller",
      description: "Need 900+ score to unlock (currently " + score + ")",
      requiredScore: 900,
      unlocked: score >= 900
    }
  ];

  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reputation Benefits</h3>
        
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="p-3 bg-[#F5F5F5] rounded-lg border border-[#E5E5E5]">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-md mr-3" />
                  <Skeleton className="h-5 w-36" />
                </div>
                <div className="ml-9 mt-1">
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ))
          ) : (
            benefits.map((benefit, index) => (
              <div key={index} className="p-3 bg-[#F5F5F5] rounded-lg border border-[#E5E5E5]">
                <div className="flex items-center">
                  {benefit.unlocked ? (
                    <div className="bg-green-500 bg-opacity-10 p-1.5 rounded-md mr-3">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    </div>
                  ) : (
                    <div className="bg-[#E5E5E5] bg-opacity-50 p-1.5 rounded-md mr-3">
                      <LockIcon className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <div className={`font-medium text-sm ${benefit.unlocked ? 'text-[#171717]' : 'text-gray-500'}`}>
                    {benefit.name}
                  </div>
                </div>
                <div className="ml-9 mt-1 text-xs text-gray-500">
                  {benefit.description}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReputationBenefitsCard;
