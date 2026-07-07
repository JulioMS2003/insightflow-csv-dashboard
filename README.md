# InsightFlow - Smart CSV Analytics Dashboard

InsightFlow is a full-stack data analytics dashboard built with React, FastAPI and Pandas.

The application will allow users to upload CSV files, analyze data quality, detect column types, calculate metrics, generate charts and display smart insights.

## Tech Stack

- React
- Vite
- FastAPI
- Python
- Pandas
- pnpm
- Git and GitHub

## Current Progress

## Current Progress

### Day 1

* Created the React frontend with Vite and pnpm.
* Created the FastAPI backend.
* Added the `/health` endpoint.
* Connected the frontend with the backend.
* Initialized the Git repository.
* Uploaded the project to GitHub.

### Day 2

* Built the main dashboard layout.
* Created Sidebar, Header and Layout components.
* Added navigation with React Router.
* Created base pages for Upload CSV, Dashboard, Data Preview, Insights and History.
* Applied the first professional dashboard styles.

### Day 3

* Created the CSV file uploader component.
* Added frontend validation for `.csv` files.
* Displayed selected file name and file size.
* Added error handling for invalid files.
* Prepared the Analyze CSV button.

### Day 4

* Created the `/analyze` endpoint in FastAPI.
* Connected the Analyze CSV button with the backend.
* Sent CSV files from React using FormData.
* Validated uploaded files in the backend.
* Displayed the backend response in the frontend.

### Day 5

* Integrated Pandas to read uploaded CSV files.
* Extracted dataset structure from the CSV.
* Returned row count, column count, column names and column types.
* Generated a preview of the first rows.
* Displayed the CSV analysis dynamically in React.

### Day 6

* Added basic data quality profiling with Pandas.
* Calculated missing values by column.
* Calculated total missing values and missing percentage.
* Detected duplicate rows.
* Detected completely empty columns.
* Added a weighted data quality score.
* Displayed data quality metrics in React.
* Tested the system with CSV files containing missing values and empty columns.

### Day 07
* Added categorical statistics analysis.
* Detected categorical columns automatically.
* Calculated unique values, top value, top frequency and top 5 values.
* Displayed categorical statistics in React.

### Day 08
* Added automatic date column detection.
* Calculated first date, last date, date range, valid dates and invalid dates.
* Added records by month analysis.
* Excluded date columns from categorical statistics.
* Displayed date analysis in React.

### Day 09
* Added automatic insights generation in the backend.
* Generated summary, quality, warning, numeric, categorical and date insights.
* Displayed insights as colored cards in React.

### Day 10
* Added dashboard overview section.
* Added visual data quality progress bar.
* Reorganized data quality information.
* Created detailed checks for missing values, empty columns and duplicate rows.
* Improved the analysis layout to avoid repeated information.