
function DateAnalysisDetails({result}){
    if(!result || !result.date_statistics){
        return null;
    }

    const dateStatistics = Object.entries(result.date_statistics);

    return(
        <div className="analysis-section">
            <div className="analysis-section-header">
                <div>
                    <h4>Date analysis</h4>
                    <p>Date ranges, valid values and monthly record distribution.</p>
                </div>
            </div>

            {dateStatistics.length > 0 ? (
                <div className="date-analysis-grid">
                    {dateStatistics.map(([column, stats]) => {
                        const monthlyRecords = Object.entries(stats.records_by_month || {})
                    
                        const maxCount = monthlyRecords.length > 0 ? Math.max(...monthlyRecords.map(([,count]) => count)) : 0;

                        return(
                            <div key={column} className="date-analysis-card">
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
                                        <strong>{stats.date_range_days} days</strong>
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

                                    {monthlyRecords.length > 0 ? (
                                        <div className="month-bars">
                                            {monthlyRecords.map(([month, count]) => {
                                                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

                                                return (
                                                    <div key={month} className="month-bar-row">
                                                        <div className="month-bar-info">
                                                            <span>{month}</span>
                                                            <strong>{count}</strong>
                                                        </div>

                                                        <div className="month-bar-track">
                                                            <div className="month-bar-fill" style={{width : `${percentage}%`}}></div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <p className="success-text">No monthly records available.</p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p className="success-text">No date columns detected.</p>
            )}
        </div>
    )
}

export default DateAnalysisDetails;