
function DetailedNumericStatistics({result}){
    if(!result || !result.numeric_statistics){
        return null;
    }

    const numericStatistics = Object.entries(result.numeric_statistics);

    return(
        <div className="analysis-section">
            <div className="analysis-section-header">
                <div>
                    <h4>Detailed numeric statistics</h4>
                    <p>
                        Complete statistical information for every numeric column.
                    </p>
                </div>
            </div>

            {numericStatistics.length > 0 ? (
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
                            {numericStatistics.map(([column, stats]) => (
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
    )
}

export default DetailedNumericStatistics;