import { useAnalysis } from "../context/AnalysisContext"
import DataPreviewDetails from "../components/analysis/DataPreviewDetails"

function DataPreview() {

  const {analysisResult} = useAnalysis();

  if(!analysisResult) {
    return (
      <div className="page-card">
        <p className="eyebrow">Data Preview</p>
        <h2>Data Preview</h2>
        <p>No CSV analysis available yet. Upload a file first.</p>
      </div>
    )
  }

  return (
    <div className="analysis-result">
      <div className="page-card">
        <p className="eyebrow">Data Preview</p>
        <h2>{analysisResult.filename}</h2>
        <p>Previewing the first {analysisResult.preview.length} rows of the dataset.</p>
      </div>
      
      <DataPreviewDetails result={analysisResult} />
    </div>
  )
}

export default DataPreview