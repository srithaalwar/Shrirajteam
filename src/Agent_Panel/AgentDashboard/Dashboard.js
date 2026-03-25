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
  faFileContract,
  faHistory,
  faIndianRupeeSign,
  faShareAlt,
  faClock,
  faMoneyBillWave,
  faChartBar
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
];

const AgentDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: null,
    user_id: null,
    user_name: null,
    email: null,
    phone_number: null,
    referral_id: null
  });
  const navigate = useNavigate();
  const chartRef = useRef(null);

  // Get user info from localStorage only
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userIdAlt = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');
    const email = localStorage.getItem('email');
    const phoneNumber = localStorage.getItem('phone_number');
    const referralId = localStorage.getItem('referral_id');
    
    if (userId || userIdAlt) {
      setUserInfo({
        userId: userId || null,
        user_id: userIdAlt || userId || null,
        user_name: userName || null,
        email: email || null,
        phone_number: phoneNumber || null,
        referral_id: referralId || null
      });
    } else {
      console.error("No user ID found in localStorage");
      setLoading(false);
    }
  }, []);

  // Fetch agent summary
  useEffect(() => {
    if (!userInfo.user_id) {
      console.log("No user_id available, skipping API call");
      setLoading(false);
      setChartLoading(false);
      return;
    }

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
          },
          referral_summary: {
            total_referrals: 0,
            total_pending_referral_amount: 0,
            total_paid_referral_amount: 0,
            total_referral_amount_or_wallet_amount: 0
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
    
    const labels = ["My Properties"];
    
    const available = [my_properties.available || 0];
    const sold = [my_properties.sold || 0];
    const pending = [my_properties.pending || 0];
    const verified = [my_properties.verified || 0];
    const booked = [my_properties.booked || 0];
    const rejected = [my_properties.rejected || 0];

    const colors = {
      Available: "#4caf50", 
      Sold: "#e53935",    
      Pending: "#ff9800",   
      Verified: "#2196f3",
      Booked: "#ff9800",
      Rejected: "#9e9e9e"
    };

    const datasets = [
      { 
        label: "Available", 
        data: available, 
        backgroundColor: colors.Available,
        borderColor: colors.Available,
        borderWidth: 1,
        borderRadius: 8
      },
      { 
        label: "Sold", 
        data: sold, 
        backgroundColor: colors.Sold,
        borderColor: colors.Sold,
        borderWidth: 1,
        borderRadius: 8
      },
      { 
        label: "Pending", 
        data: pending, 
        backgroundColor: colors.Pending,
        borderColor: colors.Pending,
        borderWidth: 1,
        borderRadius: 8
      },
      { 
        label: "Verified", 
        data: verified, 
        backgroundColor: colors.Verified,
        borderColor: colors.Verified,
        borderWidth: 1,
        borderRadius: 8
      },
      { 
        label: "Booked", 
        data: booked, 
        backgroundColor: colors.Booked,
        borderColor: colors.Booked,
        borderWidth: 1,
        borderRadius: 8
      },
      { 
        label: "Rejected", 
        data: rejected, 
        backgroundColor: colors.Rejected,
        borderColor: colors.Rejected,
        borderWidth: 1,
        borderRadius: 8
      },
    ];

    const chartDataConfig = {
      labels,
      datasets
    };

    setChartData(chartDataConfig);
  };

  // Prepare metrics in the required order
  const prepareMetrics = () => {
    if (!summary) {
      return [];
    }
    
    const { 
      property_summary, 
      order_summary,
      referral_summary
    } = summary;

    const metrics = [];
    
    // 1. Commissions Card
    if (referral_summary) {
      metrics.push(
        { 
          label: "Commissions", 
          value: `₹${(referral_summary.total_referral_amount_or_wallet_amount || 0).toLocaleString()}`, 
          icon: faMoneyBillWave, 
          path: "/agent-commission-ledger" 
        }
      );
    }
    
    // 2. Properties Card
    if (property_summary && property_summary.my_properties) {
      metrics.push(
        { 
          label: "Properties", 
          value: property_summary.my_properties.total_added || 0, 
          icon: faHome, 
          path: "/agent-property-details" 
        }
      );
    }
    
    // 3. Products Card (using total orders as products count)
    if (order_summary) {
      metrics.push(
        { 
          label: "Products", 
          value: order_summary.total_orders || 0, 
          icon: faShoppingCart, 
          // path: "/agent-orders" 
        }
      );
    }
    
    // 4. Orders Card
    if (order_summary) {
      metrics.push(
        { 
          label: "Orders", 
          value: order_summary.total_orders || 0, 
          icon: faFileContract, 
          path: "/agent-orders" 
        }
      );
    }
    
    // 5. Referrals Card
    if (referral_summary) {
      metrics.push(
        { 
          label: "Referrals", 
          value: referral_summary.total_referrals || 0, 
          icon: faShareAlt, 
          path: "/agent-my-team" 
        }
      );
    }

    return metrics;
  };

  const options = { 
    responsive: true, 
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: "bottom",
        labels: {
          font: {
            size: 12,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
          boxWidth: 10
        }
      },
      title: {
        display: true,
        text: 'Property Status Distribution',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Poppins', sans-serif"
        },
        padding: {
          top: 10,
          bottom: 30
        },
        color: '#2c3e50'
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 2,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} properties`;
          }
        }
      }
    }, 
    scales: { 
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)',
          drawBorder: true,
          borderDash: [5, 5]
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          },
          stepSize: 1,
          callback: function(value) {
            if (Math.floor(value) === value) {
              return value;
            }
            return null;
          },
          autoSkip: true,
          maxTicksLimit: 8
        },
        title: {
          display: true,
          text: 'Number of Properties',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#2c3e50'
        },
        min: 0,
        max: (() => {
          if (!chartData) return 100;
          let maxVal = 0;
          chartData.datasets.forEach(dataset => {
            const datasetMax = Math.max(...dataset.data);
            if (datasetMax > maxVal) maxVal = datasetMax;
          });
          if (maxVal > 20) {
            return Math.ceil(maxVal / 10) * 10;
          }
          return maxVal + 2;
        })()
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 13,
            weight: '600'
          }
        },
        title: {
          display: true,
          text: 'Property Categories',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#2c3e50',
          padding: { top: 20 }
        }
      }
    }, 
    barPercentage: 0.7,
    categoryPercentage: 0.85,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 10
      }
    }
  };

  const getFilteredChart = () => {
    if (!chartData) {
      return null;
    }
    
    if (filter === "all") {
      return chartData;
    }
    
    const filteredData = { 
      labels: chartData.labels, 
      datasets: chartData.datasets.filter(d => d.label === filter) 
    };
    return filteredData;
  };

  const metrics = prepareMetrics();

  if (loading && !userInfo.user_id) {
    return (
      <>
        <AgentNavbar />
        <div className="agent-dashboard-container">
          <div className="agent-dashboard-content">
            <div className="loading-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading user information...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!userInfo.user_id && !loading) {
    return (
      <>
        <AgentNavbar />
        <div className="agent-dashboard-container">
          <div className="agent-dashboard-content">
            <div className="alert alert-danger">
              <h4>Authentication Error</h4>
              <p>Unable to find user information. Please login again.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/login')}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      <div className="agent-dashboard-container">
        <div className="agent-dashboard-content">
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
                        <p className="stat-label" style={{ color: 'white' }}>{metric.label}</p>
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
                <div className="chart-container" style={{ position: 'relative', height: '450px' }}>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentDashboard;