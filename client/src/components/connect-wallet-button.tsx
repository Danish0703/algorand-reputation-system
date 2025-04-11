import React from 'react';
import { Button } from '@/components/ui/button';
import { useAlgoWallet } from '@/hooks/use-algo-wallet';
import { formatWalletAddress } from '@/lib/utils';
import { WalletIcon, LogOutIcon, ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ConnectWalletButton: React.FC = () => {
  const { walletAddress, connectWallet, disconnectWallet, isConnecting } = useAlgoWallet();

  if (walletAddress) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <WalletIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{formatWalletAddress(walletAddress)}</span>
            <span className="inline sm:hidden">
              {formatWalletAddress(walletAddress).substring(0, 6)}...
            </span>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => disconnectWallet()}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      variant="default" 
      className="bg-[#6C40B5] hover:bg-[#5A3699]"
      onClick={connectWallet} 
      disabled={isConnecting}
    >
      {isConnecting ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
          Connecting...
        </>
      ) : (
        <>
          <WalletIcon className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default ConnectWalletButton;