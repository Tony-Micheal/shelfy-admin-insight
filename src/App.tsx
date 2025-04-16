import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Assortment from "./pages/Assortment";
import SOS from "./pages/SOS";
import Activities from "./pages/Activities";
import Stores from "./pages/Stores";
import Invoices from "./pages/Invoices";
import Products from "./pages/Products";
import OSAReports from "./pages/OSAReports";
import PointsBonuses from "./pages/PointsBonuses";
import Cleanliness from "./pages/Cleanliness";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ImportExport from "./pages/ImportExport";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import EditProduct from "./pages/Products/EditProduct";
import Admins from "./pages/Admins";

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
          <Route path="/sos" element={<SOS />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/products" element={<Products />} />
          <Route path="/osa-reports" element={<OSAReports />} />
          <Route path="/points-bonuses" element={<PointsBonuses />} />
          <Route path="/categories" element={<NotFound />} />
          <Route path="/segments" element={<NotFound />} />
          <Route path="/roles" element={<NotFound />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/import-export" element={<ImportExport />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
