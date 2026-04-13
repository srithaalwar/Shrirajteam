



// import React, { useState, useEffect } from 'react';
// import './TotalCommissions.css';
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

// const AgentTotalCommissions = () => {
//   const navigate = useNavigate();
  
//   const [agentId, setAgentId] = useState(null);
//   const [referralData, setReferralData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [propertyData, setPropertyData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTable, setActiveTable] = useState('total');
//   const [totals, setTotals] = useState({
//     totalEarned: 0,
//     referrals: 0,
//     productSales: 0,
//     propertySales: 0
//   });

//   useEffect(() => {
//     const storedAgentId = localStorage.getItem('user_id') || 
//                           localStorage.getItem('userId') || 
//                           sessionStorage.getItem('user_id');
    
//     if (storedAgentId) {
//       setAgentId(storedAgentId);
//     } else {
//       setError('Agent ID not found. Please login again.');
//       setLoading(false);
//     }
//   }, []);

//   const fetchReferralData = async (id) => {
//     try {
//       const response = await fetch(`${baseurl}/referral-report/?user_id=${id}`);
//       const data = await response.json();
//       setReferralData(data.results || []);
      
//       const totalReferralAmount = data.results?.reduce((sum, item) => 
//         sum + (parseFloat(item.total_referral_amount_or_wallet_amount) || 0), 0
//       );
      
//       return totalReferralAmount;
//     } catch (err) {
//       console.error('Error fetching referral data:', err);
//       return 0;
//     }
//   };

//   const fetchProductData = async (id) => {
//     try {
//       const response = await fetch(`${baseurl}/product-commissions/?agent_id=${id}`);
//       const data = await response.json();
//       setProductData(data.results || []);
      
//       const totalProductAmount = data.results?.reduce((sum, item) => 
//         sum + (parseFloat(item.amount) || 0), 0
//       );
      
//       return totalProductAmount;
//     } catch (err) {
//       console.error('Error fetching product data:', err);
//       return 0;
//     }
//   };

//   useEffect(() => {
//     const fetchAllData = async () => {
//       if (!agentId) return;
      
//       setLoading(true);
//       setError(null);
      
//       try {
//         const [referralTotal, productTotal] = await Promise.all([
//           fetchReferralData(agentId),
//           fetchProductData(agentId)
//         ]);
        
//         const propertyTotal = 0;
        
//         setTotals({
//           totalEarned: referralTotal + productTotal + propertyTotal,
//           referrals: referralTotal,
//           productSales: productTotal,
//           propertySales: propertyTotal
//         });
//       } catch (err) {
//         setError('Failed to fetch data. Please try again later.');
//         console.error('Error fetching all data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchAllData();
//   }, [agentId]);

//   const formatRupee = (amount) => {
//     return `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//   };

//   const handleBack = () => {
//     navigate('/agent-dashboard');
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleCardClick = (tableType) => {
//     setActiveTable(tableType);
//   };

//   const renderTotalSummary = () => (
//     <>
//       {referralData.length > 0 && referralData[0].total_referral_amount_or_wallet_amount > 0 ? (
//         <div className="cl-table-section">
//           <div className="cl-table-header">
//             <h5 className="cl-table-title">Referral Commissions</h5>
//             <p className="cl-table-subtitle">Total: {formatRupee(totals.referrals)}</p>
//           </div>
//           <div className="cl-table-wrapper">
//             <table className="cl-data-table">
//               <thead>
//                 <tr>
//                   <th>Referral ID</th>
//                   <th>Agent Name</th>
//                   <th>Total Referrals</th>
//                   <th>Amount</th>
//                   <th>Paid Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {referralData.map((item) => (
//                   <tr key={item.user_id}>
//                     <td>{item.referral_id}</td>
//                     <td>{`${item.first_name} ${item.last_name}`}</td>
//                     <td>{item.total_referrals}</td>
//                     <td>{formatRupee(item.total_referral_amount_or_wallet_amount)}</td>
//                     <td>{formatRupee(item.total_referral_amount_or_wallet_amount_paid)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="cl-table-section">
//           <div className="cl-table-header">
//             <h5 className="cl-table-title">Referral Commissions</h5>
//             <p className="cl-table-subtitle">Total: {formatRupee(totals.referrals)}</p>
//           </div>
//           <div className="cl-placeholder">
//             <p>No referral commissions available yet.</p>
//           </div>
//         </div>
//       )}

//       {productData.length > 0 ? (
//         <div className="cl-table-section">
//           <div className="cl-table-header">
//             <h5 className="cl-table-title">Product Commissions</h5>
//             <p className="cl-table-subtitle">Total: {formatRupee(totals.productSales)}</p>
//           </div>
//           <div className="cl-table-wrapper">
//             <table className="cl-data-table">
//               <thead>
//                 <tr>
//                   <th>Product Name</th>
//                   <th>Variant</th>
//                   <th>Level</th>
//                   <th>Percentage</th>
//                   <th>Amount</th>
//                   <th>Created At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {productData.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.product_name}</td>
//                     <td>
//                       {item.variant_attributes?.size && `Size: ${item.variant_attributes.size}, `}
//                       {item.variant_attributes?.color && `Color: ${item.variant_attributes.color}`}
//                     </td>
//                     <td>{item.level_no}</td>
//                     <td>{item.percentage}%</td>
//                     <td>{formatRupee(item.amount)}</td>
//                     <td>{formatDate(item.created_at)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="cl-table-section">
//           <div className="cl-table-header">
//             <h5 className="cl-table-title">Product Commissions</h5>
//             <p className="cl-table-subtitle">Total: {formatRupee(totals.productSales)}</p>
//           </div>
//           <div className="cl-placeholder">
//             <p>No product commissions available yet.</p>
//           </div>
//         </div>
//       )}

//       <div className="cl-table-section">
//         <div className="cl-table-header">
//           <h5 className="cl-table-title">Property Commissions</h5>
//           <p className="cl-table-subtitle">Total: {formatRupee(totals.propertySales)}</p>
//         </div>
//         <div className="cl-placeholder">
//           <p>Property commission data will be available soon.</p>
//         </div>
//       </div>
//     </>
//   );

//   const renderReferralTable = () => (
//     <div className="cl-table-section">
//       <div className="cl-table-header">
//         <h5 className="cl-table-title">Referral Commissions</h5>
//         <p className="cl-table-subtitle">Your referral earnings breakdown</p>
//       </div>
//       <div className="cl-table-wrapper">
//         <table className="cl-data-table">
//           <thead>
//             <tr>
//               <th>Referral ID</th>
//               <th>Agent Name</th>
//               <th>Total Referrals</th>
//               <th>Amount</th>
//               <th>Paid Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {referralData.length > 0 ? (
//               referralData.map((item) => (
//                 <tr key={item.user_id}>
//                   <td>{item.referral_id}</td>
//                   <td>{`${item.first_name} ${item.last_name}`}</td>
//                   <td>{item.total_referrals}</td>
//                   <td>{formatRupee(item.total_referral_amount_or_wallet_amount)}</td>
//                   <td>{formatRupee(item.total_referral_amount_or_wallet_amount_paid)}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="cl-no-data">No referral data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderProductTable = () => (
//     <div className="cl-table-section">
//       <div className="cl-table-header">
//         <h5 className="cl-table-title">Product Commissions</h5>
//         <p className="cl-table-subtitle">Your product commission breakdown</p>
//       </div>
//       <div className="cl-table-wrapper">
//         <table className="cl-data-table">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Variant</th>
//               <th>Level</th>
//               <th>Percentage</th>
//               <th>Amount</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productData.length > 0 ? (
//               productData.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.product_name}</td>
//                   <td>
//                     {item.variant_attributes?.size && `Size: ${item.variant_attributes.size}, `}
//                     {item.variant_attributes?.color && `Color: ${item.variant_attributes.color}`}
//                   </td>
//                   <td>{item.level_no}</td>
//                   <td>{item.percentage}%</td>
//                   <td>{formatRupee(item.amount)}</td>
//                   <td>{formatDate(item.created_at)}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="cl-no-data">No product commission data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderPropertyTable = () => (
//     <div className="cl-table-section">
//       <div className="cl-table-header">
//         <h5 className="cl-table-title">Property Commissions</h5>
//         <p className="cl-table-subtitle">Coming soon</p>
//       </div>
//       <div className="cl-placeholder">
//         <p>Property commission data will be available soon.</p>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="cl-container">
//           <div className="cl-ledger-card">
//             <div className="cl-loading">Loading your commission data...</div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="cl-container">
//           <div className="cl-ledger-card">
//             <div className="cl-error">{error}</div>
//             <button className="cl-retry-button" onClick={() => window.location.reload()}>
//               Retry
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="cl-container">
//         <div className="cl-ledger-card">
//           <button className="cl-back-button" onClick={handleBack}>
//             ← Back to Dashboard
//           </button>

//           <div className="cl-header">
//             <div className="cl-header-left">
//               <h1 className="cl-title">My Commissions</h1>
//               <p className="cl-subtitle">Track your earnings from referrals and sales</p>
//             </div>
//           </div>

//           <div className="cl-stats-grid">
//             <div 
//               className={`cl-stat-card ${activeTable === 'total' ? 'cl-active-card' : ''}`}
//               onClick={() => handleCardClick('total')}
//             >
//               <div className="cl-stat-label">TOTAL EARNED</div>
//               <div className="cl-stat-value">{formatRupee(totals.totalEarned)}</div>
//             </div>
//             <div 
//               className={`cl-stat-card ${activeTable === 'referral' ? 'cl-active-card' : ''}`}
//               onClick={() => handleCardClick('referral')}
//             >
//               <div className="cl-stat-label">REFERRALS AMOUNT</div>
//               <div className="cl-stat-value">{formatRupee(totals.referrals)}</div>
//             </div>
//             <div 
//               className={`cl-stat-card ${activeTable === 'product' ? 'cl-active-card' : ''}`}
//               onClick={() => handleCardClick('product')}
//             >
//               <div className="cl-stat-label">PRODUCT PAYOUTS</div>
//               <div className="cl-stat-value">{formatRupee(totals.productSales)}</div>
//             </div>
//             <div 
//               className={`cl-stat-card ${activeTable === 'property' ? 'cl-active-card' : ''}`}
//               onClick={() => handleCardClick('property')}
//             >
//               <div className="cl-stat-label">PROPERTY PAYOUTS</div>
//               <div className="cl-stat-value">{formatRupee(totals.propertySales)}</div>
//             </div>
//           </div>

//           {activeTable === 'total' && renderTotalSummary()}
//           {activeTable === 'referral' && renderReferralTable()}
//           {activeTable === 'product' && renderProductTable()}
//           {activeTable === 'property' && renderPropertyTable()}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AgentTotalCommissions;


import React, { useState, useEffect } from 'react';
import './TotalCommissions.css';
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

const AgentTotalCommissions = () => {
  const navigate = useNavigate();
  
  const [agentId, setAgentId] = useState(null);
  const [referralData, setReferralData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTable, setActiveTable] = useState('total');
  const [totals, setTotals] = useState({
    totalEarned: 0,
    referrals: 0,
    productSales: 0,
    propertySales: 0
  });

  useEffect(() => {
    const storedAgentId = localStorage.getItem('user_id') || 
                          localStorage.getItem('userId') || 
                          sessionStorage.getItem('user_id');
    
    if (storedAgentId) {
      setAgentId(storedAgentId);
    } else {
      setError('Agent ID not found. Please login again.');
      setLoading(false);
    }
  }, []);

  // Function to fetch commissions based on commission_type
  const fetchCommissionsByType = async (agentId, commissionType) => {
    try {
      const response = await fetch(`${baseurl}/commissions/?agent_id=${agentId}&commission_type=${commissionType}`);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error(`Error fetching ${commissionType} data:`, err);
      return [];
    }
  };

  const fetchReferralData = async (id) => {
    try {
      const referralCommissions = await fetchCommissionsByType(id, 'referral_commission');
      setReferralData(referralCommissions);
      
      const totalReferralAmount = referralCommissions.reduce((sum, item) => 
        sum + (parseFloat(item.amount) || 0), 0
      );
      
      return totalReferralAmount;
    } catch (err) {
      console.error('Error fetching referral data:', err);
      return 0;
    }
  };

  const fetchProductData = async (id) => {
    try {
      const productCommissions = await fetchCommissionsByType(id, 'product_commission');
      setProductData(productCommissions);
      
      const totalProductAmount = productCommissions.reduce((sum, item) => 
        sum + (parseFloat(item.amount) || 0), 0
      );
      
      return totalProductAmount;
    } catch (err) {
      console.error('Error fetching product data:', err);
      return 0;
    }
  };

  const fetchPropertyData = async (id) => {
    try {
      const propertyCommissions = await fetchCommissionsByType(id, 'property_commission');
      setPropertyData(propertyCommissions);
      
      const totalPropertyAmount = propertyCommissions.reduce((sum, item) => 
        sum + (parseFloat(item.amount) || 0), 0
      );
      
      return totalPropertyAmount;
    } catch (err) {
      console.error('Error fetching property data:', err);
      return 0;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      if (!agentId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [referralTotal, productTotal, propertyTotal] = await Promise.all([
          fetchReferralData(agentId),
          fetchProductData(agentId),
          fetchPropertyData(agentId)
        ]);
        
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
  }, [agentId]);

  const formatRupee = (amount) => {
    return `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleBack = () => {
    navigate('/agent-dashboard');
  };

  // Updated formatDate function - backend already returns date in DD-MM-YYYY HH:MM:SS format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    // The backend already returns date in DD-MM-YYYY HH:MM:SS format
    // So just return it directly
    return dateString;
  };

  const handleCardClick = (tableType) => {
    setActiveTable(tableType);
  };

  const renderTotalSummary = () => (
    <>
      {referralData.length > 0 ? (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Referral Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.referrals)}</p>
          </div>
          <div className="cl-table-wrapper">
            <table className="cl-data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Referral ID</th>
                  <th>Agent Name</th>
                  <th>Level</th>
                  {/* <th>Percentage</th> */}
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {referralData.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.referral_id || 'N/A'}</td>
                    <td>{item.agent_name || 'N/A'}</td>
                    <td>{item.level_no || 'N/A'}</td>
                    {/* <td>{item.percentage || '0'}%</td> */}
                    <td>{formatRupee(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Referral Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.referrals)}</p>
          </div>
          <div className="cl-placeholder">
            <p>No referral commissions available yet.</p>
          </div>
        </div>
      )}

      {productData.length > 0 ? (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Product Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.productSales)}</p>
          </div>
          <div className="cl-table-wrapper">
            <table className="cl-data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product Name</th>
                  <th>Variant</th>
                  <th>Level</th>
                  {/* <th>Percentage</th> */}
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.product_name}</td>
                    <td>
                      {item.variant_attributes?.size && `Size: ${item.variant_attributes.size}, `}
                      {item.variant_attributes?.color && `Color: ${item.variant_attributes.color}`}
                    </td>
                    <td>{item.level_no}</td>
                    {/* <td>{item.percentage}%</td> */}
                    <td>{formatRupee(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Product Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.productSales)}</p>
          </div>
          <div className="cl-placeholder">
            <p>No product commissions available yet.</p>
          </div>
        </div>
      )}

      {propertyData.length > 0 ? (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Property Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.propertySales)}</p>
          </div>
          <div className="cl-table-wrapper">
            <table className="cl-data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Property Name</th>
                  <th>Property Type</th>
                  <th>Level</th>
                  {/* <th>Percentage</th> */}
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {propertyData.map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.property_name || item.name || `Property ${item.id}`}</td>
                    <td>{item.property_type || 'N/A'}</td>
                    <td>{item.level_no}</td>
                    {/* <td>{item.percentage}%</td> */}
                    <td>{formatRupee(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="cl-table-section">
          <div className="cl-table-header">
            <h5 className="cl-table-title">Property Commissions</h5>
            <p className="cl-table-subtitle">Total: {formatRupee(totals.propertySales)}</p>
          </div>
          <div className="cl-placeholder">
            <p>No property commissions available yet.</p>
          </div>
        </div>
      )}
    </>
  );

  const renderReferralTable = () => (
    <div className="cl-table-section">
      <div className="cl-table-header">
        <h5 className="cl-table-title">Referral Commissions</h5>
        <p className="cl-table-subtitle">Your referral earnings breakdown</p>
      </div>
      <div className="cl-table-wrapper">
        <table className="cl-data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Referral ID</th>
              <th>Agent Name</th>
              <th>Level</th>
              {/* <th>Percentage</th> */}
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {referralData.length > 0 ? (
              referralData.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{formatDate(item.created_at)}</td>
                  <td>{item.referral_id || 'N/A'}</td>
                  <td>{item.agent_name || 'N/A'}</td>
                  <td>{item.level_no || 'N/A'}</td>
                  {/* <td>{item.percentage || '0'}%</td> */}
                  <td>{formatRupee(item.amount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="cl-no-data">No referral data available</td>
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
        <p className="cl-table-subtitle">Your product commission breakdown</p>
      </div>
      <div className="cl-table-wrapper">
        <table className="cl-data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Variant</th>
              <th>Level</th>
              {/* <th>Percentage</th> */}
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {productData.length > 0 ? (
              productData.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.created_at)}</td>
                  <td>{item.product_name}</td>
                  <td>
                    {item.variant_attributes?.size && `Size: ${item.variant_attributes.size}, `}
                    {item.variant_attributes?.color && `Color: ${item.variant_attributes.color}`}
                  </td>
                  <td>{item.level_no}</td>
                  {/* <td>{item.percentage}%</td> */}
                  <td>{formatRupee(item.amount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="cl-no-data">No product commission data available</td>
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
        <p className="cl-table-subtitle">Your property commission breakdown</p>
      </div>
      <div className="cl-table-wrapper">
        <table className="cl-data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Property Name</th>
              <th>Property Type</th>
              <th>Level</th>
              {/* <th>Percentage</th> */}
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {propertyData.length > 0 ? (
              propertyData.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.created_at)}</td>
                  <td>{item.property_name || item.name || `Property ${item.id}`}</td>
                  <td>{item.property_type || 'N/A'}</td>
                  <td>{item.level_no}</td>
                  {/* <td>{item.percentage}%</td> */}
                  <td>{formatRupee(item.amount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="cl-no-data">No property commission data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="cl-container">
          <div className="cl-ledger-card">
            <div className="cl-loading">Loading your commission data...</div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AgentNavbar />
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
      <AgentNavbar />
      <div className="cl-container">
        <div className="cl-ledger-card">
          <button className="cl-back-button" onClick={handleBack}>
            ← Back to Dashboard
          </button>

          <div className="cl-header">
            <div className="cl-header-left">
              <h1 className="cl-title">My Commissions</h1>
              <p className="cl-subtitle">Track your earnings from referrals and sales</p>
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

export default AgentTotalCommissions;