
function DataPreviewDetails({result}){

    if(!result) {
        return null;
    }

    return(
        <>
            <div className="analysis-section">
                <h4>Detected columns</h4>

                <div className="columns-list">
                    {result.columns.map((column) => (
                        <span key={column} className="column-pill">{column}</span>
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
                                        <td key={`${rowIndex}-${column}`}>
                                            {row[column] === "" ? "-" : row[column]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DataPreviewDetails;