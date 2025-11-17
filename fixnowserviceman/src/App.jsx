import { Route, Routes } from "react-router";
import "./App.css";

import ServicemanDashboard from "./pages/ServiceManDashboard";
import ServicemanAuth from "./pages/ServicemanAuth";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<ServicemanDashboard />} />
      <Route index path="/" element={<ServicemanAuth />} />

    </Routes>
  );
}

export default App;
