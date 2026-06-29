
function AnalysisResult({result}){
    if (!result){
        return null;
    }

    const quality = result.quality;
    
    return(
        <div className="analysis-result">
            <div className="analysis-summary">
                <div className="summary-card">
                    <span>Rows</span>
                    <strong>{result.row_count}</strong>
                </div>

                <div className="summary-card">
                    <span>Columns</span>
                    <strong>{result.column_count}</strong>
                </div>

                <div className="summary-card">
                    <span>File size</span>
                    <strong>{result.size_kb} KB</strong>
                </div>  
            </div>

            <div className="analysis-section">
                <h4>Data quality</h4>

                <div className="quality-grid">
                    <div className="quality-card">
                    <span>Quality score</span>
                    <strong>{quality.data_quality_score}%</strong>
                    </div>

                    <div className="quality-card">
                    <span>Missing values</span>
                    <strong>{quality.total_missing_values}</strong>
                    </div>

                    <div className="quality-card">
                    <span>Missing percentage</span>
                    <strong>{quality.missing_percentage}%</strong>
                    </div>

                    <div className="quality-card">
                    <span>Duplicate rows</span>
                    <strong>{quality.duplicate_rows}</strong>
                    </div>

                    <div className="quality-card">
                    <span>Duplicate percentage</span>
                    <strong>{quality.duplicate_percentage}%</strong>
                    </div>
                </div>

                <div className="empty-columns-box">
                    <h5>Empty columns</h5>

                    {quality.empty_columns.length > 0 ? (
                    <div className="columns-list">
                        {quality.empty_columns.map((column) => (
                        <span key={column} className="column-pill danger">
                            {column}
                        </span>
                        ))}
                    </div>
                    ) : (
                    <p className="success-text">No empty columns detected.</p>
                    )}
                </div>
            </div>
            <div className="analysis-section">
                <h4>Detected columns</h4>
                <div className="columns-list">
                    {result.columns.map((column) => (
                        <span key={column} className="column-pill">
                            {column}
                        </span>
                    ))}
                </div>
            </div>
            <div className="analysis-section">
                <h4>Column types</h4>
                <div className="column-types">
                    {Object.entries(result.column_types).map(([column, type]) => (
                        <div key={column} className="column-type-row">
                            <span>{column}</span>
                            <strong>{type}</strong>
                        </div>
                    ))}
                </div>
            </div>
            <div className="analysis-section">
                <h4>Data preview</h4>
                <div className="preview-table-wrapper">
                    <table className="preview-table">
                        <thead>
                            <tr>
                                {result.columns.map((column) => (
                                    <th key={column}>{column}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                                {result.preview.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {result.columns.map((column) => (
                                            <td key={column}>{row[column]}</td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AnalysisResult;