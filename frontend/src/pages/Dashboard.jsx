import React from 'react'
import { useAnalysis } from '../context/AnalysisContext.jsx'

function Dashboard() {

    const { analysisResult } = useAnalysis();
    return (
    <div className="page-card">
      <p className="eyebrow">Dashboard</p>
      <h2>Dashboard</h2>
      {analysisResult ? (
        <p>Current file : {analysisResult.filename}</p>
      ) : (
        <p>No CSV analysis avaliable yet. Upload a file first</p>
      )}
    </div>
  )
}

export default Dashboard