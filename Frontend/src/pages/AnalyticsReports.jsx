import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './AnalyticsReports.css';

ChartJS.register(
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function AnalyticsReports() {

  const exportPDF = async () => {
    const dashboard = document.getElementById('analytics-export');
    if (!dashboard) return;

    const canvas = await html2canvas(dashboard, {
      scale: 2,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
    pdf.save('analytics-report.pdf');
  };

  return (
    <div className="analytics-container">

      {/* EXPORT BUTTON */}
      <div className="export-bar">
        <button className="export-btn" onClick={exportPDF}>
          Export Report
        </button>
      </div>

      {/* EXPORTABLE CONTENT */}
      <div id="analytics-export" className="analytics-page">

        {/* HEADER */}
        <div className="analytics-header">
          <div>
            <h1>Analytics Reports</h1>
            <p>Comprehensive waste management insights</p>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Collected</span>
            <h2>15,900 tons</h2>
            <small className="positive">+8.3%</small>
          </div>

          <div className="stat-card">
            <span>Recycling Rate</span>
            <h2>68.4%</h2>
            <small className="positive">+5.2%</small>
          </div>

          <div className="stat-card">
            <span>Fleet Efficiency</span>
            <h2>94.2%</h2>
            <small className="positive">+2.1%</small>
          </div>

          <div className="stat-card">
            <span>Carbon Saved</span>
            <h2>1,240 kg</h2>
            <small className="positive">+12.8%</small>
          </div>
        </div>

        {/* CHARTS */}
        <div className="charts-grid">

          {/* LINE CHART */}
          <div className="chart-card">
            <h3>Collection Trend</h3>
            <p>Waste collected vs recycled</p>

            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Collected',
                    data: [2400, 2200, 2800, 2600, 3200, 2900],
                    borderColor: '#1f7a4f',
                    backgroundColor: 'rgba(31,122,79,0.1)',
                    tension: 0.4
                  },
                  {
                    label: 'Recycled',
                    data: [1700, 1600, 2100, 2000, 2400, 2200],
                    borderColor: '#2fbf9b',
                    backgroundColor: 'rgba(47,191,155,0.1)',
                    tension: 0.4
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>

          {/* DOUGHNUT CHART */}
          <div className="chart-card">
            <h3>Waste Categories</h3>
            <p>Distribution by type</p>

            <Doughnut
              data={{
                labels: ['Organic', 'Plastic', 'Paper', 'Metal', 'Others'],
                datasets: [
                  {
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                      '#1f7a4f',
                      '#f4a300',
                      '#2fbf9b',
                      '#4f8f6a',
                      '#b5c9b7'
                    ]
                  }
                ]
              }}
              options={{
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
