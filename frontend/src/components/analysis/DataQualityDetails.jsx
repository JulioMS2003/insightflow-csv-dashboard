
function DataQualityDetails({result}){

    if(!result){
        return null;
    }

    const quality = result.quality;
    const emptyColumns = quality.empty_columns || [];

    const missingByColumn = Object.entries(quality.missing_values || {}).filter(
        ([column, count]) => count > 0 && !emptyColumns.includes(column));

    return(
        <div className="analysis-section">
            <div className="analysis-section-header">
                <div>
                    <h4>Data Quality Details</h4>   
                    <p>Detailed checks for missing values, empty columns and duplicates.</p>
                </div>
            </div>

            <div className="quality-details-grid">
                <div className="quality-detail-card">
                    <h5>Missing values by column</h5>

                    {missingByColumn.length > 0 ? (
                        <div>
                            {missingByColumn.map(([column, count]) => (
                                <div key={column} className="quality-list-row">
                                    <span>{column}</span>
                                    <strong>{count}</strong>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="success-text">No missing values detected by column.</p>
                    )}
                </div>

                <div className="quality-detail-card">
                    <h5>Empty columns</h5>

                    {emptyColumns.length > 0 ? (
                        <div className="columns-list">
                            {emptyColumns.map((column) => (
                                <span key={column} className="column-pill danger">
                                    {column}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="success-text">No empty columns detected.</p>
                    )}
                </div>

                <div className="quality-detail-card">
                    <h5>Duplicate Rows</h5>

                    {quality.duplicate_rows > 0 ? (
                        <div className="quality-alert warning">
                            <strong>{quality.duplicate_rows}</strong>
                            <span>
                                duplicate rows detected, representing{" "}
                                {quality.duplicate_percentage}% of the dataset.
                            </span>
                        </div>
                    ) : (
                        <p className="success-text">No duplicate rows detected</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DataQualityDetails;
