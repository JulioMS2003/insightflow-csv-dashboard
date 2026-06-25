const API_URL = 'http://127.0.0.1:8000';

export async function getBackendHealth() {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    return data;
}

export async function analyzeCsvFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || 'Error analyzing CSV file');
    }

    return data;
}