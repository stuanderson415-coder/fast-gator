import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { SplashScreen } from "@/components/splash-screen";
import Dashboard from "@/pages/dashboard";
import StandardsList from "@/pages/standards-list";
import QualityAreaDetail from "@/pages/quality-area-detail";
import StrategiesList from "@/pages/strategies-list";
import FavoritesList from "@/pages/favorites-list";
import StandardDetail from "@/pages/standard-detail";
import NotesList from "@/pages/notes-list";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/standards" component={StandardsList} />
        <Route path="/quality-areas/:qualityAreaId" component={QualityAreaDetail} />
        <Route path="/standards/:standardId" component={StandardDetail} />
        <Route path="/strategies" component={StrategiesList} />
        <Route path="/favorites" component={FavoritesList} />
        <Route path="/notes" component={NotesList} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <SplashScreen />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
