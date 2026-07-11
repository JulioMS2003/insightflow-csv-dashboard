import { useAnalysis } from '../context/AnalysisContext.jsx';
import AutomaticInsights from '../components/analysis/AutomaticInsights.jsx'; 
import DataQualityDetails from '../components/analysis/DataQualityDetails.jsx'

function Insights() {

    const { analysisResult } = useAnalysis();

    if(!analysisResult) {
      return (
      <div className="page-card">
        <p className="eyebrow">Insights</p>
        <h2>Insights</h2>
        <p>No CSV analysis available yet. Upload a file first.</p>
      </div>
      );
    }

    return(
      <div className="analysis-result">
        <AutomaticInsights result={analysisResult} />
        <DataQualityDetails result={analysisResult} />
      </div>
    )
}

export default Insights;