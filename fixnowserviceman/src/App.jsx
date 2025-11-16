import { Route, Routes } from "react-router";
import "./App.css";

import ServicemanDashboard from "./pages/ServiceManDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ServicemanDashboard />} />

    </Routes>
  );
}

export default App;
