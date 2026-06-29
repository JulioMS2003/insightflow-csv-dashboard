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

# quality

    missing_values = df.isnull().sum().to_dict()
    total_missing_values = int(df.isnull().sum().sum())
    total_cells = row_count * columns_count
    missing_percentage = round((total_missing_values / total_cells) * 100, 2) if total_cells > 0 else 0
    duplicate_rows = int(df.duplicated().sum())
    empty_columns = df.columns[df.isnull().all()].to_list()
    duplicate_percentage = (duplicate_rows / row_count) * 100 if row_count > 0 else 0
    empty_column_penalty = len(empty_columns) * 10
    data_quality_score = 100 - (missing_percentage * 0.5) - (duplicate_percentage * 0.3) - (empty_column_penalty * 0.2)
    data_quality_score = max(round(data_quality_score, 2), 0)

    quality = {
        "missing_values": missing_values,
        "total_missing_values": total_missing_values,
        "missing_percentage": missing_percentage,

        "duplicate_rows": duplicate_rows,
        "duplicate_percentage": round(duplicate_percentage, 2),

        "empty_columns": empty_columns,
        "empty_column_penalty": round(empty_column_penalty, 2),

        "data_quality_score": data_quality_score
    }

    numeric_columns = df.select_dtypes(include="number").columns.to_list()
    numeric_columns = [
        column for column in numeric_columns
        if column not in empty_columns
    ]
    numeric_statistics = {}
    
    for columns in numeric_columns:
        column_data = df[columns].dropna()

        if column_data.empty:
            numeric_statistics[columns] = {
            "mean" : None,
            "median" : None,
            "min" : None,
            "max" : None,
            "sum" : 0,
            "std" : None
        }
            continue
        numeric_statistics[columns] = {
            "mean" : round(float(column_data.mean()),2),
            "median" : round(float(column_data.median()),2),
            "min" : round(float(column_data.min()),2),
            "max" : round(float(column_data.max()),2),
            "sum" : round(float(column_data.sum()),2),
            "std" : round(float(column_data.std()),2) if len(column_data) > 1 else 0
        }

    return{
        "filename": file.filename,
        "content_type": file.content_type,
        "size_kb": size_kb,
        "row_count" : row_count,
        "column_count" : columns_count,
        "columns" : column,
        "column_types" : column_types,
        "preview" : preview,
        "quality" : quality,
        "numeric_columns" : numeric_columns,
        "numeric_statistics" : numeric_statistics,
        "message": "CSV analyzed successfully."
        }

# filename
# size_kb
# total rows
# total columns
# column names
# column types
# preview of the first rows