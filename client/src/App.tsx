import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import NFTs from "@/pages/nfts";
import Analytics from "@/pages/analytics";
import Developer from "@/pages/developer";
import Docs from "@/pages/docs";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { AlgoWalletProvider } from "@/hooks/use-algo-wallet";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/nfts" component={NFTs} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/developer" component={Developer} />
      <Route path="/docs" component={Docs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlgoWalletProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </AlgoWalletProvider>
    </QueryClientProvider>
  );
}

export default App;
