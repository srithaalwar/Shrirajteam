// import React, { useState, useEffect } from "react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "./Dashboard.css";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";

// function AdminDashboard() {
//   const [receivables, setReceivables] = useState(0);
//   const [payables, setPayables] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Mock data
//   const dashboardData = {
//     totalRetailers: 247,
//     retailersChange: "+12%",
//     monthlySales: "₹ 12,34,567",
//     salesChange: "+8.7%",
//     activeStaff: 18,
//     staffChange: "+2",
//     avgScore: 7.8,
//     scoreChange: "+0.3",
//   };

//   // Fetch receivables data
//   useEffect(() => {
//     const fetchReceivables = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${baseurl}/api/sales-receipt-totals`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch receivables data');
//         }
        
//         const result = await response.json();
        
//         if (result.success) {
//           setReceivables(result.data.netAmount || 0);
//         } else {
//           throw new Error(result.error || 'Failed to fetch receivables');
//         }
//       } catch (err) {
//         console.error('Error fetching receivables:', err);
//         setError(err.message);
//         // Set default value in case of error
//         setReceivables(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReceivables();
//   }, []);

//   useEffect(() => {
//     const fetchPayables = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${baseurl}/api/total-payables`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch payables data');
//         }
        
//         const result = await response.json();
        
//         if (result.success) {
//           setPayables(result.data.netAmount || 0);
//         } else {
//           throw new Error(result.error || 'Failed to fetch payables');
//         }
//       } catch (err) {
//         console.error('Error fetching payables:', err);
//         setError(err.message);
//         // Set default value in case of error
//         setPayables(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayables();
//   }, []);

//   // Format currency in Indian format
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//         <>
//               <WebsiteNavbar />
        
//     <div className="admin-dashboard-wrapper">
//       <div className="admin-dashboard-content-area">
//         <div className="admin-dashboard-main-content">
//           {/* Stats Grid */}
//           <div className="admin-dashboard-stats-grid">
//             <div className="admin-dashboard-stat-card">
//               <h3 className="admin-dashboard-stat-label">Total Retailers</h3>
//               <div className="admin-dashboard-stat-value">
//                 {dashboardData.totalRetailers}
//               </div>
//               <div className="admin-dashboard-stat-change positive">
//                 {dashboardData.retailersChange} from last month
//               </div>
//             </div>

//             <div className="admin-dashboard-stat-card">
//               <h3 className="admin-dashboard-stat-label">Monthly Sales</h3>
//               <div className="admin-dashboard-stat-value">
//                 {dashboardData.monthlySales}
//               </div>
//               <div className="admin-dashboard-stat-change positive">
//                 {dashboardData.salesChange} from last month
//               </div>
//             </div>

//             {/* Receivables Card */}
//             <div className="admin-dashboard-stat-card">
//               <h3 className="admin-dashboard-stat-label">Total Receivables</h3>
//               <div className="admin-dashboard-stat-value">
//                 {loading ? (
//                   <div className="loading-spinner">Loading...</div>
//                 ) : error ? (
//                   <div className="error-text">Error</div>
//                 ) : (
//                   formatCurrency(receivables)
//                 )}
//               </div>
//               <div className="admin-dashboard-stat-change">
//                 {!loading && !error && "Outstanding amount"}
//               </div>
//               {error && (
//                 <div className="admin-dashboard-stat-error">
//                   {error}
//                 </div>
//               )}
//             </div>

//             {/* Payables Card */}
//             <div className="admin-dashboard-stat-card">
//               <h3 className="admin-dashboard-stat-label">Total Payables</h3>
//               <div className="admin-dashboard-stat-value">
//                 {loading ? (
//                   <div className="loading-spinner">Loading...</div>
//                 ) : error ? (
//                   <div className="error-text">Error</div>
//                 ) : (
//                   formatCurrency(payables)
//                 )}
//               </div>
//               <div className="admin-dashboard-stat-change">
//                 {!loading && !error && "Outstanding amount"}
//               </div>
//               {error && (
//                 <div className="admin-dashboard-stat-error">
//                   {error}
//                 </div>
//               )}
//             </div>

//             <div className="admin-dashboard-stat-card">
//               <h3 className="admin-dashboard-stat-label">Active Staff</h3>
//               <div className="admin-dashboard-stat-value">
//                 {dashboardData.activeStaff}
//               </div>
//               <div className="admin-dashboard-stat-change positive">
//                 {dashboardData.staffChange} from last month
//               </div>
//             </div>

//             <div className="admin-dashboard-stat-card">
//               <h3 className="admin-dashboard-stat-label">
//                 Avg. Retailer Score
//               </h3>
//               <div className="admin-dashboard-stat-value">
//                 {dashboardData.avgScore}/10
//               </div>
//               <div className="admin-dashboard-stat-change positive">
//                 {dashboardData.scoreChange} from last month
//               </div>
//             </div>
//           </div>

//           {/* Charts Section */}
//           <div className="admin-dashboard-charts-section">
//             {/* <DashboardCharts /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default AdminDashboard;



// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../BaseURL/BaseURL";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import "./Dashboard.css";

// // Font Awesome Icons
// import {
//   faCheckCircle,
//   faCalendarCheck,
//   faBuilding,
//   faHourglassHalf,
//   faUserCheck,
//   faTimesCircle,
//   faUniversity,
//   faMoneyCheckAlt,
//   faBusinessTime,
//   faUsers,
//   faHome,
//   faUserSlash,
//   faHomeAlt,
//   faCheck,
//   faBan
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Card background colors - more professional
// const cardColors = [
//   "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//   "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//   "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//   "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//   "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
//   "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
//   "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
//   "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
//   "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
//   "linear-gradient(135deg, #a3bded 0%, #6991c7 100%)",
//   "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
// ];

// // Text colors - white for better contrast on gradient backgrounds
// const textColors = Array(12).fill("#ffffff");

// const fontWeights = [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600];
// const fontSizes = ["1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem", "1rem"];

// // Icon mapping to Font Awesome
// const iconMap = {
//   "Total Properties": faBusinessTime,
//   "Active Users": faUsers,
//   "Inactive Users": faUserSlash,
//   "New Properties": faHomeAlt,
//   "Sold Properties": faCheckCircle,
//   "Booked Properties": faCalendarCheck,
//   "Available Properties": faBuilding,
//   "Pending Properties": faHourglassHalf,
//   "Approved Properties": faCheck,
//   "Rejected Properties": faBan,
//   "Company Payout": faUniversity,
//   "Agent Payout": faMoneyCheckAlt,
// };

// const AdminDashboard = () => {
//   const [counts, setCounts] = useState(null);
//   const [chartData, setChartData] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const chartRef = useRef(null);

//   // Fetch counts
//   useEffect(() => {
//     setLoading(true);
//     axios.get(`${baseurl}/counts/`)
//       .then(res => setCounts(res.data))
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   // Fetch chart data
//   useEffect(() => {
//     setLoading(true);
//     axios.get(`${baseurl}/property-stats/`)
//       .then(res => {
//         const data = res.data;
//         const labels = Object.keys(data);
//         const available = labels.map(type => data[type].available);
//         const sold = labels.map(type => data[type].sold);
//         const pending = labels.map(type => data[type].pending);
//         const approved = labels.map(type => data[type].approved);

//         // Gradient color pairs (bottom -> top)
//         const gradientPairs = {
//           Available: ["#4caf50", "#81c7846d"], 
//           Sold: ["#e53935", "#ff6f6f6d"],    
//           Pending: ["#ffeb3b", "#fff1766d"],   
//           Approved: ["#ba68c8f9", "#9b27b04f"], 
//         };

//         const createGradients = (dataset, colors) => {
//           const ctx = chartRef.current?.ctx;
//           if (!ctx) return colors[1];
//           const gradient = ctx.createLinearGradient(0, 400, 0, 0); 
//           gradient.addColorStop(0, colors[0]);
//           gradient.addColorStop(1, colors[1]);
//           return Array(dataset.length).fill(gradient);
//         };

//         setChartData({
//           labels,
//           datasets: [
//             { label: "Available", data: available, backgroundColor: createGradients(available, gradientPairs.Available) },
//             { label: "Sold", data: sold, backgroundColor: createGradients(sold, gradientPairs.Sold) },
//             { label: "Pending", data: pending, backgroundColor: createGradients(pending, gradientPairs.Pending) },
//             { label: "Approved", data: approved, backgroundColor: createGradients(approved, gradientPairs.Approved) },
//           ]
//         });
//       })
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   const metrics = counts ? [
//     { label: "Total Properties", value: counts.total_properties, icon: iconMap["Total Properties"], path: "/a-asset" },
//     { label: "Active Users", value: counts.total_active_users, icon: iconMap["Active Users"], path: "/a-activeagents" },
//     { label: "Inactive Users", value: counts.total_inactive_users, icon: iconMap["Inactive Users"], path: "/a-Inactiveagents" },
//     { label: "New Properties", value: counts.total_latest_properties, icon: iconMap["New Properties"], path: "/a-Newproperties" },
//     { label: "Sold Properties", value: counts.total_sold_properties, icon: iconMap["Sold Properties"], path: "/a-soldassets" },
//     { label: "Booked Properties", value: counts.total_booked_properties, icon: iconMap["Booked Properties"], path: "/a-bookedassets" },
//     { label: "Available Properties", value: counts.total_available_properties, icon: iconMap["Available Properties"], path: "/a-availableassets" },
//     { label: "Pending Properties", value: counts.total_pending_properties, icon: iconMap["Pending Properties"], path: "/a-pendingassets" },
//     { label: "Approved Properties", value: counts.total_approved_properties, icon: iconMap["Approved Properties"], path: "/a-approvedassets" },
//     { label: "Rejected Properties", value: counts.total_rejected_properties, icon: iconMap["Rejected Properties"], path: "/a-rejectedassets" },
//     { label: "Company Payout", value: `₹${counts.total_company_commission_paid.toLocaleString("en-IN")}`, icon: iconMap["Company Payout"], path: "/a-transactionmoniter" },
//     { label: "Agent Payout", value: `₹${counts.total_agent_commission_paid.toLocaleString("en-IN")}`, icon: iconMap["Agent Payout"], path: "/a-commission" },
//   ] : [];

//   const options = { 
//     responsive: true, 
//     plugins: { 
//       legend: { 
//         position: "bottom" 
//       },
//       title: {
//         display: true,
//         text: 'Properties Performance',
//         font: {
//           size: 16,
//           weight: 'bold'
//         }
//       }
//     }, 
//     scales: { 
//       y: { 
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0,0,0,0.1)'
//         },
//         ticks: {
//           font: {
//             size: 12
//           }
//         }
//       },
//       x: {
//         grid: {
//           color: 'rgba(0,0,0,0.1)'
//         },
//         ticks: {
//           font: {
//             size: 12
//           }
//         }
//       }
//     }, 
//     maintainAspectRatio: false 
//   };

//   const getFilteredChart = () => {
//     if (!chartData) return null;
//     if (filter === "all") return chartData;
//     return { 
//       labels: chartData.labels, 
//       datasets: chartData.datasets.filter(d => d.label === filter) 
//     };
//   };

//   return (
//     <>
//       <WebsiteNavbar />
//       <div className="dashboard-container">
//         <div className="dashboard-content">
//           {loading ? (
//             <div className="loading-container">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Section 1: Statistics Cards */}
//               <div className="dashboard-section statistics-section">
//                 <h2 className="section-title">Dashboard Overview</h2>
//                 <div className="statistics-grid">
//                   {metrics.map((metric, index) => (
//                     <div 
//                       key={index}
//                       className="stat-card"
//                       style={{ 
//                         background: cardColors[index % cardColors.length],
//                       }}
//                       onClick={() => navigate(metric.path)}
//                     >
//                       <div className="stat-icon">
//                         <FontAwesomeIcon icon={metric.icon} />
//                       </div>
//                       <div className="stat-info">
//                         <h3 className="stat-value">{metric.value}</h3>
// <p className="stat-label" style={{ color: 'black' }}>{metric.label}</p>                      </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Section 2: Chart/Graph */}
//               <div className="dashboard-section chart-section">
//                 <div className="chart-header">
//                   <h2 className="section-title">Properties Analysis</h2>
//                   <div className="chart-controls">
//                     <div className="filter-control">
//                       <label className="filter-label">Filter by Status:</label>
//                       <select 
//                         className="form-select form-select-dashboard"
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                       >
//                         <option value="all">All Status</option>
//                         <option value="Available">Available</option>
//                         <option value="Sold">Sold</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Approved">Approved</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="chart-container">
//                   {chartData && (
//                     <Bar 
//                       ref={chartRef} 
//                       data={getFilteredChart()} 
//                       options={options} 
//                     />
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;




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
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
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
  faBan,
  faCreditCard,
  faReceipt,
  faUserTag,
  faUserTie,
  faUser,
  faDollarSign
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
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
];

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
  "Verified Properties": faCheckCircle,
  "Total Transactions": faCreditCard,
  "Successful Transactions": faCheckCircle,
  "Failed Transactions": faTimesCircle,
  "Refunded Transactions": faReceipt,
  "Total Revenue": faDollarSign,
  "Total Users": faUsers,
  "Admin Users": faUserTie,
  "Agent Users": faUserTag,
  "Client Users": faUser,
  "Total Subscriptions": faCalendarCheck,
  "Active Subscriptions": faCheckCircle,
  "Expired Subscriptions": faTimesCircle,
  "Subscription Revenue": faDollarSign,
};

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  // Fetch admin summary
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseurl}/admin-summary/`)
      .then(res => {
        console.log("API Response:", res.data); // Debug log
        setSummary(res.data);
        prepareChartData(res.data);
      })
      .catch(err => {
        console.error("Error fetching admin summary:", err);
        // Fallback to empty data if API fails
        const fallbackData = {
          property_summary: {
            total_properties: 0,
            pending: 0,
            verified: 0,
            available: 0,
            booked: 0,
            sold: 0,
            rejected: 0,
            role_wise: []
          },
          transaction_summary: {
            total_transactions: 0,
            success: 0,
            failed: 0,
            refunded: 0,
            total_revenue: 0,
            role_wise: []
          },
          subscription_summary: {
            total_subscriptions: 0,
            active: 0,
            expired: 0,
            subscription_revenue: 0,
            role_wise: []
          },
          user_summary: {
            total_users: 0,
            active: 0,
            inactive: 0,
            role_wise: []
          }
        };
        setSummary(fallbackData);
        prepareChartData(fallbackData);
      })
      .finally(() => {
        setLoading(false);
        setChartLoading(false);
      });
  }, []);

  // Prepare chart data from summary
  const prepareChartData = (summaryData) => {
    if (!summaryData) {
      console.log("No summary data available");
      return;
    }
    
    const { property_summary } = summaryData;
    console.log("Property Summary for Chart:", property_summary); // Debug log
    
    // For the chart, we'll use property status data
    const labels = ["Property Status"];
    
    // Extract data for each status
    const available = [property_summary.available || 0];
    const sold = [property_summary.sold || 0];
    const pending = [property_summary.pending || 0];
    const verified = [property_summary.verified || 0];
    const booked = [property_summary.booked || 0];

    console.log("Chart Data:", {
      labels,
      available,
      sold,
      pending,
      verified,
      booked
    }); // Debug log

    // Solid colors instead of gradients for simplicity
    const colors = {
      Available: "#4caf50", 
      Sold: "#e53935",    
      Pending: "#ffeb3b",   
      Verified: "#2196f3",
      Booked: "#ff9800",
    };

    // Create datasets array
    const datasets = [
      { 
        label: "Available", 
        data: available, 
        backgroundColor: colors.Available,
        borderColor: colors.Available,
        borderWidth: 1
      },
      { 
        label: "Sold", 
        data: sold, 
        backgroundColor: colors.Sold,
        borderColor: colors.Sold,
        borderWidth: 1
      },
      { 
        label: "Pending", 
        data: pending, 
        backgroundColor: colors.Pending,
        borderColor: colors.Pending,
        borderWidth: 1
      },
      { 
        label: "Verified", 
        data: verified, 
        backgroundColor: colors.Verified,
        borderColor: colors.Verified,
        borderWidth: 1
      },
      { 
        label: "Booked", 
        data: booked, 
        backgroundColor: colors.Booked,
        borderColor: colors.Booked,
        borderWidth: 1
      },
    ];

    const chartDataConfig = {
      labels,
      datasets
    };

    console.log("Final Chart Config:", chartDataConfig); // Debug log
    setChartData(chartDataConfig);
  };

  // Prepare metrics from summary data
  const prepareMetrics = () => {
    if (!summary) {
      console.log("No summary available for metrics");
      return [];
    }
    
    const { 
      property_summary, 
      transaction_summary, 
      subscription_summary, 
      user_summary 
    } = summary;

    console.log("Preparing metrics from:", {
      property_summary,
      user_summary
    }); // Debug log

    // Get role-wise counts
    const getRoleCount = (roleName) => {
      const roleData = user_summary.role_wise?.find(r => r.role === roleName);
      return roleData ? roleData.count : 0;
    };

    return [
      // Property Metrics
      { 
        label: "Total Properties", 
        value: property_summary.total_properties || 0, 
        icon: iconMap["Total Properties"], 
        path: "/a-asset" 
      },
      { 
        label: "Available Properties", 
        value: property_summary.available || 0, 
        icon: iconMap["Available Properties"], 
        path: "/a-availableassets" 
      },
      { 
        label: "Sold Properties", 
        value: property_summary.sold || 0, 
        icon: iconMap["Sold Properties"], 
        path: "/a-soldassets" 
      },
      { 
        label: "Booked Properties", 
        value: property_summary.booked || 0, 
        icon: iconMap["Booked Properties"], 
        path: "/a-bookedassets" 
      },
      { 
        label: "Pending Properties", 
        value: property_summary.pending || 0, 
        icon: iconMap["Pending Properties"], 
        path: "/a-pendingassets" 
      },
      { 
        label: "Verified Properties", 
        value: property_summary.verified || 0, 
        icon: iconMap["Verified Properties"], 
        path: "/a-approvedassets" 
      },
      { 
        label: "Rejected Properties", 
        value: property_summary.rejected || 0, 
        icon: iconMap["Rejected Properties"], 
        path: "/a-rejectedassets" 
      },
      
      // User Metrics
      { 
        label: "Total Users", 
        value: user_summary.total_users || 0, 
        icon: iconMap["Total Users"], 
        path: "/a-activeagents" 
      },
      { 
        label: "Active Users", 
        value: user_summary.active || 0, 
        icon: iconMap["Active Users"], 
        path: "/a-activeagents" 
      },
      { 
        label: "Inactive Users", 
        value: user_summary.inactive || 0, 
        icon: iconMap["Inactive Users"], 
        path: "/a-Inactiveagents" 
      },
      { 
        label: "Admin Users", 
        value: getRoleCount("Admin"), 
        icon: iconMap["Admin Users"], 
        path: "/a-activeagents" 
      },
      { 
        label: "Agent Users", 
        value: getRoleCount("Agent"), 
        icon: iconMap["Agent Users"], 
        path: "/a-activeagents" 
      },
      { 
        label: "Client Users", 
        value: getRoleCount("Client"), 
        icon: iconMap["Client Users"], 
        path: "/a-activeagents" 
      },
    ];
  };

  const options = { 
    responsive: true, 
    plugins: { 
      legend: { 
        position: "bottom",
        labels: {
          font: {
            size: 12
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Properties Status Overview',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
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
        },
        title: {
          display: true,
          text: 'Number of Properties',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }, 
    maintainAspectRatio: false,
    barPercentage: 0.8,
    categoryPercentage: 0.9
  };

  const getFilteredChart = () => {
    if (!chartData) {
      console.log("No chart data available for filtering");
      return null;
    }
    
    if (filter === "all") {
      console.log("Showing all chart data");
      return chartData;
    }
    
    console.log("Filtering chart for:", filter);
    const filteredData = { 
      labels: chartData.labels, 
      datasets: chartData.datasets.filter(d => d.label === filter) 
    };
    console.log("Filtered chart data:", filteredData);
    return filteredData;
  };

  const metrics = prepareMetrics();

  return (
    <>
      <WebsiteNavbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          {loading ? (
            <div className="loading-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading dashboard data...</p>
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
                      onClick={() => metric.path && navigate(metric.path)}
                    >
                      <div className="stat-icon">
                        <FontAwesomeIcon icon={metric.icon} />
                      </div>
                      <div className="stat-info">
                        <h3 className="stat-value">{metric.value}</h3>
                        <p className="stat-label" style={{ color: 'black' }}>{metric.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Chart/Graph */}
              <div className="dashboard-section chart-section">
                <div className="chart-header">
                  <h2 className="section-title">Properties Status Analysis</h2>
                  <div className="chart-controls">
                    <div className="filter-control">
                      <label className="filter-label">Filter by Status:</label>
                      <select 
                        className="form-select form-select-dashboard"
                        value={filter}
                        onChange={(e) => {
                          console.log("Filter changed to:", e.target.value);
                          setFilter(e.target.value);
                        }}
                      >
                        <option value="all">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Booked">Booked</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="chart-container" style={{ position: 'relative', height: '400px' }}>
                  {chartLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading chart...</span>
                      </div>
                      <p className="mt-2">Loading chart data...</p>
                    </div>
                  ) : chartData ? (
                    <>
                      <Bar 
                        key={filter} // Add key to force re-render on filter change
                        ref={chartRef} 
                        data={getFilteredChart()} 
                        options={options} 
                      />
                      {getFilteredChart()?.datasets?.length === 0 && (
                        <div className="text-center py-5">
                          <p>No data available for the selected filter</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-5">
                      <p>No chart data available</p>
                    </div>
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