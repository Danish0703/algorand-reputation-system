import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAlgoWallet } from "@/hooks/use-algo-wallet";
import { formatWalletAddress } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import ConnectWalletButton from "@/components/connect-wallet-button";

const Navbar = () => {
  const [location] = useLocation();
  const { walletAddress, connectWallet, disconnectWallet } = useAlgoWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="bg-white border-b border-[#E5E5E5] px-4 py-3 flex items-center justify-between shadow-sm fixed w-full top-0 z-10">
      <div className="flex items-center">
        <Link href="/" className="flex items-center mr-6">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z" fill="black"/>
              <path d="M36.5172 42H31.6552V18H36.5172V42Z" fill="#00BF63"/>
              <path d="M28.3448 42H23.4828V24.8276H28.3448V42Z" fill="#00BF63"/>
              <path d="M20.1724 42H15.3103V31.6552H20.1724V42Z" fill="#00BF63"/>
              <path d="M44.8276 42H39.9655V24.8276H44.8276V42Z" fill="#00BF63"/>
            </svg>
            <h1 className="text-xl font-semibold text-black">Algo<span className="text-[#00BF63]">Trust</span></h1>
        </Link>
        
        <div className="hidden md:flex space-x-6 text-sm">
          <Link 
            href="/dashboard"
            className={`px-1 py-2 font-medium ${
              location === "/dashboard" ? "text-[#00BF63] border-b-2 border-[#00BF63]" : "text-gray-500 hover:text-black"
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/nfts"
            className={`px-1 py-2 font-medium ${
              location === "/nfts" ? "text-[#00BF63] border-b-2 border-[#00BF63]" : "text-gray-500 hover:text-black"
            }`}
          >
            Soulbound NFTs
          </Link>
          <Link 
            href="/analytics"
            className={`px-1 py-2 font-medium ${
              location === "/analytics" ? "text-[#00BF63] border-b-2 border-[#00BF63]" : "text-gray-500 hover:text-black"
            }`}
          >
            Analytics
          </Link>
          <Link 
            href="/developer"
            className={`px-1 py-2 font-medium ${
              location === "/developer" ? "text-[#00BF63] border-b-2 border-[#00BF63]" : "text-gray-500 hover:text-black"
            }`}
          >
            Developer API
          </Link>
          <Link 
            href="/docs"
            className={`px-1 py-2 font-medium ${
              location === "/docs" ? "text-[#00BF63] border-b-2 border-[#00BF63]" : "text-gray-500 hover:text-black"
            }`}
          >
            Documentation
          </Link>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="hidden md:block mr-4">
          <ConnectWalletButton />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </Button>
      </div>
      
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 p-4 md:hidden shadow-md z-20">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/dashboard"
              className={`px-4 py-2 rounded font-medium ${
                location === "/dashboard" ? "bg-gray-100 text-[#00BF63]" : "text-gray-700"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/nfts"
              className={`px-4 py-2 rounded font-medium ${
                location === "/nfts" ? "bg-gray-100 text-[#00BF63]" : "text-gray-700"
              }`}
            >
              Soulbound NFTs
            </Link>
            <Link 
              href="/analytics"
              className={`px-4 py-2 rounded font-medium ${
                location === "/analytics" ? "bg-gray-100 text-[#00BF63]" : "text-gray-700"
              }`}
            >
              Analytics
            </Link>
            <Link 
              href="/developer"
              className={`px-4 py-2 rounded font-medium ${
                location === "/developer" ? "bg-gray-100 text-[#00BF63]" : "text-gray-700"
              }`}
            >
              Developer API
            </Link>
            <Link 
              href="/docs"
              className={`px-4 py-2 rounded font-medium ${
                location === "/docs" ? "bg-gray-100 text-[#00BF63]" : "text-gray-700"
              }`}
            >
              Documentation
            </Link>
            
            <div className="pt-2 border-t border-gray-200">
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
