import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SoulboundNft } from "@shared/schema";
import { ChevronRightIcon, ShieldCheckIcon } from "lucide-react";
import { Link } from "wouter";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SoulboundNFTsCardProps {
  nfts: SoulboundNft[];
  isLoading: boolean;
}

const SoulboundNFTsCard: FC<SoulboundNFTsCardProps> = ({ 
  nfts,
  isLoading
}) => {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Soulbound NFTs</h3>
          <Link href="/nfts">
            <a className="text-[#6C40B5] text-sm font-medium flex items-center hover:text-opacity-80 transition duration-150">
              View All
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            // Loading skeletons
            Array(2).fill(0).map((_, i) => (
              <div key={i} className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#F5F5F5]">
                <Skeleton className="h-32 w-full" />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                  <div className="flex items-center mt-3">
                    <Skeleton className="h-6 w-16 rounded-full mr-2" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : nfts && nfts.length > 0 ? (
            // Show real NFTs data
            nfts.map((nft) => (
              <div key={nft.id} className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#F5F5F5] hover:shadow-md transition duration-200">
                <div className="h-32 bg-gradient-to-br from-[#00BF63] to-[#6C40B5] flex items-center justify-center">
                  {nft.imageUrl && (
                    <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-[#171717]">{nft.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Issued: {formatDate(nft.issueDate)}</p>
                    </div>
                    <div className="bg-[#6C40B5] bg-opacity-10 p-1 rounded-md">
                      <ShieldCheckIcon className="w-5 h-5 text-[#6C40B5]" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <div className="text-xs px-2 py-1 bg-[#E5E5E5] rounded-full font-medium text-gray-700 mr-2">Level {nft.level}</div>
                    <div className="text-xs px-2 py-1 bg-[#E5E5E5] rounded-full font-medium text-gray-700">Soulbound</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Default NFTs if no data
            [
              {
                id: 1,
                name: "Verified DeFi Participant",
                issueDate: new Date(2023, 5, 15),
                level: 3,
                imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80"
              },
              {
                id: 2,
                name: "DAO Contributor",
                issueDate: new Date(2023, 3, 8),
                level: 2,
                imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80"
              }
            ].map((nft) => (
              <div key={nft.id} className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#F5F5F5] hover:shadow-md transition duration-200">
                <div className="h-32 bg-gradient-to-br from-[#00BF63] to-[#6C40B5] flex items-center justify-center">
                  <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-[#171717]">{nft.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Issued: {formatDate(nft.issueDate)}</p>
                    </div>
                    <div className="bg-[#6C40B5] bg-opacity-10 p-1 rounded-md">
                      <ShieldCheckIcon className="w-5 h-5 text-[#6C40B5]" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <div className="text-xs px-2 py-1 bg-[#E5E5E5] rounded-full font-medium text-gray-700 mr-2">Level {nft.level}</div>
                    <div className="text-xs px-2 py-1 bg-[#E5E5E5] rounded-full font-medium text-gray-700">Soulbound</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoulboundNFTsCard;
