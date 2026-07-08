
function TopCategoriesOverview({result}){
    if(!result || !result.categorical_statistics){
        return null;
    }

    // const importantColumns = [
    //     "category",
    //     "region",
    //     "sales_channel",
    //     "payment_method",
    //     "shipping_status",
    //     "customer_segment"
    // ];

    const excludedKeywords = [
        "id",
        "code",
        "uuid",
        "email",
        "phone",
        "url",
        "name",
        "description",
        "notes",
    ];

    // const availableColumns = importantColumns.filter(
    //     (column) => result.categorical_statistics[column]
    // );

    const availableColumns = Object.entries(result.categorical_statistics).filter(
        ([column, stats]) => {
            const columnName = column.toLowerCase();

            const hasExcludedKeyword = excludedKeywords.some((keyword) => 
            columnName.includes(keyword)
        );

            const hasUsefulUniqueValues = stats.unique_count > 1 && stats.unique_count <= 20;

            const hasRepeatedValues = stats.top_frequency > 1;

            return(
                !hasExcludedKeyword && hasUsefulUniqueValues && hasRepeatedValues
            );
        }).slice(0,8).map(([column]) => column);
    

    if(availableColumns.length === 0){
        return null
    }

    return(
        <div className="analysis-section">
            <div className="analysis-section-header">
                <div>
                    <h4>Top categorical overview</h4>
                    <p>Visual summary of the most frequent values in key categorical columns.</p>
                </div>
            </div>

            <div className="top-categories-grid">
                {availableColumns.map((column) => {
                    const stats = result.categorical_statistics[column];
                    const topValues = Object.entries(stats.top_values || {});
                    const maxCount = Math.max(...topValues.map(([,count]) => count)); 

                    return(
                        <div key={column} className="top-category-card">
                            <div className="top-category-header">
                                <div>
                                    <span>Column</span>
                                    <h5>{column}</h5>
                                </div>

                                <strong>{stats.unique_count} unique</strong>
                            </div>

                            <div className="category-bars">
                                {topValues.map(([value, count]) => {
                                    const percentage = (count / maxCount) * 100;

                                    return(
                                        <div key={value} className="category-bar-row">
                                            <div className="category-bar-label">
                                                <span>{value}</span>
                                                <strong>{count}</strong>
                                            </div>

                                            <div className="category-bar-track">
                                                <div className="category-bar-fill" style={{width: `${percentage}%`}}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TopCategoriesOverview;