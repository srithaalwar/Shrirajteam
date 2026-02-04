



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
// import ClientNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
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
//       <ClientNavbar />
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
import AgentNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar"
import "./Dashboard.css";

// Font Awesome Icons
import {
  faCheckCircle,
  faCalendarCheck,
  faBuilding,
  faHourglassHalf,
  faTimesCircle,
  faUniversity,
  faMoneyCheckAlt,
  faBusinessTime,
  faHome,
  faCheck,
  faBan,
  faCreditCard,
  faReceipt,
  faUserTag,
  faDollarSign,
  faShoppingCart,
  faChartLine,
  faHomeUser,
  faHandHoldingUsd,
  faFileContract,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Card background colors - professional gradients
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

// Icon mapping for agent-specific metrics
const iconMap = {
  "Total Properties": faHome,
  "Available Properties": faHomeUser,
  "Sold Properties": faCheckCircle,
  "Booked Properties": faCalendarCheck,
  "Pending Properties": faHourglassHalf,
  "Verified Properties": faCheck,
  "Rejected Properties": faBan,
  "Total Bookings": faShoppingCart,
  "Properties Purchased": faHandHoldingUsd,
  "Total Transactions": faCreditCard,
  "Successful Transactions": faCheckCircle,
  "Failed Transactions": faTimesCircle,
  "Refunded Transactions": faReceipt,
  "Total Revenue": faDollarSign,
  "Total Orders": faFileContract,
  "Paid Orders": faCheckCircle,
  "Pending Orders": faHourglassHalf,
  "Cancelled Orders": faTimesCircle,
  "Refunded Orders": faReceipt,
  "Total Subscriptions": faChartLine,
  "Active Subscriptions": faCheckCircle,
  "Expired Subscriptions": faTimesCircle,
  "Subscription Revenue": faDollarSign,
  "Transaction History": faHistory
};

const ClientDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const chartRef = useRef(null);

  // Get user info from localStorage
  useEffect(() => {
    const storedUserInfo = {
      userId: localStorage.getItem('userId') || 'UID-1430',
      user_id: localStorage.getItem('user_id') || '2',
      user_name: localStorage.getItem('user_name') || 'harish',
      email: localStorage.getItem('email') || 'kodamharish12@gmail.com',
      phone_number: localStorage.getItem('phone_number') || '9133121164',
      referral_id: localStorage.getItem('referral_id') || 'SRP000001'
    };
    setUserInfo(storedUserInfo);
  }, []);

  // Fetch agent summary
  useEffect(() => {
    if (!userInfo.user_id) return;

    setLoading(true);
    setChartLoading(true);
    
    const apiEndpoint = `${baseurl}/summary/?user_id=${userInfo.user_id}`;
    
    axios.get(apiEndpoint)
      .then(res => {
        console.log("Agent API Response:", res.data);
        
        if (res.data) {
          setSummary(res.data);
          prepareChartData(res.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      })
      .catch(err => {
        console.error("Error fetching agent summary:", err);
        // Fallback to mock data structure based on agent API response
        const fallbackData = {
          filters_applied: {
            user_id: userInfo.user_id,
            role: null,
            start_date: null,
            end_date: null
          },
          property_summary: {
            my_properties: {
              total_added: 0,
              available: 0,
              booked: 0,
              sold: 0,
              pending: 0,
              verified: 0,
              rejected: 0
            },
            bookings: {
              count: 0
            },
            buyied_or_purchased: {
              count: 0
            }
          },
          transaction_summary: {
            total_transactions: 0,
            success: 0,
            failed: 0,
            refunded: 0,
            total_revenue: 0
          },
          order_summary: {
            total_orders: 0,
            paid: 0,
            pending: 0,
            cancelled: 0,
            refunded: 0
          },
          subscription_summary: {
            total_subscriptions: 0,
            active: 0,
            expired: 0,
            subscription_revenue: 0
          }
        };
        setSummary(fallbackData);
        prepareChartData(fallbackData);
      })
      .finally(() => {
        setLoading(false);
        setChartLoading(false);
      });
  }, [userInfo.user_id]);

  // Prepare chart data from agent summary
  const prepareChartData = (summaryData) => {
    if (!summaryData || !summaryData.property_summary) {
      console.log("No property summary data available");
      return;
    }
    
    const { my_properties } = summaryData.property_summary;
    console.log("My Properties for Chart:", my_properties);
    
    const labels = ["My Properties"];
    
    // Extract data for each status
    const available = [my_properties.available || 0];
    const sold = [my_properties.sold || 0];
    const pending = [my_properties.pending || 0];
    const verified = [my_properties.verified || 0];
    const booked = [my_properties.booked || 0];
    const rejected = [my_properties.rejected || 0];

    console.log("Chart Data:", {
      labels,
      available,
      sold,
      pending,
      verified,
      booked,
      rejected
    });

    // Colors for agent dashboard
    const colors = {
      Available: "#4caf50", 
      Sold: "#e53935",    
      Pending: "#ffeb3b",   
      Verified: "#2196f3",
      Booked: "#ff9800",
      Rejected: "#9e9e9e"
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
      { 
        label: "Rejected", 
        data: rejected, 
        backgroundColor: colors.Rejected,
        borderColor: colors.Rejected,
        borderWidth: 1
      },
    ];

    const chartDataConfig = {
      labels,
      datasets
    };

    console.log("Final Chart Config:", chartDataConfig);
    setChartData(chartDataConfig);
  };

  // Prepare metrics from agent summary data
  const prepareMetrics = () => {
    if (!summary) {
      console.log("No summary available for metrics");
      return [];
    }
    
    const { 
      property_summary, 
      transaction_summary, 
      subscription_summary, 
      order_summary
    } = summary;

    console.log("Preparing metrics from:", {
      property_summary,
      transaction_summary,
      subscription_summary,
      order_summary
    });

    const metrics = [];
    
    // Property Metrics from my_properties
    if (property_summary.my_properties) {
      const myProps = property_summary.my_properties;
      metrics.push(
        { 
          label: "Total Properties", 
          value: myProps.total_added || 0, 
          icon: iconMap["Total Properties"], 
          path: "/agent-properties" 
        },
        { 
          label: "Available Properties", 
          value: myProps.available || 0, 
          icon: iconMap["Available Properties"], 
          path: "/agent-properties?status=available" 
        },
        { 
          label: "Sold Properties", 
          value: myProps.sold || 0, 
          icon: iconMap["Sold Properties"], 
          path: "/agent-properties?status=sold" 
        },
        { 
          label: "Booked Properties", 
          value: myProps.booked || 0, 
          icon: iconMap["Booked Properties"], 
          path: "/agent-properties?status=booked" 
        },
        { 
          label: "Pending Properties", 
          value: myProps.pending || 0, 
          icon: iconMap["Pending Properties"], 
          path: "/agent-properties?status=pending" 
        },
        { 
          label: "Verified Properties", 
          value: myProps.verified || 0, 
          icon: iconMap["Verified Properties"], 
          path: "/agent-properties?status=verified" 
        },
        { 
          label: "Rejected Properties", 
          value: myProps.rejected || 0, 
          icon: iconMap["Rejected Properties"], 
          path: "/agent-properties?status=rejected" 
        }
      );
    }

    // Bookings and Purchases
    if (property_summary.bookings) {
      metrics.push(
        { 
          label: "Total Bookings", 
          value: property_summary.bookings.count || 0, 
          icon: iconMap["Total Bookings"], 
          path: "/agent-bookings" 
        }
      );
    }

    if (property_summary.buyied_or_purchased) {
      metrics.push(
        { 
          label: "Properties Purchased", 
          value: property_summary.buyied_or_purchased.count || 0, 
          icon: iconMap["Properties Purchased"], 
          path: "/agent-purchases" 
        }
      );
    }

    // Transaction Metrics
    if (transaction_summary) {
      metrics.push(
        { 
          label: "Total Transactions", 
          value: transaction_summary.total_transactions || 0, 
          icon: iconMap["Total Transactions"], 
          path: "/agent-transactions" 
        },
        { 
          label: "Successful Transactions", 
          value: transaction_summary.success || 0, 
          icon: iconMap["Successful Transactions"], 
          path: "/agent-transactions?status=success" 
        },
        { 
          label: "Total Revenue", 
          value: `$${transaction_summary.total_revenue || 0}`, 
          icon: iconMap["Total Revenue"], 
          path: "/agent-transactions" 
        }
      );
    }

    // Order Metrics
    if (order_summary) {
      metrics.push(
        { 
          label: "Total Orders", 
          value: order_summary.total_orders || 0, 
          icon: iconMap["Total Orders"], 
          path: "/agent-orders" 
        },
        { 
          label: "Paid Orders", 
          value: order_summary.paid || 0, 
          icon: iconMap["Paid Orders"], 
          path: "/agent-orders?status=paid" 
        }
      );
    }

    // Subscription Metrics
    if (subscription_summary) {
      metrics.push(
        { 
          label: "Total Subscriptions", 
          value: subscription_summary.total_subscriptions || 0, 
          icon: iconMap["Total Subscriptions"], 
          path: "/agent-subscriptions" 
        },
        { 
          label: "Active Subscriptions", 
          value: subscription_summary.active || 0, 
          icon: iconMap["Active Subscriptions"], 
          path: "/agent-subscriptions?status=active" 
        }
      );
    }

    // Add a transaction history card
    metrics.push(
      { 
        label: "Transaction History", 
        value: "View All", 
        icon: iconMap["Transaction History"], 
        path: "/agent-transaction-history" 
      }
    );

    return metrics;
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
        text: 'My Properties Overview',
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
      <AgentNavbar />
      <div className="agent-dashboard-container">
        <div className="agent-dashboard-content">
          {/* Welcome Header */}
          {/* <div className="welcome-header">
            <h1 className="welcome-title">Welcome back, {userInfo.user_name || 'Agent'}!</h1>
            <p className="welcome-subtitle">
              Here's your performance overview. Referral ID: <strong>{userInfo.referral_id}</strong>
            </p>
          </div> */}

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
                <h2 className="section-title">Performance Overview</h2>
                <div className="statistics-grid">
                  {metrics.map((metric, index) => (
                    <div 
                      key={`${metric.label}-${index}`}
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
                  <h2 className="section-title">Properties Analysis</h2>
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
                        <option value="Rejected">Rejected</option>
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
                        key={filter}
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

              {/* Section 3: Quick Stats Summary */}
              {summary && (
                <div className="dashboard-section quick-stats-section">
                  <h2 className="section-title">Quick Stats Summary</h2>
                  <div className="quick-stats-grid">
                    <div className="quick-stat">
                      <h4>Properties Added</h4>
                      <p>{summary.property_summary?.my_properties?.total_added || 0}</p>
                    </div>
                    <div className="quick-stat">
                      <h4>Total Bookings</h4>
                      <p>{summary.property_summary?.bookings?.count || 0}</p>
                    </div>
                    <div className="quick-stat">
                      <h4>Properties Purchased</h4>
                      <p>{summary.property_summary?.buyied_or_purchased?.count || 0}</p>
                    </div>
                    <div className="quick-stat">
                      <h4>Total Revenue</h4>
                      <p>${summary.transaction_summary?.total_revenue || 0}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;