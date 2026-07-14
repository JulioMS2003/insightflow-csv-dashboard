import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import { AnalysisProvider } from "./context/AnalysisContext.jsx";

import Home from "./pages/Home.jsx";
import Insights from "./pages/Insights.jsx";
import History from "./pages/History.jsx";
import DataPreview from "./pages/DataPreview.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AnalysisDetails from "./pages/AnalysisDetails.jsx"

import './App.css';


function App() {
  return (
  <AnalysisProvider>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="data" element={<DataPreview />} />
          <Route path="insights" element={<Insights />} />
          <Route path="details" element ={<AnalysisDetails />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AnalysisProvider>
  );
}

export default App;
