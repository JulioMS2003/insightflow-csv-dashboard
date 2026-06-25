from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return{"status": "ok"}

@app.post("/analyze")
async def analyze_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code = 400,
            detail = "Only CSV files are allowed."
        )
    
    content = await file.read()
    
    if len(content) == 0:
        raise HTTPException(
            status_code = 400,
            detail = "The CSV file is empty."
        )
    
    return{
        "filename": file.filename,
        "content_type": file.content_type,
        "size_kb": round(len(content)/1024,2),
        "message": "File received successfully."
        }