import { FC, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@shared/schema";
import { ChevronDownIcon, LightbulbIcon } from "lucide-react";
import { formatDate, getTransactionIcon } from "@/lib/utils";
import { 
  ArrowLeftRight, 
  UsersIcon, 
  ImageIcon, 
  TrendingUpIcon,
  RefreshCwIcon
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TransactionHistoryCardProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionHistoryCard: FC<TransactionHistoryCardProps> = ({ 
  transactions,
  isLoading
}) => {
  const [filter, setFilter] = useState("all");
  const [displayCount, setDisplayCount] = useState(3);
  
  // Filter transactions based on selected filter
  const filteredTransactions = transactions.filter(tx => {
    if (filter === "all") return true;
    if (filter === "defi") return tx.type.toLowerCase().includes("liquidity") || 
                                tx.type.toLowerCase().includes("swap") ||
                                tx.type.toLowerCase().includes("yield");
    if (filter === "nft") return tx.type.toLowerCase().includes("nft") || 
                               tx.type.toLowerCase().includes("collect");
    if (filter === "dao") return tx.type.toLowerCase().includes("dao") || 
                               tx.type.toLowerCase().includes("vote") ||
                               tx.type.toLowerCase().includes("govern");
    return true;
  });

  // Get icon component based on transaction type
  const getIconComponent = (type: string) => {
    const iconType = getTransactionIcon(type);
    switch (iconType) {
      case 'swap':
        return <ArrowLeftRight className="w-5 h-5 text-[#00BF63]" />;
      case 'users':
        return <UsersIcon className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-yellow-500" />;
      case 'trending-up':
        return <TrendingUpIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <RefreshCwIcon className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const loadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Filter:</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="text-sm border border-[#E5E5E5] rounded-md px-2 py-1 bg-white min-w-[160px]">
                <SelectValue placeholder="All Transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="defi">DeFi Only</SelectItem>
                <SelectItem value="nft">NFT Only</SelectItem>
                <SelectItem value="dao">DAO Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="transaction-list overflow-y-auto max-h-80">
          <div className="space-y-3">
            {isLoading ? (
              // Loading skeletons
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="p-3 border border-[#E5E5E5] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-md mr-3" />
                      <div>
                        <Skeleton className="h-5 w-36 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              ))
            ) : filteredTransactions && filteredTransactions.length > 0 ? (
              // Show real transaction data
              filteredTransactions.slice(0, displayCount).map((tx) => (
                <div key={tx.id} className="p-3 border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5] transition duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`bg-opacity-10 p-2 rounded-md mr-3 ${
                        tx.type.toLowerCase().includes("liquidity") || tx.type.toLowerCase().includes("swap") ? "bg-[#00BF63]" :
                        tx.type.toLowerCase().includes("dao") || tx.type.toLowerCase().includes("vote") ? "bg-blue-500" :
                        tx.type.toLowerCase().includes("nft") ? "bg-yellow-500" :
                        "bg-purple-500"
                      }`}>
                        {getIconComponent(tx.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#171717]">{tx.type}</h4>
                        <div className="text-xs text-gray-500 mt-1 font-mono">TXN: {tx.txId}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-[#171717]">{tx.amount}</div>
                      <div className="text-xs text-gray-500 mt-1">{formatDate(tx.date)}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center">
                      {tx.aiAnalyzed && (
                        <div className="bg-[#6C40B5] bg-opacity-10 px-2 py-0.5 rounded text-xs font-medium text-[#6C40B5] flex items-center">
                          <LightbulbIcon className="w-3 h-3 mr-1" />
                          AI Analyzed
                        </div>
                      )}
                    </div>
                    {tx.reputationPoints && (
                      <div className="text-xs text-[#00BF63] font-medium">
                        +{tx.reputationPoints} reputation points
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No transactions found with the selected filter.
              </div>
            )}
          </div>
        </div>
        
        {filteredTransactions.length > displayCount && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              className="text-[#6C40B5] text-sm font-medium"
              onClick={loadMore}
            >
              Load More Transactions
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistoryCard;
