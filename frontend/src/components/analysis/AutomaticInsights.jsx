
function AutomaticInsights({result}) {
    if (!result) {
        return null;
    }

    const insights = result.insights || [];

    return (
        <div className="analysis-section">
            <div className="analysis-section-header">
                <div>
                    <h4>Automatic Insights</h4>
                    <p>Automatically generated observations about the dataset</p>
                </div>
            </div>

            {insights.length > 0 ? (
                <div className="insights-grid">
                    {insights.map((insight, index) => (
                        <div key={`${insight.type}-${insight.title}-${index}`} className={`insight-card ${insight.type}`}>
                            <div className="insight-header">
                                <span className="insight-type">{insight.type}</span>
                            </div>

                            <h5>{insight.title}</h5>
                            <p>{insight.message}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="success-text">No automatic insights generated</p>
            )}
        </div>
    )
}

export default AutomaticInsights;