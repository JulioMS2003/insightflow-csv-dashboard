import { useState } from 'react';

function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");

    function handleFileChange(event) {
        const file = event.target.files[0];
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

    function handleAnalyzeClick() {
        if (!selectedFile) { 
            return;
        }
        console.log("Select file : ", selectedFile);
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
                <button type="button" disabled={!selectedFile} className="analyze-button" onClick={handleAnalyzeClick}>
                    Analyze CSV
                </button>
            </div>
        </div>
    );
}

export default FileUploader