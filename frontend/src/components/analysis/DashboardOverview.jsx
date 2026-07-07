
function DashboardOverview({result}) {
    if(!result){
        return null;
    }

const quality = result.quality;
const qualityScore = quality.data_quality_score;

return (
    <div className="dashboard-overview">
        <div className="dashboard-overview-header">
            <div>
                <p className="section-eyebrow">Overview</p>
                <h4>Dashboard overview</h4>
            </div>

            <span className="quality-badge">
                {result.filename}
            </span>
        </div>

        <div className="overview-cards">
            <div className="overview-card">
                <span>Rows</span>
                <strong>{result.row_count}</strong>
            </div>
            <div className="overview-card">
                <span>Columns</span>
                <strong>{result.column_count}</strong>
            </div>
            <div className="overview-card">
                <span>File size</span>
                <strong>{result.size_kb} KB</strong>
            </div>
            <div className="overview-card">
                <span>Data quality</span>
                <strong>{qualityScore}%</strong>
            </div>
            <div className="overview-card">
                <span>Missing values</span>
                <strong>{quality.total_missing_values}</strong>
            </div>
            <div className="overview-card">
                <span>Duplicate rows</span>
                <strong>{quality.duplicate_rows}</strong>
            </div>
        </div>

        <div className="quality-overview-card">
            <div className="quality-overview-header">
                <div>
                    <span>Data quality score</span>
                    <strong>{qualityScore}%</strong>
                </div>

                <p>
                    Missing : {quality.missing_percentage}% • Duplicate : {quality.duplicate_percentage}%
                </p>
            </div>

            <div className="quality-progress-track">
                <div className="quality-progress-fill" style={{width: `${qualityScore}%`}}></div>
            </div>
        </div>
    </div>
    )
}

export default DashboardOverview;