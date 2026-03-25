



import React from 'react';
import './CommissionLedger.css';
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
 import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar"

const CommissionLedger = () => {
  const navigate = useNavigate();

  // Static data matching the image
  const totals = {
    totalEarned: 43850,
    referrals: 3970,
    productSales: 5130,
    propertySales: 34750,
    growth: {
      totalEarned: 18.2,
      referrals: 7.3,
      productSales: 24.8,
      propertySales: 12.1
    }
  };

  // Monthly data for the chart
  const monthlyData = {
    months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    referral: [2800, 3100, 3400, 3600, 3700, 3970],
    product: [3200, 3800, 4200, 4600, 4800, 5130],
    property: [24500, 26800, 29500, 31200, 32800, 34750]
  };

  // Calculate max value for chart scaling
  const maxValue = Math.max(
    ...monthlyData.referral,
    ...monthlyData.product,
    ...monthlyData.property
  );
  const chartMax = Math.ceil(maxValue / 5000) * 5000;

  // Format currency in Rupees
  const formatRupee = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Handle back button click - navigate to dashboard
  const handleBack = () => {
    navigate('/agent-dashboard');
  };

  return (
        <>
        <AgentNavbar/>
    <div className="cl-container">
      <div className="cl-ledger-card">
        {/* Back Button - Top Right */}
        <button className="cl-back-button" onClick={handleBack}>
          ← Back
        </button>

        {/* Header */}
        <div className="cl-header">
          <div className="cl-header-left">
            <h1 className="cl-title">Commissions</h1>
            {/* <p className="cl-subtitle">March 2026 overview</p>
            <p className="cl-last-updated">Last updated: Mar 23, 2026</p> */}
          </div>
          {/* <div className="cl-action-buttons">
            <button className="cl-btn cl-btn-outline">Share</button>
            <button className="cl-btn cl-btn-primary">Upgrade</button>
            <button className="cl-btn cl-btn-outline">Publish</button>
          </div> */}
        </div>

        {/* Stats Cards */}
        <div className="cl-stats-grid">
          <div className="cl-stat-card">
            <div className="cl-stat-label">TOTAL EARNED</div>
            <div className="cl-stat-value">{formatRupee(totals.totalEarned)}</div>
            {/* <div className="cl-stat-change cl-positive">
              +{totals.growth.totalEarned}% vs last month
            </div> */}
          </div>
          <div className="cl-stat-card">
            <div className="cl-stat-label">REFERRALS</div>
            <div className="cl-stat-value">{formatRupee(totals.referrals)}</div>
            {/* <div className="cl-stat-change cl-positive">
              +{totals.growth.referrals}% vs last month
            </div> */}
          </div>
          <div className="cl-stat-card">
            <div className="cl-stat-label">PRODUCT SALES</div>
            <div className="cl-stat-value">{formatRupee(totals.productSales)}</div>
            {/* <div className="cl-stat-change cl-positive">
              +{totals.growth.productSales}% vs last month
            </div> */}
          </div>
          <div className="cl-stat-card">
            <div className="cl-stat-label">PROPERTY SALES</div>
            <div className="cl-stat-value">{formatRupee(totals.propertySales)}</div>
            {/* <div className="cl-stat-change cl-positive">
              +{totals.growth.propertySales}% vs last month
            </div> */}
          </div>
        </div>

        {/* Chart Section */}
        <div className="cl-chart-section">
          <div className="cl-chart-header">
            <div>
              <h5 className="cl-chart-title">Earnings Over Time</h5>
              <p className="cl-chart-subtitle">Monthly breakdown by source</p>
            </div>
            <div className="cl-legend">
              <span className="cl-legend-item">
                <span className="cl-legend-color cl-legend-referral"></span>
                Referral
              </span>
              <span className="cl-legend-item">
                <span className="cl-legend-color cl-legend-product"></span>
                Product
              </span>
              <span className="cl-legend-item">
                <span className="cl-legend-color cl-legend-property"></span>
                Property
              </span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="cl-chart-wrapper">
            <div className="cl-y-axis">
              {[chartMax, chartMax * 0.75, chartMax * 0.5, chartMax * 0.25, 0].map((value, idx) => (
                <div key={idx} className="cl-y-axis-label">
                  ₹{(value / 1000).toFixed(0)}k
                </div>
              ))}
            </div>
            <div className="cl-bars-container">
              {monthlyData.months.map((month, idx) => {
                const referralHeight = (monthlyData.referral[idx] / chartMax) * 100;
                const productHeight = (monthlyData.product[idx] / chartMax) * 100;
                const propertyHeight = (monthlyData.property[idx] / chartMax) * 100;
                
                return (
                  <div key={month} className="cl-bar-group">
                    <div className="cl-bars">
                      <div 
                        className="cl-bar cl-bar-referral" 
                        style={{ height: `${referralHeight}%` }}
                        title={`Referral: ${formatRupee(monthlyData.referral[idx])}`}
                      ></div>
                      <div 
                        className="cl-bar cl-bar-product" 
                        style={{ height: `${productHeight}%` }}
                        title={`Product: ${formatRupee(monthlyData.product[idx])}`}
                      ></div>
                      <div 
                        className="cl-bar cl-bar-property" 
                        style={{ height: `${propertyHeight}%` }}
                        title={`Property: ${formatRupee(monthlyData.property[idx])}`}
                      ></div>
                    </div>
                    <div className="cl-bar-label">{month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CommissionLedger;