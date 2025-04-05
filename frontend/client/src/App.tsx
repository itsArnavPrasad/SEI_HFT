import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import StrategyBuilder from "@/pages/strategy-builder";
import Simulation from "@/pages/simulation";
import Learn from "@/pages/learn";
import DexIntegration from "@/pages/dex-integration";
import AuthPage from "@/pages/auth-page";
import { AppLayout } from "@/components/layout/app-layout";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/strategy-builder" component={StrategyBuilder} />
      <ProtectedRoute path="/simulation" component={Simulation} />
      <ProtectedRoute path="/learn" component={Learn} />
      <ProtectedRoute path="/dex-integration" component={DexIntegration} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppLayout>
          <Router />
        </AppLayout>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
