from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO

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
    
    try:
        df = pd.read_csv(BytesIO(content))
    except Exception:
        raise HTTPException(
            status_code = 400,
            detail = "The file could not be read as a valid CSV."
        )

    if df.empty:
        raise HTTPException(
            status_code = 400,
            detail = "The CSV file has not data."
        )
    
    size_kb = round(len(content)/1024,2)
    row_count = len(df)
    columns_count = len(df.columns)
    column = df.columns.to_list()
    column_types = df.dtypes.astype(str).to_dict()
    preview = df.head(10).fillna("").to_dict(orient="records")

    return{
        "filename": file.filename,
        "content_type": file.content_type,
        "size_kb": size_kb,
        "row_count" : row_count,
        "column_count" : columns_count,
        "columns" : column,
        "column_types" : column_types,
        "preview" : preview,
        "message": "CSV analyzed successfully."
        }

# filename
# size_kb
# total rows
# total columns
# column names
# column types
# preview of the first rows