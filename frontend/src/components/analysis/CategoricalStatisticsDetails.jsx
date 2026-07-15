
function CategoricalStatisticsDetails({result}){
    if(!result || !result.categorical_statistics){
        return null;
    }

    const categoricalStatistics = Object.entries(result.categorical_statistics);

    return(
        <div className="analysis-section">
            <div className="analysis-section-header">
                <div>
                    <h4>Detailed categorical statistics</h4>
                    <p>Frequency and uniqueness information for every categorical column.</p>
                </div>
            </div>

            {categoricalStatistics.length > 0 ? (
                <div className="categorical-stats-table-wrapper">
                    <table className="categorical-stats-table">
                        <thead>
                            <tr>
                                <th>Column</th>
                                <th>Unique values</th>
                                <th>Top Value</th>
                                <th>Top frecuency</th>
                                <th>Top 5 values</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categoricalStatistics.map(([column, stats]) => (
                                <tr key={column}>
                                    <td>{column}</td>
                                    <td>{stats.unique_count}</td>
                                    <td>{stats.top_value ?? "N/A"}</td>
                                    <td>{stats.top_frequency}</td>
                                    <td>
                                        <div className="top-values-list">
                                            {Object.entries(stats.top_values || {}).map(([value, count]) => (
                                                <span key={`${column}-${value}`} className ="top-value-pill">
                                                    {value} : {count}
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
                <p className="success-text">No categorical columns detected.</p>
            )}
        </div>
    )
}

export default CategoricalStatisticsDetails;