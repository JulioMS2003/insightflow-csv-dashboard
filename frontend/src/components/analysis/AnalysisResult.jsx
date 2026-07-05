
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
                <h4>Automatic insights</h4>

                {result.insights && result.insights.length > 0 ? (
                    <div className="insights-grid">
                        {result.insights.map((insight, index) => (
                            <div key={index} className={`insight-card ${insight.type}`}>
                                <div className="insight-header">
                                    <span className="insight-type">{insight.type}</span>
                                </div>
                                    <h5>{insight.title}</h5>
                                    <p>{insight.message}</p>
                            </div>   
                        ))}
                    </div>
                ) : (
                    <p className="success-text">No automatic insights generated.</p>
                )}
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
                <h4>Numeric statistics</h4>

                {result.numeric_columns.length > 0 ? (
                    <div className="numeric-stats-table-wrapper">
                        <table className="numeric-stats-table">
                            <thead>
                                <tr>
                                    <th>Column</th>
                                    <th>Mean</th>
                                    <th>Median</th>
                                    <th>Min</th>
                                    <th>Max</th>
                                    <th>Sum</th>
                                    <th>Std</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.entries(result.numeric_statistics).map(([column, stats]) => (
                                        <tr key={column}>
                                            <td>{column}</td>
                                            <td>{stats.mean ?? "N/A"}</td>
                                            <td>{stats.median ?? "N/A"}</td>
                                            <td>{stats.min ?? "N/A"}</td>
                                            <td>{stats.max ?? "N/A"}</td>
                                            <td>{stats.sum ?? "N/A"}</td>
                                            <td>{stats.std ?? "N/A"}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="success-text">No numeric columns detected.</p>
                )}
            </div>

            <div className="analysis-section">
                <h4>Date analysis</h4>

                {result.date_columns.length > 0 ? (
                    <div className="date-analysis-grid">
                        {Object.entries(result.date_statistics).map(([column, stats]) => (
                            <div key = {column} className="date-analysis-card">
                                <h5>{column}</h5>

                                <div className="date-stats-grid">
                                    <div>
                                        <span>First date</span>
                                        <strong>{stats.first_date}</strong>
                                    </div>
                                    <div>
                                        <span>Last date</span>
                                        <strong>{stats.last_date}</strong>
                                    </div>
                                    <div>
                                        <span>Date range</span>
                                        <strong>{stats.date_range_days}</strong>
                                    </div>
                                    <div>
                                        <span>Valid dates</span>
                                        <strong>{stats.valid_dates}</strong>
                                    </div>
                                    <div>
                                        <span>Invalid dates</span>
                                        <strong>{stats.invalid_dates}</strong>
                                    </div>
                                </div>

                                <div className="records-by-month">
                                    <h6>Records by month</h6>

                                    <div className="month-bars">
                                        {Object.entries(stats.records_by_month).map(([month, count]) => {
                                            const maxCount = Math.max(...Object.values(stats.records_by_month));
                                            const percentage = (count / maxCount) * 100;

                                            return (
                                            <div key={month} className="month-bar-row">
                                                <div className="month-bar-info">
                                                <span>{month}</span>
                                                <strong>{count}</strong>
                                                </div>

                                                <div className="month-bar-track">
                                                <div
                                                    className="month-bar-fill"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                                </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}    
                    </div>
                ) : (
                    <p className="success-text">No date columns detected.</p>
                )}
            </div>

            <div className="analysis-section">
                <h4>Categorical statistics</h4>

                {result.categorical_columns.length > 0 ? (
                    <div className="categorical-stats-table-wrapper">
                        <table className="categorical-stats-table">
                            <thead>
                                <tr>
                                    <th>Column</th>
                                    <th>Unique values</th>
                                    <th>Top value</th>
                                    <th>Top frequency</th>
                                    <th>Top 5 values</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    Object.entries(result.categorical_statistics).map(([column, stats]) => (
                                        <tr key={column}>
                                            <td>{column}</td>
                                            <td>{stats.unique_count}</td>
                                            <td>{stats.top_value ?? "N/A"}</td>
                                            <td>{stats.top_frequency}</td>
                                            <td>
                                                <div className="top-values-list">
                                                    {Object.entries(stats.top_values).map(([value, count]) => (
                                                        <span key={value} className="top-value-pill">
                                                            {value}: {count}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="success-text">No categorical columns detected</p>
                )}
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