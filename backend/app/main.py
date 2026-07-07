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
    column_names = df.columns.to_list()
    column_types = df.dtypes.astype(str).to_dict()
    preview = df.head(10).fillna("").to_dict(orient="records")

# quality

    missing_values = df.isnull().sum().to_dict()
    total_missing_values = int(df.isnull().sum().sum())
    total_cells = row_count * columns_count
    missing_percentage = round((total_missing_values / total_cells) * 100, 2) if total_cells > 0 else 0
    duplicate_rows = int(df.duplicated().sum())
    empty_columns = []
    empty_columns = [
        column for column in df.columns
        if df[column].isna().all() or df[column].astype(str).str.strip().eq("").all()
    ]

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

    date_columns = []
    date_statistics = {}

    possible_date_columns = df.select_dtypes(include="object").columns.to_list()

    for columns in possible_date_columns:
        if columns in empty_columns:
            continue

        converted_dates = pd.to_datetime(df[columns], errors="coerce")
        valid_dates = converted_dates.notna().sum()
        total_values = df[columns].dropna().shape[0]

        if total_values == 0:
            continue

        valid_percentage = (valid_dates / total_values) * 100

        if valid_percentage >= 80:
            date_columns.append(columns)

            clean_dates = converted_dates.dropna()

            records_by_month = (
                clean_dates.
                dt.to_period("M")
                .astype(str)
                .value_counts()
                .sort_index()
                .to_dict()
            )

            first_date = clean_dates.min()
            last_date = clean_dates.max()

            date_statistics[columns] = {
                "first_date" : first_date.date().isoformat(),
                "last_date" : last_date.date().isoformat(),
                "date_range_days" : int((last_date - first_date).days),
                "valid_dates" : int(valid_dates),
                "invalid_dates" : int(total_values - valid_dates),
                "records_by_month": records_by_month
            }

    categorical_columns = df.select_dtypes(include="object").columns.to_list()
    categorical_columns = [
        column for column in categorical_columns
        if column not in empty_columns
        and column not in date_columns
    ]
    categorical_statistics = {}

    for columns in categorical_columns:
        column_data = df[columns].dropna()

        if column_data.empty:
            categorical_statistics[columns] = {
            "unique_count" : 0,
            "top_value" : None,
            "top_frequency" : 0,
            "top_values" : {}
        }
            continue

        value_counts = column_data.value_counts().head(5)
        
        categorical_statistics[columns] = {
            "unique_count" : int(column_data.nunique()),
            "top_value" : str(value_counts.index[0] if not value_counts.empty else None),
            "top_frequency" : int(value_counts.iloc[0] if not value_counts.empty else 0),
            "top_values" : value_counts.to_dict()
        }

    insights=[]

    insights.append({
        "type": "summary",
        "title": "Dataset size",
        "message": f"The dataset constains {row_count} rows and {columns_count} columns."
    })

    insights.append({
        "type": "quality",
        "title": "Data quality score",
        "message": f"The data quality score is {data_quality_score} out of 100."
    })

    if total_missing_values == 0:
        insights.append({
            "type": "quality",
            "title": "Missing values",
            "message": "No missing values where found in the dataset."
        })
    else:
        insights.append({
            "type": "warning",
            "title": "Missing values detected",
            "message": f"There are {total_missing_values} missing values in the dataset, representing {missing_percentage}% of the cells."
        })

    if duplicate_rows == 0:
        insights.append({
            "type": "quality",
            "title": "Duplicate rows",
            "message": "No duplicate rows where detected."
        })    
    else:
        insights.append({
            "type": "warning",
            "title": "Duplicate rows detected",
            "message": f"The dataset contains {duplicate_rows} duplicate rows."
        })  

    if "revenue" in numeric_columns:
        revenue_stats = numeric_statistics["revenue"]

        insights.append({
            "type": "numeric",
            "title": "Revenue overview",
            "message": f"Revenue ranges from {revenue_stats['min']} to {revenue_stats['max']}, with an average of {revenue_stats['mean']}."
        })

    important_categorical_columns =[
        "category",
        "region",
        "sales_channel",
        "payment_method",
        "shipping_status"
    ]

    for columns in important_categorical_columns:
        if columns in categorical_statistics:
            stats = categorical_statistics[columns]

            insights.append({
                "type": "categorical",
                "title": f"Most frequent {columns}",
                "message": f"The most frequent value in {columns} is {stats['top_value']} with {stats['top_frequency']} records."
            })

    for columns, stats in date_statistics.items():
        insights.append({
            "type": "date",
            "title": f"Date range for {columns}",
            "message": f"The date range goes from {stats['first_date']} to {stats['last_date']}, covering {stats['date_range_days']} days."
        })

    return{
        "filename": file.filename,
        "content_type": file.content_type,
        "size_kb": size_kb,
        "row_count" : row_count,
        "column_count" : columns_count,
        "columns" : column_names,
        "column_types" : column_types,
        "preview" : preview,
        "quality" : quality,
        "numeric_columns" : numeric_columns,
        "numeric_statistics" : numeric_statistics,
        "date_columns" : date_columns,
        "date_statistics" : date_statistics,
        "categorical_columns" : categorical_columns,
        "categorical_statistics" : categorical_statistics,
        "insights" : insights,
        "message": "CSV analyzed successfully."
        }

# filename
# size_kb
# total rows
# total columns
# column names
# column types
# preview of the first rows