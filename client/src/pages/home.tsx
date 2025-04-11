import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRightIcon, BarChart4Icon, LockIcon, ShieldCheck } from "lucide-react";

const Home: FC = () => {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#171717] to-[#404040] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-[#00BF63]">AI-Powered</span> Reputation System on Algorand
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                A decentralized reputation scoring system leveraging AI and Soulbound NFTs to build trust in the Algorand ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-[#00BF63] text-black hover:bg-opacity-90 px-8 py-6 text-base">
                    View Dashboard
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-6 text-base">
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00BF63] to-[#6C40B5] rounded-xl opacity-20 blur-xl"></div>
              <div className="relative bg-[#171717] border border-gray-800 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-semibold">AlgoTrust Score</div>
                  <div className="bg-[#00BF63] bg-opacity-10 px-3 py-1 rounded-full text-[#00BF63] text-sm">Verified</div>
                </div>
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <svg className="w-48 h-48" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#00BF63" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="50.24" className="transform -rotate-90 origin-center" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold">835</div>
                      <div className="text-sm text-gray-400">out of 1000</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#171717] p-3 rounded-md border border-gray-800">
                    <div className="text-sm text-gray-400">Consistency</div>
                    <div className="text-xl font-semibold">94%</div>
                  </div>
                  <div className="bg-[#171717] p-3 rounded-md border border-gray-800">
                    <div className="text-sm text-gray-400">Longevity</div>
                    <div className="text-xl font-semibold">2.5 yrs</div>
                  </div>
                  <div className="bg-[#171717] p-3 rounded-md border border-gray-800">
                    <div className="text-sm text-gray-400">Diversity</div>
                    <div className="text-xl font-semibold">83%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Build trust in the Algorand ecosystem with our cutting-edge reputation system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F5F5] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="w-12 h-12 bg-[#00BF63] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <BarChart4Icon className="h-6 w-6 text-[#00BF63]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-powered Scoring</h3>
              <p className="text-gray-600">
                Our machine learning algorithms analyze on-chain data to generate accurate reputation scores.
              </p>
            </div>
            
            <div className="bg-[#F5F5F5] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="w-12 h-12 bg-[#6C40B5] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <LockIcon className="h-6 w-6 text-[#6C40B5]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soulbound NFTs</h3>
              <p className="text-gray-600">
                Non-transferable tokens that certify your reputation, permanently tied to your wallet.
              </p>
            </div>
            
            <div className="bg-[#F5F5F5] p-6 rounded-xl border border-[#E5E5E5]">
              <div className="w-12 h-12 bg-[#00BF63] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-[#00BF63]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
              <p className="text-gray-600">
                All reputation data is recorded on the Algorand blockchain for maximum transparency.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how AlgoTrust can be integrated into various blockchain applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
              <h3 className="text-xl font-semibold mb-3">DeFi Lending Platforms</h3>
              <p className="text-gray-600 mb-4">
                Lenders can evaluate borrowers' credibility based on their reputation score, 
                leading to more favorable terms for trusted users.
              </p>
              <Link href="/use-cases/defi" className="text-[#6C40B5] font-medium flex items-center">
                Learn more
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
              <h3 className="text-xl font-semibold mb-3">DAO Governance</h3>
              <p className="text-gray-600 mb-4">
                Weighted voting based on reputation scores ensures that long-term participants 
                have more influence in governance decisions.
              </p>
              <Link href="/use-cases/dao" className="text-[#6C40B5] font-medium flex items-center">
                Learn more
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Web3 Marketplaces</h3>
              <p className="text-gray-600 mb-4">
                Trust-based filtering for sellers and buyers, reducing fraud and improving 
                the overall marketplace experience.
              </p>
              <Link href="/use-cases/marketplace" className="text-[#6C40B5] font-medium flex items-center">
                Learn more
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Freelance & Gig Economy</h3>
              <p className="text-gray-600 mb-4">
                Employers can assess freelancer credibility through their blockchain reputation, 
                creating trust in decentralized work relationships.
              </p>
              <Link href="/use-cases/freelance" className="text-[#6C40B5] font-medium flex items-center">
                Learn more
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#6C40B5] to-[#00BF63] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Trust on Algorand?</h2>
          <p className="text-white text-opacity-90 max-w-2xl mx-auto mb-8">
            Start using AlgoTrust in your DApp today and provide your users with a reliable reputation system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/dashboard" className="inline-block">
              <Button className="bg-white text-[#6C40B5] hover:bg-opacity-90 px-8 py-6 text-base">
                Try the Dashboard
              </Button>
            </Link>
            <Link href="/developer" className="inline-block">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-6 text-base">
                Developer Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
