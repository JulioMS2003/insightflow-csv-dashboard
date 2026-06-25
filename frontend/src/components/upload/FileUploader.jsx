import { useState } from 'react';
import { analyzeCsvFile } from '../../services/api.js';

function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        setAnalysisResult(null); 

        if (!file){
            setSelectedFile(null);
            setError("");
            return;
        }    
        else if (file.name.toLowerCase().endsWith('.csv')) {
            setSelectedFile(file);
            setError("");
        }
        else {
            setSelectedFile(null);
            setError("Please select a valid CSV file.");
        }
    }

    async function handleAnalyzeClick() {
        if (!selectedFile) { 
            return;
        }

        try{
            setIsLoading(true);
            setError("");
            setAnalysisResult(null);
            
            const result = await analyzeCsvFile(selectedFile);

            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            setError(error.message || "An error occurred while analyzing the CSV file.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="file-uploader">
            <div className="upload-box">
                <p className="upload-label">Upload CSV File</p>
                <h3>Select your dataset</h3>
                <p className="upload-description">Choose a CSV file to generate metrics, charts and smart insights.</p>
                <input type = "file" accept='.csv' onChange={handleFileChange} className="file-input"/>
                
                {error &&
                    <p className="error">{error}</p>
                }
                {selectedFile && (
                    <div className="file-info">
                        <p className="file-info-label">Selected file</p>
                        <p className="file-info-name">{selectedFile.name}</p>
                        <p className="file-info-size">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                    </div>
                )}
                <button type="button" disabled={!selectedFile || isLoading} className="analyze-button" onClick={handleAnalyzeClick}>
                    {isLoading ? "Analyzing..." : "Analyze CSV"}
                </button>
                {analysisResult && (
                    <div className="analysis-result">
                        <p className="file_info_label">Backend response</p>
                        <p>Filename : {selectedFile.name}</p>
                        <p>Content type : {analysisResult.content_type}</p>
                        <p>Size : {analysisResult.size_kb} KB</p>
                        <p>Status : {analysisResult.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileUploader