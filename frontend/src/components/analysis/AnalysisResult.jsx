
function AnalysisResult({result}){
    if (!result){
        return null;
    }
    
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
                        <div key={column} className="column_type_row">
                            <span>{column} = </span>
                            <strong>{type}</strong>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" analysis-section">
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