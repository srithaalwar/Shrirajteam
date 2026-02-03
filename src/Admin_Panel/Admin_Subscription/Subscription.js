// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import Swal from 'sweetalert2';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Subscription.css';

// function Subscription() {
//   const [userType, setUserType] = useState('client');
//   const [variantData, setVariantData] = useState([]);
//   const [planDataMap, setPlanDataMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);

//   const itemsPerPage = 5;
//   const navigate = useNavigate();

//   const fetchVariantsAndPlans = async (type) => {
//     setLoading(true);
//     try {
//       const variantRes = await fetch(`${baseurl}/subscription/plan-variants/${type}/`);
//       const variants = await variantRes.json();
//       setVariantData(variants);

//       const planIds = [...new Set(variants.map(v => v.plan_id))];
//       const plansMap = {};

//       await Promise.all(
//         planIds.map(async (id) => {
//           try {
//             const res = await fetch(`${baseurl}/subscription/plans/${id}/`);
//             const plan = await res.json();
//             plansMap[id] = plan;
//           } catch (err) {
//             console.error(`Error fetching plan with ID ${id}`, err);
//           }
//         })
//       );

//       setPlanDataMap(plansMap);
//       setPage(1);
//     } catch (error) {
//       console.error('Error fetching variant data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVariantsAndPlans(userType);
//   }, [userType]);

//   const handleDelete = async (variantId) => {
//     const result = await Swal.fire({
//       title: `Delete Variant ID ${variantId}?`,
//       text: 'This action cannot be undone.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel',
//     });

//     if (!result.isConfirmed) return;

//     try {
//       const response = await fetch(
//         `${baseurl}/subscription/plan-variants/${variantId}/`,
//         { method: 'DELETE' }
//       );

//       if (response.ok) {
//         await Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: `Variant ID ${variantId} deleted successfully.`,
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         fetchVariantsAndPlans(userType);
//       } else {
//         const errorData = await response.json();
//         await Swal.fire({
//           icon: 'error',
//           title: 'Failed to delete',
//           text: errorData.detail || 'Unknown error',
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting variant:', error);
//       await Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while trying to delete the variant.',
//       });
//     }
//   };

//   const totalPages = Math.ceil(variantData.length / itemsPerPage);

//   const paginatedData = variantData.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const getSerialNumber = (index) => {
//     return (page - 1) * itemsPerPage + index + 1;
//   };

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="container subscription-container">
//         <h2 className="subscription-title">Subscription Plan Variants</h2>

//         {/* Top Actions */}
//         <div className="top-bar">
//           <button
//             className="btn "
            
//                       style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}
//             onClick={() => navigate('/admin-addsubscriptions')}
//           >
//             + Add Subscription
//           </button>

//           <select
//             className="form-select user-type-select"
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//           >
//             <option value="client">User</option>
//             <option value="agent">Team</option>
//           </select>
//         </div>

//         {/* Loader */}
//         {loading ? (
//           <div className="loader-wrapper">
//             <div className="spinner-border text-primary" role="status" />
//           </div>
//         ) : (
//           <>
//             {/* Table */}
//             <div className="table-responsive">
//               <table className="table table-bordered subscription-table">
//                 <thead>
//                   <tr>
//                     <th>S.No</th>
//                     <th>Plan Name</th>
//                     <th>Description</th>
//                     <th>Duration (Days)</th>
//                     <th>Price</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedData.length > 0 ? (
//                     paginatedData.map((variant, index) => {
//                       const plan = planDataMap[variant.plan_id] || {};
//                       return (
//                         <tr key={variant.variant_id}>
//                           <td>{getSerialNumber(index)}</td>
//                           <td>{plan.plan_name || '—'}</td>
//                           <td>{plan.description || '—'}</td>
//                           <td>{variant.duration_in_days}</td>
//                           <td>₹{variant.price}</td>
//                           <td>
//                             <div className="action-buttons">
//                               <button
//                                 className="btn btn-sm btn-outline-primary"
//                                 onClick={() =>
//                                   navigate(
//                                     `/admin-edit-subscription/${variant.variant_id}`,
//                                     { state: { variant } }
//                                   )
//                                 }
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() =>
//                                   handleDelete(variant.variant_id)
//                                 }
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="no-data">
//                         No subscription variants found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="pagination-wrapper">
//               <ul className="pagination">
//                 {[...Array(totalPages)].map((_, i) => (
//                   <li
//                     key={i}
//                     className={`page-item ${
//                       page === i + 1 ? 'active' : ''
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default Subscription;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './Subscription.css';

// function Subscription() {
//   const [userType, setUserType] = useState('client');
//   const [variantData, setVariantData] = useState([]);
//   const [planDataMap, setPlanDataMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);

//   const itemsPerPage = 5;
//   const navigate = useNavigate();

//   /* ================= FETCH ================= */
//   const fetchVariantsAndPlans = async (type) => {
//     setLoading(true);
//     try {
//       // 1️⃣ Fetch variants
//       const variantRes = await axios.get(
//         `${baseurl}/subscription/plan-variants/${type}/`
//       );
//       const variants = variantRes.data || [];
//       setVariantData(variants);

//       // 2️⃣ Collect unique plan IDs
//       const planIds = [...new Set(variants.map(v => v.plan_id))];
//       const plansMap = {};

//       // 3️⃣ Fetch plans safely (handles paginated + non-paginated)
//       await Promise.all(
//         planIds.map(async (id) => {
//           try {
//             const res = await axios.get(
//               `${baseurl}/subscription/plans/${id}/`
//             );

//             // ✅ FIX: handle paginated OR direct object response
//             const plan =
//               res.data?.results?.[0] || res.data;

//             plansMap[id] = plan;
//           } catch (err) {
//             console.error(`Error fetching plan with ID ${id}`, err);
//           }
//         })
//       );

//       setPlanDataMap(plansMap);
//       setPage(1);
//     } catch (error) {
//       console.error('Error fetching variant data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVariantsAndPlans(userType);
//   }, [userType]);

//   /* ================= SEARCH ================= */
//   const safeToString = (v) =>
//     v !== null && v !== undefined ? v.toString() : '';

//   const filteredData = variantData.filter((variant) => {
//     const plan = planDataMap[variant.plan_id] || {};
//     const q = searchQuery.toLowerCase();

//     return (
//       safeToString(variant.variant_id).includes(q) ||
//       safeToString(plan.plan_name).toLowerCase().includes(q) ||
//       safeToString(plan.description).toLowerCase().includes(q) ||
//       safeToString(variant.duration_in_days).includes(q) ||
//       safeToString(variant.price).includes(q)
//     );
//   });

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const paginatedData = filteredData.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const getSerialNumber = (index) =>
//     (page - 1) * itemsPerPage + index + 1;

//   /* ================= DELETE ================= */
//   const handleDelete = (variantId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(
//             `${baseurl}/subscription/plan-variants/${variantId}/`
//           );
//           Swal.fire('Deleted!', 'Subscription variant deleted.', 'success');
//           fetchVariantsAndPlans(userType);
//         } catch {
//           Swal.fire('Error', 'Delete failed', 'error');
//         }
//       }
//     });
//   };

//   const formatCurrency = (v) =>
//     `₹${Number(v || 0).toLocaleString()}`;

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Subscription Plan Variants</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by Plan, Description, Duration or Price"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setPage(1);
//               }}
//             />
//             <span className="search-icon">🔍</span>
//           </div>

//           <div className="d-flex gap-2">
//             <select
//               className="form-select user-type-select"
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//             >
//               <option value="client">User</option>
//               <option value="agent">Team</option>
//             </select>

//             <button
//               className="primary-btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 borderColor: '#273c75',
//                 color: 'white',
//               }}
//               onClick={() => navigate('/admin-addsubscriptions')}
//             >
//               Add Subscription
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>Plan Name</th>
//                 <th>Description</th>
//                 <th>Duration (Days)</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedData.length ? (
//                 paginatedData.map((variant, index) => {
//                   const plan = planDataMap[variant.plan_id] || {};
//                   return (
//                     <tr key={variant.variant_id}>
//                       <td>{getSerialNumber(index)}</td>
//                       <td>{plan.plan_name || '—'}</td>
//                       <td>{plan.description || '—'}</td>
//                       <td>{variant.duration_in_days}</td>
//                       <td>{formatCurrency(variant.price)}</td>
//                       <td className="actions">
//                         <button
//                           className="edit-btn"
//                           onClick={() =>
//                             navigate(
//                               `/admin-edit-subscription/${variant.variant_id}`,
//                               { state: { variant } }
//                             )
//                           }
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           className="delete-btn"
//                           onClick={() =>
//                             handleDelete(variant.variant_id)
//                           }
//                         >
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     No subscription variants found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="pagination-wrapper">
//             <ul className="pagination">
//               {[...Array(totalPages)].map((_, i) => (
//                 <li
//                   key={i}
//                   className={`page-item ${
//                     page === i + 1 ? 'active' : ''
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => setPage(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Subscription;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import './Subscription.css';

// function Subscription() {
//   const [userType, setUserType] = useState('client');
//   const [variantData, setVariantData] = useState([]);
//   const [planDataMap, setPlanDataMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);

//   const itemsPerPage = 5;
//   const navigate = useNavigate();

//   /* ================= FETCH ================= */
//   const fetchVariantsAndPlans = async (type) => {
//     setLoading(true);
//     try {
//       // 1️⃣ Fetch variants (FIX: handle paginated + non-paginated)
//       const variantRes = await axios.get(
//         `${baseurl}/subscription/plan-variants/${type}/`
//       );

//       const variants = Array.isArray(variantRes.data)
//         ? variantRes.data
//         : variantRes.data?.results || [];

//       setVariantData(variants);

//       // 2️⃣ Collect unique plan IDs
//       const planIds = [...new Set(variants.map(v => v.plan_id))];
//       const plansMap = {};

//       // 3️⃣ Fetch plans safely
//       await Promise.all(
//         planIds.map(async (id) => {
//           try {
//             const res = await axios.get(
//               `${baseurl}/subscription/plans/${id}/`
//             );

//             // FIX: handle paginated OR direct object
//             const plan =
//               res.data?.results?.[0] || res.data;

//             plansMap[id] = plan;
//           } catch (err) {
//             console.error(`Error fetching plan with ID ${id}`, err);
//           }
//         })
//       );

//       setPlanDataMap(plansMap);
//       setPage(1);
//     } catch (error) {
//       console.error('Error fetching variant data:', error);
//       setVariantData([]);
//       setPlanDataMap({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVariantsAndPlans(userType);
//   }, [userType]);

//   /* ================= SEARCH ================= */
//   const safeToString = (v) =>
//     v !== null && v !== undefined ? v.toString() : '';

//   const filteredData = variantData.filter((variant) => {
//     const plan = planDataMap[variant.plan_id] || {};
//     const q = searchQuery.toLowerCase();

//     return (
//       safeToString(variant.variant_id).includes(q) ||
//       safeToString(plan.plan_name).toLowerCase().includes(q) ||
//       safeToString(plan.description).toLowerCase().includes(q) ||
//       safeToString(variant.duration_in_days).includes(q) ||
//       safeToString(variant.price).includes(q)
//     );
//   });

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const paginatedData = filteredData.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const getSerialNumber = (index) =>
//     (page - 1) * itemsPerPage + index + 1;

//   /* ================= DELETE ================= */
//   const handleDelete = (variantId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(
//             `${baseurl}/subscription/plan-variants/${variantId}/`
//           );
//           Swal.fire('Deleted!', 'Subscription variant deleted.', 'success');
//           fetchVariantsAndPlans(userType);
//         } catch {
//           Swal.fire('Error', 'Delete failed', 'error');
//         }
//       }
//     });
//   };

//   const formatCurrency = (v) =>
//     `₹${Number(v || 0).toLocaleString()}`;

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="page-container">
//         {/* Header */}
//         <div className="page-header">
//           <h2>Subscription Plan Variants</h2>
//         </div>

//         {/* Toolbar */}
//         <div className="page-toolbar">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by Plan, Description, Duration or Price"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setPage(1);
//               }}
//             />
//             <span className="search-icon">🔍</span>
//           </div>

//           <div className="d-flex gap-2">
//             <select
//               className="form-select user-type-select"
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//             >
//               <option value="client">User</option>
//               <option value="agent">Team</option>
//             </select>

//             <button
//               className="primary-btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 borderColor: '#273c75',
//                 color: 'white',
//               }}
//               onClick={() => navigate('/admin-addsubscriptions')}
//             >
//               Add Subscription
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-card">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>Plan Name</th>
//                 <th>Description</th>
//                 <th>Duration (Days)</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : paginatedData.length ? (
//                 paginatedData.map((variant, index) => {
//                   const plan = planDataMap[variant.plan_id] || {};
//                   return (
//                     <tr key={variant.variant_id}>
//                       <td>{getSerialNumber(index)}</td>
//                       <td>{plan.plan_name || '—'}</td>
//                       <td>{plan.description || '—'}</td>
//                       <td>{variant.duration_in_days}</td>
//                       <td>{formatCurrency(variant.price)}</td>
//                       <td className="actions">
//                         <button
//                           className="edit-btn"
//                           onClick={() =>
//                             navigate(
//                               `/admin-edit-subscription/${variant.variant_id}`,
//                               { state: { variant } }
//                             )
//                           }
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           className="delete-btn"
//                           onClick={() =>
//                             handleDelete(variant.variant_id)
//                           }
//                         >
//                           🗑️
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="no-data">
//                     No subscription variants found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="pagination-wrapper">
//             <ul className="pagination">
//               {[...Array(totalPages)].map((_, i) => (
//                 <li
//                   key={i}
//                   className={`page-item ${
//                     page === i + 1 ? 'active' : ''
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => setPage(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Subscription;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import Swal from 'sweetalert2';
import axios from 'axios';
import './Subscription.css';

function Subscription() {
  const [userType, setUserType] = useState('client');
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchVariantsAndPlans = async (type) => {
    setLoading(true);
    try {
      // Build query parameters for pagination
      const params = new URLSearchParams({
        page: currentPage,
        page_size: itemsPerPage,
      });
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      // 1️⃣ Fetch variants with pagination
      const variantRes = await axios.get(
        `${baseurl}/subscription/plan-variants/${type}/?${params.toString()}`
      );

      // Handle different response formats
      let variants = [];
      let count = 0;
      
      if (Array.isArray(variantRes.data)) {
        variants = variantRes.data;
        count = variantRes.data.length;
      } else if (variantRes.data.results) {
        variants = variantRes.data.results || [];
        count = variantRes.data.count || variants.length;
      } else {
        variants = variantRes.data;
        count = variantRes.data.length || 0;
      }

      setVariantData(variants);
      setTotalItems(count);

      // 2️⃣ Collect unique plan IDs
      const planIds = [...new Set(variants.map(v => v.plan_id))];
      const plansMap = {};

      // 3️⃣ Fetch plans safely
      await Promise.all(
        planIds.map(async (id) => {
          try {
            const res = await axios.get(
              `${baseurl}/subscription/plans/${id}/`
            );

            // Handle paginated OR direct object
            const plan =
              res.data?.results?.[0] || res.data;

            plansMap[id] = plan;
          } catch (err) {
            console.error(`Error fetching plan with ID ${id}`, err);
          }
        })
      );

      setPlanDataMap(plansMap);
    } catch (error) {
      console.error('Error fetching variant data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load subscription variants',
        confirmButtonColor: '#273c75'
      });
      setVariantData([]);
      setPlanDataMap({});
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariantsAndPlans(userType);
  }, [userType, currentPage, itemsPerPage, searchQuery]);

  /* ================= PAGINATION FUNCTIONS ================= */
  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  /* ================= DELETE ================= */
  const handleDelete = (variantId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#273c75',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${baseurl}/subscription/plan-variants/${variantId}/`
          );
          Swal.fire('Deleted!', 'Subscription variant deleted.', 'success');
          fetchVariantsAndPlans(userType); // Refetch data after deletion
        } catch {
          Swal.fire('Error', 'Delete failed', 'error');
        }
      }
    });
  };

  /* ================= HANDLE SEARCH ================= */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  /* ================= HANDLE USER TYPE CHANGE ================= */
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setCurrentPage(1); // Reset to first page when changing user type
  };

  const formatCurrency = (v) =>
    `₹${Number(v || 0).toLocaleString()}`;

  return (
    <>
      <WebsiteNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Subscription Plan Variants</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Plan, Description, Duration or Price"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {/* <span className="search-icon">🔍</span> */}
          </div>

          <div className="d-flex gap-2">
            <select
              className="form-select user-type-select"
              value={userType}
              onChange={handleUserTypeChange}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="client">User</option>
              <option value="agent">Team</option>
            </select>

            <button
              className="primary-btn"
              style={{
                backgroundColor: '#273c75',
                borderColor: '#273c75',
                color: 'white',
              }}
              onClick={() => navigate('/admin-addsubscriptions')}
            >
              Add Subscription
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Plan Name</th>
                <th>Description</th>
                <th>Duration (Days)</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : variantData.length ? (
                variantData.map((variant, index) => {
                  const plan = planDataMap[variant.plan_id] || {};
                  return (
                    <tr key={variant.variant_id}>
                      <td>{startIndex + index}</td>
                      <td>{plan.plan_name || '—'}</td>
                      <td>{plan.description || '—'}</td>
                      <td>{variant.duration_in_days}</td>
                      <td>{formatCurrency(variant.price)}</td>
                      <td className="actions">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              `/admin-edit-subscription/${variant.variant_id}`,
                              { state: { variant } }
                            )
                          }
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(variant.variant_id)
                          }
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No subscription variants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="pagination-container" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderTop: '1px solid #eee',
              backgroundColor: '#f8f9fa'
            }}>
              {/* Items per page selector */}
              <div className="items-per-page" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Show:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  of {totalItems} items
                </span>
              </div>
              
              {/* Page navigation */}
              <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* First Page */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#ccc' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ««
                </button>
                
                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === 1 ? '#f8f9fa' : 'white',
                    color: currentPage === 1 ? '#ccc' : '#333',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  «
                </button>
                
                {/* Page Numbers */}
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: currentPage === page ? '#273c75' : 'white',
                      color: currentPage === page ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: currentPage === page ? 'bold' : 'normal'
                    }}
                  >
                    {page}
                  </button>
                ))}
                
                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#ccc' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  »
                </button>
                
                {/* Last Page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: currentPage === totalPages ? '#f8f9fa' : 'white',
                    color: currentPage === totalPages ? '#ccc' : '#333',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  »»
                </button>
              </div>
              
              {/* Current page info */}
              <div className="page-info" style={{ fontSize: '14px', color: '#666' }}>
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Subscription;