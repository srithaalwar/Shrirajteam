import React, { useState } from 'react';
import './PropertyDetails.css';
import { useNavigate } from "react-router-dom";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar"

const CommissionLedger = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('totalBookings');

  // Static data matching the requirements
  const totals = {
    availableProperties: 0,
    soldProperties: 0,
    bookedProperties: 3,
    pendingProperties: 0,
    verifiedProperties: 0,
    rejectedProperties: 0,
    totalBookings: 3
  };

  // Monthly data for the chart based on property types
  const monthlyData = {
    months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    available: [0, 0, 0, 0, 0, 0],
    sold: [0, 0, 0, 0, 0, 0],
    booked: [1, 1, 2, 2, 3, 3],
    pending: [0, 0, 0, 0, 0, 0],
    verified: [0, 0, 0, 0, 0, 0],
    rejected: [0, 0, 0, 0, 0, 0]
  };

  // Chart configuration for each card
  const chartConfig = {
    availableProperties: {
      title: "Available Properties Over Time",
      data: monthlyData.available,
      color: "#4CAF50",
      label: "Available Properties"
    },
    soldProperties: {
      title: "Sold Properties Over Time",
      data: monthlyData.sold,
      color: "#2196F3",
      label: "Sold Properties"
    },
    bookedProperties: {
      title: "Booked Properties Over Time",
      data: monthlyData.booked,
      color: "#FF9800",
      label: "Booked Properties"
    },
    pendingProperties: {
      title: "Pending Properties Over Time",
      data: monthlyData.pending,
      color: "#FFC107",
      label: "Pending Properties"
    },
    verifiedProperties: {
      title: "Verified Properties Over Time",
      data: monthlyData.verified,
      color: "#8BC34A",
      label: "Verified Properties"
    },
    rejectedProperties: {
      title: "Rejected Properties Over Time",
      data: monthlyData.rejected,
      color: "#F44336",
      label: "Rejected Properties"
    },
    totalBookings: {
      title: "Total Bookings Over Time",
      data: monthlyData.booked,
      color: "#9C27B0",
      label: "Total Bookings"
    }
  };

  // Calculate max value for chart scaling
  const maxValue = Math.max(
    ...monthlyData.available,
    ...monthlyData.sold,
    ...monthlyData.booked,
    ...monthlyData.pending,
    ...monthlyData.verified,
    ...monthlyData.rejected
  );
  const chartMax = Math.ceil(maxValue / 5) * 5 || 10;

  // Format numbers
  const formatNumber = (number) => {
    return number.toLocaleString('en-IN');
  };

  // Handle card click
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  // Handle back button click
  const handleBack = () => {
    navigate('/agent-dashboard');
  };

  // Get current chart data
  const currentChart = chartConfig[selectedCard];
  const currentData = currentChart.data;

  return (
    <>
      <AgentNavbar/>
      <div className="cl-container">
        <div className="cl-ledger-card">
          {/* Back Button */}
          <button className="cl-back-button" onClick={handleBack}>
            ← Back
          </button>

          {/* Header */}
          <div className="cl-header">
            <div className="cl-header-left">
              <h1 className="cl-title">Properties Dashboard</h1>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="cl-stats-grid">
            <div 
              className={`cl-stat-card property-card ${selectedCard === 'availableProperties' ? 'property-card-active' : ''}`}
              onClick={() => handleCardClick('availableProperties')}
            >
              <div className="cl-stat-label property-card-label">AVAILABLE PROPERTIES</div>
              <div className="cl-stat-value property-card-value">{formatNumber(totals.availableProperties)}</div>
            </div>
            <div 
              className={`cl-stat-card property-card ${selectedCard === 'soldProperties' ? 'property-card-active' : ''}`}
              onClick={() => handleCardClick('soldProperties')}
            >
              <div className="cl-stat-label property-card-label">SOLD PROPERTIES</div>
              <div className="cl-stat-value property-card-value">{formatNumber(totals.soldProperties)}</div>
            </div>
            <div 
              className={`cl-stat-card property-card ${selectedCard === 'bookedProperties' ? 'property-card-active' : ''}`}
              onClick={() => handleCardClick('bookedProperties')}
            >
              <div className="cl-stat-label property-card-label">BOOKED PROPERTIES</div>
              <div className="cl-stat-value property-card-value">{formatNumber(totals.bookedProperties)}</div>
            </div>
            <div 
              className={`cl-stat-card property-card ${selectedCard === 'pendingProperties' ? 'property-card-active' : ''}`}
              onClick={() => handleCardClick('pendingProperties')}
            >
              <div className="cl-stat-label property-card-label">PENDING PROPERTIES</div>
              <div className="cl-stat-value property-card-value">{formatNumber(totals.pendingProperties)}</div>
            </div>
            <div 
              className={`cl-stat-card property-card ${selectedCard === 'verifiedProperties' ? 'property-card-active' : ''}`}
              onClick={() => handleCardClick('verifiedProperties')}
            >
              <div className="cl-stat-label property-card-label">VERIFIED PROPERTIES</div>
              <div className="cl-stat-value property-card-value">{formatNumber(totals.verifiedProperties)}</div>
            </div>
            <div 
              className={`cl-stat-card property-card ${selectedCard === 'rejectedProperties' ? 'property-card-active' : ''}`}
              onClick={() => handleCardClick('rejectedProperties')}
            >
              <div className="cl-stat-label property-card-label">REJECTED PROPERTIES</div>
              <div className="cl-stat-value property-card-value">{formatNumber(totals.rejectedProperties)}</div>
            </div>
            <div 
              className={`cl-stat-card property-card-wide ${selectedCard === 'totalBookings' ? 'property-card-active' : ''}`}
              onClick={() => handleCardClick('totalBookings')}
            >
              <div className="cl-stat-label property-card-label">TOTAL BOOKINGS</div>
              <div className="cl-stat-value property-card-value">{formatNumber(totals.totalBookings)}</div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="cl-chart-section property-chart-section">
            <div className="cl-chart-header property-chart-header">
              <div>
                <h5 className="cl-chart-title property-chart-title">{currentChart.title}</h5>
                <p className="cl-chart-subtitle property-chart-subtitle">Monthly breakdown</p>
              </div>
              <div className="cl-legend property-legend">
                <span className="cl-legend-item property-legend-item">
                  <span className="cl-legend-color property-legend-color" style={{ backgroundColor: currentChart.color }}></span>
                  {currentChart.label}
                </span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="cl-chart-wrapper property-chart-wrapper">
              <div className="cl-y-axis property-y-axis">
                {[chartMax, Math.floor(chartMax * 0.75), Math.floor(chartMax * 0.5), Math.floor(chartMax * 0.25), 0].map((value, idx) => (
                  <div key={idx} className="cl-y-axis-label property-y-axis-label">
                    {value}
                  </div>
                ))}
              </div>
              <div className="cl-bars-container property-bars-container">
                {monthlyData.months.map((month, idx) => {
                  const barHeight = (currentData[idx] / chartMax) * 100;
                  
                  return (
                    <div key={month} className="cl-bar-group property-bar-group">
                      <div className="cl-bars property-bars">
                        <div 
                          className="cl-bar property-bar-single" 
                          style={{ 
                            height: `${barHeight}%`,
                            backgroundColor: currentChart.color
                          }}
                          title={`${currentChart.label}: ${currentData[idx]}`}
                        ></div>
                      </div>
                      <div className="cl-bar-label property-bar-label">{month}</div>
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