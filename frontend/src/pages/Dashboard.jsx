import React from 'react'
import { useAnalysis } from '../context/AnalysisContext.jsx';
import DashboardOverview from '../components/analysis/DashboardOverview.jsx';
import TopCategoriesOverview from '../components/analysis/TopCategoriesOverview.jsx';
import NumericOverview from '../components/analysis/NumericOverview.jsx';

function Dashboard() {

    const { analysisResult } = useAnalysis();

    if(!analysisResult) {
    return (
    <div className="page-card">
      <p className="eyebrow">Dashboard</p>
      <h2>Dashboard</h2>
      <p>No CSV analysis avaliable yet. Upload a file first</p>
    </div>
    )
  }

  return(
    <div className='analysis-result'>
      <DashboardOverview result ={analysisResult} />
      <TopCategoriesOverview result ={analysisResult} />
      <NumericOverview result ={analysisResult} />
    </div>
  )
}

export default Dashboard