import FileUploader from "../components/upload/FileUploader.jsx";

function Home() {
  return (
    <section className="page-card">
      <p className="eyebrown">Upload a CSV file to get started.</p>
      <h2>Start Analyzing your CSV Data</h2>
      <p>Upload a CSV file to generate metrics, detect data quality issues, visualize trends and create smart insights.</p>
      <FileUploader />
    </section>
  )
}

export default Home