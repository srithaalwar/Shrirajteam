import React, { useState, useEffect } from "react";
import { baseurl } from "../../BaseURL/BaseURL";
import "./Dashboard.css";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";

function AdminDashboard() {
  const [receivables, setReceivables] = useState(0);
  const [payables, setPayables] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data
  const dashboardData = {
    totalRetailers: 247,
    retailersChange: "+12%",
    monthlySales: "₹ 12,34,567",
    salesChange: "+8.7%",
    activeStaff: 18,
    staffChange: "+2",
    avgScore: 7.8,
    scoreChange: "+0.3",
  };

  // Fetch receivables data
  useEffect(() => {
    const fetchReceivables = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseurl}/api/sales-receipt-totals`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch receivables data');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setReceivables(result.data.netAmount || 0);
        } else {
          throw new Error(result.error || 'Failed to fetch receivables');
        }
      } catch (err) {
        console.error('Error fetching receivables:', err);
        setError(err.message);
        // Set default value in case of error
        setReceivables(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivables();
  }, []);

  useEffect(() => {
    const fetchPayables = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseurl}/api/total-payables`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch payables data');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setPayables(result.data.netAmount || 0);
        } else {
          throw new Error(result.error || 'Failed to fetch payables');
        }
      } catch (err) {
        console.error('Error fetching payables:', err);
        setError(err.message);
        // Set default value in case of error
        setPayables(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPayables();
  }, []);

  // Format currency in Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
        <>
              <WebsiteNavbar />
        
    <div className="admin-dashboard-wrapper">
      <div className="admin-dashboard-content-area">
        <div className="admin-dashboard-main-content">
          {/* Stats Grid */}
          <div className="admin-dashboard-stats-grid">
            <div className="admin-dashboard-stat-card">
              <h3 className="admin-dashboard-stat-label">Total Retailers</h3>
              <div className="admin-dashboard-stat-value">
                {dashboardData.totalRetailers}
              </div>
              <div className="admin-dashboard-stat-change positive">
                {dashboardData.retailersChange} from last month
              </div>
            </div>

            <div className="admin-dashboard-stat-card">
              <h3 className="admin-dashboard-stat-label">Monthly Sales</h3>
              <div className="admin-dashboard-stat-value">
                {dashboardData.monthlySales}
              </div>
              <div className="admin-dashboard-stat-change positive">
                {dashboardData.salesChange} from last month
              </div>
            </div>

            {/* Receivables Card */}
            <div className="admin-dashboard-stat-card">
              <h3 className="admin-dashboard-stat-label">Total Receivables</h3>
              <div className="admin-dashboard-stat-value">
                {loading ? (
                  <div className="loading-spinner">Loading...</div>
                ) : error ? (
                  <div className="error-text">Error</div>
                ) : (
                  formatCurrency(receivables)
                )}
              </div>
              <div className="admin-dashboard-stat-change">
                {!loading && !error && "Outstanding amount"}
              </div>
              {error && (
                <div className="admin-dashboard-stat-error">
                  {error}
                </div>
              )}
            </div>

            {/* Payables Card */}
            <div className="admin-dashboard-stat-card">
              <h3 className="admin-dashboard-stat-label">Total Payables</h3>
              <div className="admin-dashboard-stat-value">
                {loading ? (
                  <div className="loading-spinner">Loading...</div>
                ) : error ? (
                  <div className="error-text">Error</div>
                ) : (
                  formatCurrency(payables)
                )}
              </div>
              <div className="admin-dashboard-stat-change">
                {!loading && !error && "Outstanding amount"}
              </div>
              {error && (
                <div className="admin-dashboard-stat-error">
                  {error}
                </div>
              )}
            </div>

            <div className="admin-dashboard-stat-card">
              <h3 className="admin-dashboard-stat-label">Active Staff</h3>
              <div className="admin-dashboard-stat-value">
                {dashboardData.activeStaff}
              </div>
              <div className="admin-dashboard-stat-change positive">
                {dashboardData.staffChange} from last month
              </div>
            </div>

            <div className="admin-dashboard-stat-card">
              <h3 className="admin-dashboard-stat-label">
                Avg. Retailer Score
              </h3>
              <div className="admin-dashboard-stat-value">
                {dashboardData.avgScore}/10
              </div>
              <div className="admin-dashboard-stat-change positive">
                {dashboardData.scoreChange} from last month
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="admin-dashboard-charts-section">
            {/* <DashboardCharts /> */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;