import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Info, BookOpen, Code, HelpCircle } from "lucide-react";

export default function Documentation() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-2">Documentation</h1>
      <p className="text-gray-600 mb-6">
        Learn how to use the AlgoTrust reputation system and Soulbound NFTs
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Documentation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav>
                <ul className="space-y-1 p-4">
                  <li>
                    <button 
                      onClick={() => setTab("overview")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        tab === "overview" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Overview
                      </div>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setTab("guides")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        tab === "guides" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Guides
                      </div>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setTab("api")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        tab === "api" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <Code className="h-4 w-4 mr-2" />
                        API Reference
                      </div>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setTab("faq")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        tab === "faq" ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        FAQ
                      </div>
                    </button>
                  </li>
                </ul>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          {tab === "overview" && (
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Learn about AlgoTrust reputation scoring system</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h2>AlgoTrust: Decentralized Reputation on Algorand</h2>
                <p>
                  AlgoTrust is a decentralized reputation scoring system built on the Algorand blockchain
                  that uses AI-powered analysis to evaluate wallet behavior and issue Soulbound NFTs
                  representing a user's reputation.
                </p>
                
                <h3>Key Features</h3>
                <ul>
                  <li>
                    <strong>AI-powered reputation analysis</strong> that evaluates on-chain activities
                    and transaction patterns
                  </li>
                  <li>
                    <strong>Soulbound NFTs</strong> that represent your reputation score and cannot
                    be transferred
                  </li>
                  <li>
                    <strong>Multi-factor reputation scoring</strong> taking into account transaction
                    history, DeFi participation, DAO governance, and more
                  </li>
                  <li>
                    <strong>Developer API</strong> for integrating reputation scores into your DApps
                  </li>
                </ul>
                
                <h3>How It Works</h3>
                <p>
                  AlgoTrust analyzes blockchain transaction data to generate a comprehensive reputation
                  score. The system evaluates multiple factors including transaction history, DeFi
                  interactions, DAO participation, and NFT activities to create a holistic view of
                  a wallet's reputation.
                </p>
                <p>
                  Reputation scores are represented as Soulbound NFTs - non-transferable tokens that
                  are tied to a specific wallet address. These NFTs serve as verifiable credentials
                  that can be used across the Algorand ecosystem.
                </p>
                
                <div className="flex items-center bg-gray-100 p-4 rounded-md">
                  <div>
                    <h4 className="font-bold mb-1">Ready to get started?</h4>
                    <p className="text-sm text-gray-600">Connect your wallet to view your reputation score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {tab === "guides" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guides</CardTitle>
                  <CardDescription>Step-by-step instructions for using AlgoTrust</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-50 border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Getting Started</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">
                          Learn how to connect your wallet and check your initial reputation score
                        </p>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Read guide →</a>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Understanding Your Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">
                          Learn how reputation scores are calculated and what factors are considered
                        </p>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Read guide →</a>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Improving Your Reputation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">
                          Strategies to improve your on-chain reputation through positive activities
                        </p>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Read guide →</a>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-50 border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Soulbound NFTs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-2">
                          Understanding what makes NFTs "soulbound" and how they represent reputation
                        </p>
                        <a href="#" className="text-sm text-blue-600 hover:underline">Read guide →</a>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span>Advanced Reputation Analysis</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      <p className="text-sm text-gray-600">Detailed look at our AI-powered analysis algorithms</p>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span>Integration Guide for DApps</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      <p className="text-sm text-gray-600">How to add reputation checks to your applications</p>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-600 hover:underline">
                        <span>Reputation in DeFi</span>
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      <p className="text-sm text-gray-600">Using reputation scores for credit scoring and risk assessment</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
          
          {tab === "api" && (
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Reference documentation for the AlgoTrust API</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The AlgoTrust API allows developers to query reputation scores and integrate them into
                  applications. For detailed examples and authentication information, visit the Developer API page.
                </p>
                
                <Tabs defaultValue="reputation">
                  <TabsList>
                    <TabsTrigger value="reputation">Reputation</TabsTrigger>
                    <TabsTrigger value="nfts">NFTs</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reputation">
                    <div className="mt-4 space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-semibold mb-1">GET /api/reputation/:walletAddress</h3>
                        <p className="text-sm text-gray-600 mb-2">Retrieve a wallet's reputation score and metadata</p>
                        <div className="bg-gray-100 p-2 rounded text-sm">
                          <code>{"{"} "score": 76, "walletAddress": "ALGO1234567890XXXX", ... {"}"}</code>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-semibold mb-1">GET /api/reputation/:walletAddress/factors</h3>
                        <p className="text-sm text-gray-600 mb-2">Retrieve detailed breakdown of reputation factors</p>
                        <div className="bg-gray-100 p-2 rounded text-sm">
                          <code>{"["} {"{"} "name": "transactionHistory", "score": 82 {"}"}, ... {"]"}</code>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-semibold mb-1">POST /api/analyze/:walletAddress</h3>
                        <p className="text-sm text-gray-600 mb-2">Run reputation analysis for a wallet</p>
                        <div className="bg-gray-100 p-2 rounded text-sm">
                          <code>{"{"} "analysisId": "123", "status": "complete", ... {"}"}</code>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="nfts">
                    <div className="mt-4 space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-semibold mb-1">GET /api/nfts/:walletAddress</h3>
                        <p className="text-sm text-gray-600 mb-2">Retrieve all Soulbound NFTs for a wallet</p>
                        <div className="bg-gray-100 p-2 rounded text-sm">
                          <code>{"["} {"{"} "name": "Reputation Score", "assetId": "12345" {"}"}, ... {"]"}</code>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-semibold mb-1">POST /api/nfts/:walletAddress</h3>
                        <p className="text-sm text-gray-600 mb-2">Issue a new Soulbound NFT to a wallet</p>
                        <div className="bg-gray-100 p-2 rounded text-sm">
                          <code>{"{"} "success": true, "nftId": "12345", ... {"}"}</code>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transactions">
                    <div className="mt-4 space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-semibold mb-1">GET /api/transactions/:walletAddress</h3>
                        <p className="text-sm text-gray-600 mb-2">Retrieve transaction history for a wallet</p>
                        <div className="bg-gray-100 p-2 rounded text-sm">
                          <code>{"["} {"{"} "txId": "ABC123", "type": "transfer", ... {"}"}, ... {"]"}</code>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-semibold mb-1">POST /api/transactions/:walletAddress</h3>
                        <p className="text-sm text-gray-600 mb-2">Record a new transaction for analysis</p>
                        <div className="bg-gray-100 p-2 rounded text-sm">
                          <code>{"{"} "success": true, "recordedAt": "2025-04-10", ... {"}"}</code>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          
          {tab === "faq" && (
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about AlgoTrust</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is a Soulbound NFT?</AccordionTrigger>
                    <AccordionContent>
                      Soulbound NFTs are non-transferable tokens that are permanently linked to a specific wallet address.
                      Unlike regular NFTs, they cannot be sold or transferred to another wallet, making them
                      ideal for representing reputation, credentials, or achievements that should be tied to a
                      specific identity or wallet.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How is my reputation score calculated?</AccordionTrigger>
                    <AccordionContent>
                      Your reputation score is calculated using a multi-factor analysis of your on-chain activity.
                      The factors include transaction history, DeFi participation, DAO governance involvement,
                      and NFT activities. Each factor is weighted based on its relevance to overall reputation.
                      Our AI model also considers patterns like consistency, diversity, and longevity of activities.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I improve my reputation score?</AccordionTrigger>
                    <AccordionContent>
                      Yes! Your reputation score can improve through positive on-chain activities. This includes
                      maintaining regular transaction activity, participating in DeFi protocols, contributing to
                      DAO governance, and engaging with the NFT ecosystem. The system rewards consistent,
                      diverse, and long-term participation in the Algorand ecosystem.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Is my wallet data private?</AccordionTrigger>
                    <AccordionContent>
                      AlgoTrust only analyzes public on-chain data, which is already visible on the Algorand
                      blockchain. We do not collect any private keys or sensitive information. Reputation scores
                      are published as Soulbound NFTs, which are visible to other blockchain participants, but
                      detailed analysis data can be kept private if desired.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How can I use my reputation score?</AccordionTrigger>
                    <AccordionContent>
                      Your reputation score can be used across DeFi applications, DAOs, and other services
                      that integrate with AlgoTrust. Some potential uses include: preferential access to lending
                      protocols, voting weight in DAOs, discounts or bonuses in DeFi applications, access to
                      exclusive features or communities, and verification of your standing in the Algorand ecosystem.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Can I have multiple reputation scores?</AccordionTrigger>
                    <AccordionContent>
                      Each wallet address has a single overall reputation score, but there are multiple factor
                      scores that contribute to it. You might have a high score in DeFi participation but a lower
                      score in DAO governance, for example. If you use multiple wallets, each wallet will have
                      its own separate reputation score.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}