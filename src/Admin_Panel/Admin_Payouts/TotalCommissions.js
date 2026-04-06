

// import React from 'react';
// import './TotalCommissions.css';
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";
//  import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar"

// const AdminTotalCommissions = () => {
//   const navigate = useNavigate();

//   // Static data matching the image
//   const totals = {
//     totalEarned: 43850,
//     referrals: 3970,
//     productSales: 5130,
//     propertySales: 34750,
//     growth: {
//       totalEarned: 18.2,
//       referrals: 7.3,
//       productSales: 24.8,
//       propertySales: 12.1
//     }
//   };

//   // Monthly data for the chart
//   const monthlyData = {
//     months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
//     referral: [2800, 3100, 3400, 3600, 3700, 3970],
//     product: [3200, 3800, 4200, 4600, 4800, 5130],
//     property: [24500, 26800, 29500, 31200, 32800, 34750]
//   };

//   // Calculate max value for chart scaling
//   const maxValue = Math.max(
//     ...monthlyData.referral,
//     ...monthlyData.product,
//     ...monthlyData.property
//   );
//   const chartMax = Math.ceil(maxValue / 5000) * 5000;

//   // Format currency in Rupees
//   const formatRupee = (amount) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   // Handle back button click - navigate to dashboard
//   const handleBack = () => {
//     navigate('/admin-dashboard');
//   };

//   return (
//         <>
//         <AdminNavbar/>
//     <div className="cl-container">
//       <div className="cl-ledger-card">
//         {/* Back Button - Top Right */}
//         <button className="cl-back-button" onClick={handleBack}>
//           ← Back
//         </button>

//         {/* Header */}
//         <div className="cl-header">
//           <div className="cl-header-left">
//             <h1 className="cl-title">Commissions</h1>
       
//           </div>
        
//         </div>

//         {/* Stats Cards */}
//         <div className="cl-stats-grid">
//           <div className="cl-stat-card">
//             <div className="cl-stat-label">TOTAL EARNED</div>
//             <div className="cl-stat-value">{formatRupee(totals.totalEarned)}</div>
         
//           </div>
//           <div className="cl-stat-card">
//             <div className="cl-stat-label">REFERRALS AMOUNT</div>
//             <div className="cl-stat-value">{formatRupee(totals.referrals)}</div>
          
//           </div>
//           <div className="cl-stat-card">
//             <div className="cl-stat-label">PRODUCT PAYOUTS</div>
//             <div className="cl-stat-value">{formatRupee(totals.productSales)}</div>
         
//           </div>
//           <div className="cl-stat-card">
//             <div className="cl-stat-label">PROPERTY PAYOUTS</div>
//             <div className="cl-stat-value">{formatRupee(totals.propertySales)}</div>
          
//           </div>
//         </div>

//         {/* Chart Section */}
//         <div className="cl-chart-section">
//           <div className="cl-chart-header">
//             <div>
//               <h5 className="cl-chart-title">Earnings Over Time</h5>
//               <p className="cl-chart-subtitle">Monthly breakdown by source</p>
//             </div>
//             <div className="cl-legend">
//               <span className="cl-legend-item">
//                 <span className="cl-legend-color cl-legend-referral"></span>
//                 Referral
//               </span>
//               <span className="cl-legend-item">
//                 <span className="cl-legend-color cl-legend-product"></span>
//                 Product
//               </span>
//               <span className="cl-legend-item">
//                 <span className="cl-legend-color cl-legend-property"></span>
//                 Property
//               </span>
//             </div>
//           </div>

//           {/* Bar Chart */}
//           <div className="cl-chart-wrapper">
//             <div className="cl-y-axis">
//               {[chartMax, chartMax * 0.75, chartMax * 0.5, chartMax * 0.25, 0].map((value, idx) => (
//                 <div key={idx} className="cl-y-axis-label">
//                   ₹{(value / 1000).toFixed(0)}k
//                 </div>
//               ))}
//             </div>
//             <div className="cl-bars-container">
//               {monthlyData.months.map((month, idx) => {
//                 const referralHeight = (monthlyData.referral[idx] / chartMax) * 100;
//                 const productHeight = (monthlyData.product[idx] / chartMax) * 100;
//                 const propertyHeight = (monthlyData.property[idx] / chartMax) * 100;
                
//                 return (
//                   <div key={month} className="cl-bar-group">
//                     <div className="cl-bars">
//                       <div 
//                         className="cl-bar cl-bar-referral" 
//                         style={{ height: `${referralHeight}%` }}
//                         title={`Referral: ${formatRupee(monthlyData.referral[idx])}`}
//                       ></div>
//                       <div 
//                         className="cl-bar cl-bar-product" 
//                         style={{ height: `${productHeight}%` }}
//                         title={`Product: ${formatRupee(monthlyData.product[idx])}`}
//                       ></div>
//                       <div 
//                         className="cl-bar cl-bar-property" 
//                         style={{ height: `${propertyHeight}%` }}
//                         title={`Property: ${formatRupee(monthlyData.property[idx])}`}
//                       ></div>
//                     </div>
//                     <div className="cl-bar-label">{month}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default AdminTotalCommissions;



//============================================


import React, { useState, useEffect } from 'react';
import './TotalCommissions.css';
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";

const AdminTotalCommissions = () => {
  const navigate = useNavigate();
  
  // State for dynamic data
  const [referralData, setReferralData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for active table view
  const [activeTable, setActiveTable] = useState('total');
  
  // State for totals
  const [totals, setTotals] = useState({
    totalEarned: 0,
    referrals: 0,
    productSales: 0,
    propertySales: 0
  });

  // Fetch referral data
  const fetchReferralData = async () => {
    try {
      const response = await fetch(`${baseurl}/referral-report/`);
      const data = await response.json();
      setReferralData(data.results || []);
      
      const totalReferralAmount = data.results?.reduce((sum, item) => 
        sum + (parseFloat(item.total_referral_amount_or_wallet_amount) || 0), 0
      );
      
      return totalReferralAmount;
    } catch (err) {
      console.error('Error fetching referral data:', err);
      return 0;
    }
  };

  // Fetch product commission data
  const fetchProductData = async () => {
    try {
      const response = await fetch(`${baseurl}/product-commissions/`);
      const data = await response.json();
      setProductData(data.results || []);
      
      const totalProductAmount = data.results?.reduce((sum, item) => 
        sum + (parseFloat(item.amount) || 0), 0
      );
      
      return totalProductAmount;
    } catch (err) {
      console.error('Error fetching product data:', err);
      return 0;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [referralTotal, productTotal] = await Promise.all([
          fetchReferralData(),
          fetchProductData()
        ]);
        
        const propertyTotal = 0;
        
        setTotals({
          totalEarned: referralTotal + productTotal + propertyTotal,
          referrals: referralTotal,
          productSales: productTotal,
          propertySales: propertyTotal
        });
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching all data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  const formatRupee = (amount) => {
    return `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCardClick = (tableType) => {
    setActiveTable(tableType);
  };

  const renderTotalSummary = () => (
    <>
      {referralData.length > 0 && (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Referral Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.referrals)}</p>
          </div>
          <div className="cl-table-wrapper">
            <table className="cl-data-table">
              <thead>
                <tr>
                  <th>Referral ID</th>
                  <th>Agent Name</th>
                  <th>Total Referrals</th>
                  <th>Amount</th>
                  <th>Paid Amount</th>
                </tr>
              </thead>
              <tbody>
                {referralData.map((item) => (
                  <tr key={item.user_id}>
                    <td>{item.referral_id}</td>
                    <td>{`${item.first_name} ${item.last_name}`}</td>
                    <td>{item.total_referrals}</td>
                    <td>{formatRupee(item.total_referral_amount_or_wallet_amount)}</td>
                    <td>{formatRupee(item.total_referral_amount_or_wallet_amount_paid)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {productData.length > 0 && (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Product Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.productSales)}</p>
          </div>
          <div className="cl-table-wrapper">
            <table className="cl-data-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Agent Name</th>
                  <th>Referral ID</th>
                  <th>Level</th>
                  <th>Percentage</th>
                  <th>Amount</th>
                  {/* <th>Created At</th> */}
                </tr>
              </thead>
              <tbody>
                {productData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.agent_name}</td>
                    <td>{item.referral_id}</td>
                    <td>{item.level_no}</td>
                    <td>{item.percentage}%</td>
                    <td>{formatRupee(item.amount)}</td>
                    {/* <td>{formatDate(item.created_at)}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="cl-table-section">
        <div className="cl-table-header">
          <h5 className="cl-table-title">Property Commissions</h5>
          <p className="cl-table-subtitle">Total: {formatRupee(totals.propertySales)}</p>
        </div>
        <div className="cl-placeholder">
          <p>Property commission data will be available soon.</p>
        </div>
      </div>
    </>
  );

  const renderReferralTable = () => (
    <div className="cl-table-section">
      <div className="cl-table-header">
        <h5 className="cl-table-title">Referral Commissions</h5>
        <p className="cl-table-subtitle">Breakdown by agent</p>
      </div>
      <div className="cl-table-wrapper">
        <table className="cl-data-table">
          <thead>
            <tr>
              <th>Referral ID</th>
              <th>Agent Name</th>
              <th>Total Referrals</th>
              <th>Amount</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {referralData.length > 0 ? (
              referralData.map((item) => (
                <tr key={item.user_id}>
                  <td>{item.referral_id}</td>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{item.total_referrals}</td>
                  <td>{formatRupee(item.total_referral_amount_or_wallet_amount)}</td>
                  <td>{formatRupee(item.total_referral_amount_or_wallet_amount_paid)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="cl-no-data">No referral data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProductTable = () => (
    <div className="cl-table-section">
      <div className="cl-table-header">
        <h5 className="cl-table-title">Product Commissions</h5>
        <p className="cl-table-subtitle">Breakdown by transaction</p>
      </div>
      <div className="cl-table-wrapper">
        <table className="cl-data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Agent Name</th>
              <th>Referral ID</th>
              <th>Level</th>
              <th>Percentage</th>
              <th>Amount</th>
              {/* <th>Created At</th> */}
            </tr>
          </thead>
          <tbody>
            {productData.length > 0 ? (
              productData.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>{item.agent_name}</td>
                  <td>{item.referral_id}</td>
                  <td>{item.level_no}</td>
                  <td>{item.percentage}%</td>
                  <td>{formatRupee(item.amount)}</td>
                  {/* <td>{formatDate(item.created_at)}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="cl-no-data">No product commission data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPropertyTable = () => (
    <div className="cl-table-section">
      <div className="cl-table-header">
        <h5 className="cl-table-title">Property Commissions</h5>
        <p className="cl-table-subtitle">Coming soon</p>
      </div>
      <div className="cl-placeholder">
        <p>Property commission data will be available soon.</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="cl-container">
          <div className="cl-ledger-card">
            <div className="cl-loading">Loading commissions data...</div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <div className="cl-container">
          <div className="cl-ledger-card">
            <div className="cl-error">{error}</div>
            <button className="cl-retry-button" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="cl-container">
        <div className="cl-ledger-card">
          <button className="cl-back-button" onClick={handleBack}>
            ← Back
          </button>

          <div className="cl-header">
            <div className="cl-header-left">
              <h1 className="cl-title">Commissions</h1>
            </div>
          </div>

          <div className="cl-stats-grid">
            <div 
              className={`cl-stat-card ${activeTable === 'total' ? 'cl-active-card' : ''}`}
              onClick={() => handleCardClick('total')}
            >
              <div className="cl-stat-label">TOTAL EARNED</div>
              <div className="cl-stat-value">{formatRupee(totals.totalEarned)}</div>
            </div>
            <div 
              className={`cl-stat-card ${activeTable === 'referral' ? 'cl-active-card' : ''}`}
              onClick={() => handleCardClick('referral')}
            >
              <div className="cl-stat-label">REFERRALS AMOUNT</div>
              <div className="cl-stat-value">{formatRupee(totals.referrals)}</div>
            </div>
            <div 
              className={`cl-stat-card ${activeTable === 'product' ? 'cl-active-card' : ''}`}
              onClick={() => handleCardClick('product')}
            >
              <div className="cl-stat-label">PRODUCT PAYOUTS</div>
              <div className="cl-stat-value">{formatRupee(totals.productSales)}</div>
            </div>
            <div 
              className={`cl-stat-card ${activeTable === 'property' ? 'cl-active-card' : ''}`}
              onClick={() => handleCardClick('property')}
            >
              <div className="cl-stat-label">PROPERTY PAYOUTS</div>
              <div className="cl-stat-value">{formatRupee(totals.propertySales)}</div>
            </div>
          </div>

          {activeTable === 'total' && renderTotalSummary()}
          {activeTable === 'referral' && renderReferralTable()}
          {activeTable === 'product' && renderProductTable()}
          {activeTable === 'property' && renderPropertyTable()}
        </div>
      </div>
    </>
  );
};

export default AdminTotalCommissions;