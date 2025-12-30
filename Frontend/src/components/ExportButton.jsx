import { getAIReport } from "../services/api";

function ExportButton() {
  const handleExport = async () => {
    const res = await getAIReport();
    alert(res.report); // later convert to PDF
  };

  return (
    <button onClick={handleExport}>
      Export AI Report
    </button>
  );
}

export default ExportButton;
