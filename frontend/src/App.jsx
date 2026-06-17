import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";

import Home from "./pages/Home.jsx";
import Insights from "./pages/Insights.jsx";
import History from "./pages/History.jsx";
import DataPreview from "./pages/DataPreview.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import './App.css';


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="insights" element={<Insights />} />
        <Route path="history" element={<History />} />
        <Route path="data" element={<DataPreview />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
