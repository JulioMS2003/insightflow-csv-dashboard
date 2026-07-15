import { useAnalysis } from "../context/AnalysisContext.jsx"
import DetailedNumericStatistics from "../components/analysis/DetailedNumericStatistics.jsx"
import DateAnalysisDetails from "../components/analysis/DateAnalysisDetails.jsx"
import CategoricalStatisticsDetails from "../components/analysis/CategoricalStatisticsDetails.jsx";

function AnalysisDetails(){

    const { analysisResult } = useAnalysis();

    if(!analysisResult) {
        return(
            <div className="page-card">
                <p className="eyebrow">Analysis Details</p>
                <h2>Analysis Details</h2>
                <p>No CSV analysis available yet. Upload a file first.</p>
            </div>
        );
    }

    return(
        <div className="analysis-result">
            <div className="page-card">
                <p className="eyebrow">Analysis Details</p>
                <h2>{analysisResult.filename}</h2>
                <p>Detailed statistics analysis of the uploaded dataset.</p>
            </div>

            <DetailedNumericStatistics result={analysisResult} />
            <DateAnalysisDetails result={analysisResult} />
            <CategoricalStatisticsDetails result={analysisResult} />
        </div>
    )
}

export default AnalysisDetails;