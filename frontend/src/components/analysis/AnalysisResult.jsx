import { Link } from 'react-router-dom';

function AnalysisResult({result}){
    if (!result){
        return null;
    }

    return(
        <div className="analysis-complete-card">
            <div className="analysis-complete-header">
                <div>
                    <p className="section-eyebrow">Analysis complete</p>
                    <h3>{result.filename}</h3>
                    <p>
                        Your CSV was analysed successfully. Explore the results using the sections below.
                    </p>
                </div>

                <span className="analysis-complete-badge">
                    {result.quality.data_quality_score}% quality.
                </span>
            </div>

            <div className="analysis-complete-summary">
                <div>
                <span>Rows</span>
                <strong>{result.row_count}</strong>
                </div>

                <div>
                <span>Columns</span>
                <strong>{result.column_count}</strong>
                </div>

                <div>
                <span>Missing values</span>
                <strong>{result.quality.total_missing_values}</strong>
                </div>

                <div>
                <span>Duplicate rows</span>
                <strong>{result.quality.duplicate_rows}</strong>
                </div>
            </div>

            <div className="analysis-navigation-grid">
                <Link to="/dashboard" className="analysis-navigation-card">
                    <span>Dashboard</span>
                    <strong>View visual overview</strong>
                </Link>
                <Link to="/insights" className="analysis-navigation-card">
                    <span>Insights</span>
                    <strong>Review automatic findings</strong>
                </Link>

                <Link to="/data" className="analysis-navigation-card">
                    <span>Data Preview</span>
                    <strong>Inspect columns and rows</strong>
                </Link>

                <Link to="/details" className="analysis-navigation-card">
                    <span>Analysis Details</span>
                    <strong>Explore detailed statistics</strong>
                </Link>
            </div>
        </div>
    )
}

export default AnalysisResult;