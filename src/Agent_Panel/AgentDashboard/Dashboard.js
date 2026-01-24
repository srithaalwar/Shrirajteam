



import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import "./Dashboard.css";

// Font Awesome Icons
import {
  faCheckCircle,
  faCalendarCheck,
  faBuilding,
  faHourglassHalf,
  faUserCheck,
  faTimesCircle,
  faUniversity,
  faMoneyCheckAlt,
  faBusinessTime,
  faUsers,
  faHome,
  faUserSlash,
  faHomeAlt,
  faCheck,
  faBan
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Card background colors - more professional
const cardColors = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
  "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #a3bded 0%, #6991c7 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
];

// Text colors - white for better contrast on gradient backgrounds
const textColors = Array(12).fill("#ffffff");

const fontWeights = [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600];
const fontSizes = ["1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem"];

// Icon mapping to Font Awesome
const iconMap = {
  "Total Properties": faBusinessTime,
  "Active Users": faUsers,
  "Inactive Users": faUserSlash,
  "New Properties": faHomeAlt,
  "Sold Properties": faCheckCircle,
  "Booked Properties": faCalendarCheck,
  "Available Properties": faBuilding,
  "Pending Properties": faHourglassHalf,
  "Approved Properties": faCheck,
  "Rejected Properties": faBan,
  "Company Payout": faUniversity,
  "Agent Payout": faMoneyCheckAlt,
};

const AdminDashboard = () => {
  const [counts, setCounts] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  // Fetch counts
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseurl}/counts/`)
      .then(res => setCounts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch chart data
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseurl}/property-stats/`)
      .then(res => {
        const data = res.data;
        const labels = Object.keys(data);
        const available = labels.map(type => data[type].available);
        const sold = labels.map(type => data[type].sold);
        const pending = labels.map(type => data[type].pending);
        const approved = labels.map(type => data[type].approved);

        // Gradient color pairs (bottom -> top)
        const gradientPairs = {
          Available: ["#4caf50", "#81c7846d"], 
          Sold: ["#e53935", "#ff6f6f6d"],    
          Pending: ["#ffeb3b", "#fff1766d"],   
          Approved: ["#ba68c8f9", "#9b27b04f"], 
        };

        const createGradients = (dataset, colors) => {
          const ctx = chartRef.current?.ctx;
          if (!ctx) return colors[1];
          const gradient = ctx.createLinearGradient(0, 400, 0, 0); 
          gradient.addColorStop(0, colors[0]);
          gradient.addColorStop(1, colors[1]);
          return Array(dataset.length).fill(gradient);
        };

        setChartData({
          labels,
          datasets: [
            { label: "Available", data: available, backgroundColor: createGradients(available, gradientPairs.Available) },
            { label: "Sold", data: sold, backgroundColor: createGradients(sold, gradientPairs.Sold) },
            { label: "Pending", data: pending, backgroundColor: createGradients(pending, gradientPairs.Pending) },
            { label: "Approved", data: approved, backgroundColor: createGradients(approved, gradientPairs.Approved) },
          ]
        });
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const metrics = counts ? [
    { label: "Total Properties", value: counts.total_properties, icon: iconMap["Total Properties"], path: "/a-asset" },
    { label: "Active Users", value: counts.total_active_users, icon: iconMap["Active Users"], path: "/a-activeagents" },
    { label: "Inactive Users", value: counts.total_inactive_users, icon: iconMap["Inactive Users"], path: "/a-Inactiveagents" },
    { label: "New Properties", value: counts.total_latest_properties, icon: iconMap["New Properties"], path: "/a-Newproperties" },
    { label: "Sold Properties", value: counts.total_sold_properties, icon: iconMap["Sold Properties"], path: "/a-soldassets" },
    { label: "Booked Properties", value: counts.total_booked_properties, icon: iconMap["Booked Properties"], path: "/a-bookedassets" },
    { label: "Available Properties", value: counts.total_available_properties, icon: iconMap["Available Properties"], path: "/a-availableassets" },
    { label: "Pending Properties", value: counts.total_pending_properties, icon: iconMap["Pending Properties"], path: "/a-pendingassets" },
    { label: "Approved Properties", value: counts.total_approved_properties, icon: iconMap["Approved Properties"], path: "/a-approvedassets" },
    { label: "Rejected Properties", value: counts.total_rejected_properties, icon: iconMap["Rejected Properties"], path: "/a-rejectedassets" },
    { label: "Company Payout", value: `₹${counts.total_company_commission_paid.toLocaleString("en-IN")}`, icon: iconMap["Company Payout"], path: "/a-transactionmoniter" },
    { label: "Agent Payout", value: `₹${counts.total_agent_commission_paid.toLocaleString("en-IN")}`, icon: iconMap["Agent Payout"], path: "/a-commission" },
  ] : [];

  const options = { 
    responsive: true, 
    plugins: { 
      legend: { 
        position: "bottom" 
      },
      title: {
        display: true,
        text: 'Properties Performance',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }, 
    scales: { 
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.1)'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }, 
    maintainAspectRatio: false 
  };

  const getFilteredChart = () => {
    if (!chartData) return null;
    if (filter === "all") return chartData;
    return { 
      labels: chartData.labels, 
      datasets: chartData.datasets.filter(d => d.label === filter) 
    };
  };

  return (
    <>
      <AgentNavbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          {loading ? (
            <div className="loading-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Section 1: Statistics Cards */}
              <div className="dashboard-section statistics-section">
                <h2 className="section-title">Dashboard Overview</h2>
                <div className="statistics-grid">
                  {metrics.map((metric, index) => (
                    <div 
                      key={index}
                      className="stat-card"
                      style={{ 
                        background: cardColors[index % cardColors.length],
                      }}
                      onClick={() => navigate(metric.path)}
                    >
                      <div className="stat-icon">
                        <FontAwesomeIcon icon={metric.icon} />
                      </div>
                      <div className="stat-info">
                        <h3 className="stat-value">{metric.value}</h3>
<p className="stat-label" style={{ color: 'black' }}>{metric.label}</p>                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Chart/Graph */}
              <div className="dashboard-section chart-section">
                <div className="chart-header">
                  <h2 className="section-title">Properties Analysis</h2>
                  <div className="chart-controls">
                    <div className="filter-control">
                      <label className="filter-label">Filter by Status:</label>
                      <select 
                        className="form-select form-select-dashboard"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="chart-container">
                  {chartData && (
                    <Bar 
                      ref={chartRef} 
                      data={getFilteredChart()} 
                      options={options} 
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;