// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './AddSubscription.css';

// function AddSubscription() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     plan_name: '',
//     price: '',
//     duration_in_days: '',
//     description: '',
//   });

//   const [planOptions, setPlanOptions] = useState([]);
//   const [allPlans, setAllPlans] = useState([]);

//   const [openModal, setOpenModal] = useState(false);
//   const [newPlan, setNewPlan] = useState({
//     plan_name: '',
//     description: '',
//     user_type: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'duration_in_days' && isNaN(value)) return;

//     if (name === 'plan_name') {
//       const selected = allPlans.find((p) => p.plan_name === value);
//       setFormData({
//         ...formData,
//         plan_name: value,
//         description: selected?.description || '',
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const fetchPlans = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/subscription/plans/`);
//       const plans = response.data;
//       setPlanOptions(plans);
//       setAllPlans(plans);
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const selectedPlan = allPlans.find(
//         (plan) => plan.plan_name === formData.plan_name
//       );

//       if (!selectedPlan) {
//         await Swal.fire({
//           icon: 'warning',
//           title: 'Plan Not Found',
//           text: 'Selected plan not found.',
//         });
//         return;
//       }

//       const payload = {
//         plan_id: selectedPlan.plan_id,
//         duration_in_days: Number(formData.duration_in_days),
//         price: Number(formData.price),
//       };

//       await axios.post(
//         `${baseurl}/subscription/plan-variants/`,
//         payload,
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       await Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Plan variant added successfully!',
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setFormData({
//         plan_name: '',
//         price: '',
//         duration_in_days: '',
//         description: '',
//       });

//       navigate('/a-subscriptions');
//     } catch (error) {
//       console.error('Error adding plan variant:', error);
//       await Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to add plan variant. Please try again.',
//       });
//     }
//   };

//   const handleNewPlanChange = (e) => {
//     const { name, value } = e.target;
//     setNewPlan({ ...newPlan, [name]: value });
//   };

//   const handleAddPlan = async () => {
//     try {
//       const payload = {
//         plan_name: newPlan.plan_name,
//         description: newPlan.description,
//         user_type: newPlan.user_type,
//       };

//       await axios.post(
//         `${baseurl}/subscription/plans/`,
//         payload,
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       setNewPlan({ plan_name: '', description: '', user_type: '' });
//       setOpenModal(false);
//       fetchPlans();

//       setTimeout(() => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Plan added successfully!',
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }, 300);
//     } catch (error) {
//       console.error('Error adding plan:', error);
//       await Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text:
//           error?.response?.data?.message ||
//           'Failed to add plan. Please check all fields.',
//       });
//     }
//   };

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="container add-subscription-container">
//         <h2 className="add-subscription-title">
//           Add Subscription Plan Variant
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="row g-3">
//             {/* Plan Selection */}
//             <div className="col-12 col-md-4">
//               <label className="form-label">Plan</label>
//               <div className="d-flex gap-2">
//                 <select
//                   className="form-select"
//                   name="plan_name"
//                   value={formData.plan_name}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Plan</option>
//                   {planOptions.map((plan) => (
//                     <option key={plan.plan_id} value={plan.plan_name}>
//                       {`${plan.plan_name} (${
//                         plan.user_type === 'agent' ? 'Team' : 'User'
//                       })`}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   type="button"
//                   className="btn add-plan-btn"
                  
//                       style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}
//                   onClick={() => setOpenModal(true)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="col-12 col-md-4">
//               <label className="form-label">Price</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Duration */}
//             <div className="col-12 col-md-4">
//               <label className="form-label">Duration (in days)</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="duration_in_days"
//                 value={formData.duration_in_days}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className="col-12">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 rows="2"
//                 name="description"
//                 value={formData.description}
//                 readOnly
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//            <div className="col-12">
//   <div className="d-flex justify-content-center gap-3">
//     <button
//       type="button"
//       className="btn btn-outline-secondary cancel-btn"
//       onClick={() => navigate(-1)}
//     >
//       Cancel
//     </button>

//     <button
//       type="submit"
//       className="btn btn-success submit-btn"
//     >
//       Add Subscription Plan Variant
//     </button>
//   </div>
// </div>

//           </div>
//         </form>
//       </div>

//       {/* Add Plan Modal */}
//       {openModal && (
//         <div className="custom-modal-backdrop">
//           <div className="custom-modal">
//             <h5 className="modal-title text-center mb-3">
//               New Subscription Plan
//             </h5>

//             <div className="mb-3">
//               <label className="form-label">User Type</label>
//               <select
//                 className="form-select"
//                 name="user_type"
//                 value={newPlan.user_type}
//                 onChange={handleNewPlanChange}
//                 required
//               >
//                 <option value="">Select User Type</option>
//                 <option value="agent">Team</option>
//                 <option value="client">User</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Plan Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="plan_name"
//                 value={newPlan.plan_name}
//                 onChange={handleNewPlanChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 rows="3"
//                 name="description"
//                 value={newPlan.description}
//                 onChange={handleNewPlanChange}
//                 required
//               />
//             </div>

//             <div className="d-flex justify-content-end gap-2">
//               <button
//                 className="btn btn-outline-secondary"
//                 onClick={() => setOpenModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn "
                
//                       style={{
//     backgroundColor: '#273c75',
//     borderColor: '#273c75',
//     color: 'white'
//   }}
//                 onClick={handleAddPlan}
//               >
//                 Add Plan
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default AddSubscription;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddSubscription.css';

function AddSubscription() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    plan_name: '',
    price: '',
    duration_in_days: '',
    description: '',
  });

  const [planOptions, setPlanOptions] = useState([]);
  const [allPlans, setAllPlans] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    plan_name: '',
    description: '',
    user_type: '',
  });

  /* ================= HANDLE FORM CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'duration_in_days' && isNaN(value)) return;

    if (name === 'plan_name') {
      const selected = allPlans.find((p) => p.plan_name === value);
      setFormData({
        ...formData,
        plan_name: value,
        description: selected?.description || '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ================= FETCH PLANS (FIXED) ================= */
  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/subscription/plans/`
      );

      // ✅ FIX: handle paginated + non-paginated responses
      const plans = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setPlanOptions(plans);
      setAllPlans(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlanOptions([]);
      setAllPlans([]);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= SUBMIT VARIANT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedPlan = allPlans.find(
        (plan) => plan.plan_name === formData.plan_name
      );

      if (!selectedPlan) {
        await Swal.fire({
          icon: 'warning',
          title: 'Plan Not Found',
          text: 'Selected plan not found.',
        });
        return;
      }

      const payload = {
        plan_id: selectedPlan.plan_id,
        duration_in_days: Number(formData.duration_in_days),
        price: Number(formData.price),
      };

      await axios.post(
        `${baseurl}/subscription/plan-variants/`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Plan variant added successfully!',
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        plan_name: '',
        price: '',
        duration_in_days: '',
        description: '',
      });

      navigate('/admin-subscriptions');
    } catch (error) {
      console.error('Error adding plan variant:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add plan variant. Please try again.',
      });
    }
  };

  /* ================= NEW PLAN CHANGE ================= */
  const handleNewPlanChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
  };

  /* ================= ADD NEW PLAN ================= */
  const handleAddPlan = async () => {
    try {
      const payload = {
        plan_name: newPlan.plan_name,
        description: newPlan.description,
        user_type: newPlan.user_type,
      };

      await axios.post(
        `${baseurl}/subscription/plans/`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setNewPlan({
        plan_name: '',
        description: '',
        user_type: '',
      });

      setOpenModal(false);
      fetchPlans(); // refresh dropdown

      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Plan added successfully!',
          timer: 2000,
          showConfirmButton: false,
        });
      }, 300);
    } catch (error) {
      console.error('Error adding plan:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error?.response?.data?.message ||
          'Failed to add plan. Please check all fields.',
      });
    }
  };

  return (
    <>
      <WebsiteNavbar />

      <div className="container add-subscription-container">
        <h2 className="add-subscription-title">
          Add Subscription Plan Variant
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Plan Selection */}
            <div className="col-12 col-md-4">
              <label className="form-label">Plan</label>
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  name="plan_name"
                  value={formData.plan_name}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Plan</option>

                  {planOptions.map((plan) => (
                    <option
                      key={plan.plan_id}
                      value={plan.plan_name}
                    >
                      {`${plan.plan_name} (${
                        plan.user_type === 'agent'
                          ? 'Team'
                          : 'User'
                      })`}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn add-plan-btn"
                  style={{
                    backgroundColor: '#273c75',
                    borderColor: '#273c75',
                    color: 'white',
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="col-12 col-md-4">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Duration */}
            <div className="col-12 col-md-4">
              <label className="form-label">
                Duration (in days)
              </label>
              <input
                type="number"
                className="form-control"
                name="duration_in_days"
                value={formData.duration_in_days}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                rows="2"
                name="description"
                value={formData.description}
                readOnly
                required
              />
            </div>

            {/* Buttons */}
            <div className="col-12">
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary cancel-btn"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-success submit-btn"
                >
                  Add Subscription Plan Variant
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Add Plan Modal */}
      {openModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <h5 className="modal-title text-center mb-3">
              New Subscription Plan
            </h5>

            <div className="mb-3">
              <label className="form-label">
                User Type
              </label>
              <select
                className="form-select"
                name="user_type"
                value={newPlan.user_type}
                onChange={handleNewPlanChange}
                required
              >
                <option value="">
                  Select User Type
                </option>
                <option value="agent">Team</option>
                <option value="client">User</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Plan Name
              </label>
              <input
                type="text"
                className="form-control"
                name="plan_name"
                value={newPlan.plan_name}
                onChange={handleNewPlanChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={newPlan.description}
                onChange={handleNewPlanChange}
                required
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn"
                style={{
                  backgroundColor: '#273c75',
                  borderColor: '#273c75',
                  color: 'white',
                }}
                onClick={handleAddPlan}
              >
                Add Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddSubscription;
