
function NumericOverview({result}){
    if(!result || !result.numeric_statistics){
        return null;
    }

    const excludeKeywords=[
        "id",
        "code",
        "uuid",
        "phone",
        "zip",
        "postal"
    ];

    const avaliableColumns = Object.entries(result.numeric_statistics).filter(
        ([column, stats]) => {
            const columnName = column.toLowerCase();

            const hasExcludedKeyword = excludeKeywords.some((keyword) =>
                columnName.includes(keyword)
            );

            const hasValidStats = stats.mean !== null && stats.min !== null && stats.max !== null;

            return !hasExcludedKeyword && hasValidStats 
        }).slice(0,8)

    if(avaliableColumns.length === 0){
        return null;
    }

    return(
        <div className="analysis-section">
            <div className="analysis-section-header">
                <div>
                    <h4>Numeric overview</h4>
                    <p>Quick summary of the most relevant numeric columns.</p>
                </div>
            </div>

            <div className="numeric-overview-grid">
                {avaliableColumns.map(([column, stats]) => (
                    <div key={column} className="numeric-overview-card">
                        <div className="numeric-overview-header">
                            <span>Column</span>
                            <h5>{column}</h5>
                        </div>

                        <div className="numeric-main-stat">
                            <span>Average</span>
                            <strong>{stats.mean}</strong>
                        </div>

                        <div className="numeric-mini-grid">
                            <div>
                                <span>Min</span>
                                <strong>{stats.min}</strong>
                            </div>

                            <div>
                                <span>Max</span>
                                <strong>{stats.max}</strong>
                            </div>

                            <div>
                                <span>Median</span>
                                <strong>{stats.median}</strong>
                            </div>

                            <div>
                                <span>Total</span>
                                <strong>{stats.sum}</strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NumericOverview;