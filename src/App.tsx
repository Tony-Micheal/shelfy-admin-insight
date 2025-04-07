
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Assortment from "./pages/Assortment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assortment" element={<Assortment />} />
          {/* Future routes will be added here */}
          <Route path="/stores" element={<NotFound />} />
          <Route path="/invoices" element={<NotFound />} />
          <Route path="/products" element={<NotFound />} />
          <Route path="/activities" element={<NotFound />} />
          <Route path="/sos" element={<NotFound />} />
          <Route path="/osa-reports" element={<NotFound />} />
          <Route path="/points-bonuses" element={<NotFound />} />
          <Route path="/cleanliness" element={<NotFound />} />
          <Route path="/users" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          <Route path="/import-export" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
