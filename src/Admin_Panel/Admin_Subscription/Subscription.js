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
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  /* ================= FETCH ================= */
  const fetchVariantsAndPlans = async (type) => {
    setLoading(true);
    try {
      // 1️⃣ Fetch variants (FIX: handle paginated + non-paginated)
      const variantRes = await axios.get(
        `${baseurl}/subscription/plan-variants/${type}/`
      );

      const variants = Array.isArray(variantRes.data)
        ? variantRes.data
        : variantRes.data?.results || [];

      setVariantData(variants);

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

            // FIX: handle paginated OR direct object
            const plan =
              res.data?.results?.[0] || res.data;

            plansMap[id] = plan;
          } catch (err) {
            console.error(`Error fetching plan with ID ${id}`, err);
          }
        })
      );

      setPlanDataMap(plansMap);
      setPage(1);
    } catch (error) {
      console.error('Error fetching variant data:', error);
      setVariantData([]);
      setPlanDataMap({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariantsAndPlans(userType);
  }, [userType]);

  /* ================= SEARCH ================= */
  const safeToString = (v) =>
    v !== null && v !== undefined ? v.toString() : '';

  const filteredData = variantData.filter((variant) => {
    const plan = planDataMap[variant.plan_id] || {};
    const q = searchQuery.toLowerCase();

    return (
      safeToString(variant.variant_id).includes(q) ||
      safeToString(plan.plan_name).toLowerCase().includes(q) ||
      safeToString(plan.description).toLowerCase().includes(q) ||
      safeToString(variant.duration_in_days).includes(q) ||
      safeToString(variant.price).includes(q)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getSerialNumber = (index) =>
    (page - 1) * itemsPerPage + index + 1;

  /* ================= DELETE ================= */
  const handleDelete = (variantId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${baseurl}/subscription/plan-variants/${variantId}/`
          );
          Swal.fire('Deleted!', 'Subscription variant deleted.', 'success');
          fetchVariantsAndPlans(userType);
        } catch {
          Swal.fire('Error', 'Delete failed', 'error');
        }
      }
    });
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="d-flex gap-2">
            <select
              className="form-select user-type-select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
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
              ) : paginatedData.length ? (
                paginatedData.map((variant, index) => {
                  const plan = planDataMap[variant.plan_id] || {};
                  return (
                    <tr key={variant.variant_id}>
                      <td>{getSerialNumber(index)}</td>
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
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    page === i + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Subscription;
