import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/product/Product";
 import Summary from "./pages/Summary/Summary";
import InvoiceCreate from "./pages/Invoice/InvoiceCreate";
import Dashboard from "./pages/dashboard/Dashboard";
 



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Full page login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* After login layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="invoice" element={<InvoiceCreate/>} />
          <Route path="products" element={<Products />} />
          <Route path="summary" element={<Summary />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
