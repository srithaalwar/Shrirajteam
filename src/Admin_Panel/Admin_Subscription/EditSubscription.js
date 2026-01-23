// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { baseurl } from '../../BaseURL/BaseURL';
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './EditSubscription.css';

// const EditSubscription = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [loading, setLoading] = useState(false);
//   const [plansLoading, setPlansLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const [plans, setPlans] = useState([]);
//   const [currentPlan, setCurrentPlan] = useState(null);

//   // Get variant from navigation state
//   const { variant } = location.state || {};

//   const [formData, setFormData] = useState({
//     plan_id: '',
//     duration_in_days: '',
//     price: '',
//     description: '',
//   });

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await fetch(`${baseurl}/subscription/plans/`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch plans');
//         }
//         const data = await response.json();
//         setPlans(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setPlansLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   useEffect(() => {
//     if (variant && plans.length > 0) {
//       const foundPlan = plans.find(
//         (plan) => plan.plan_id === variant.plan_id
//       );

//       if (foundPlan) {
//         setCurrentPlan(foundPlan);
//         setFormData({
//           plan_id: variant.plan_id,
//           duration_in_days: variant.duration_in_days,
//           price: variant.price.toString(),
//           description: foundPlan.description || '',
//         });
//       }
//     }
//   }, [variant, plans]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'plan_id') {
//       const selectedPlan = plans.find(
//         (plan) => plan.plan_id === Number(value)
//       );
//       setCurrentPlan(selectedPlan);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//         description: selectedPlan?.description || '',
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const variantPayload = {
//         plan_id: Number(formData.plan_id),
//         duration_in_days: Number(formData.duration_in_days),
//         price: parseFloat(formData.price),
//       };

//       const variantResponse = await fetch(
//         `${baseurl}/subscription/plan-variants/${id}/`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(variantPayload),
//         }
//       );

//       if (!variantResponse.ok) {
//         const errorData = await variantResponse.json();
//         throw new Error(
//           errorData.message || 'Failed to update subscription variant'
//         );
//       }

//       // Update plan description if changed
//       if (
//         currentPlan &&
//         formData.description !== currentPlan.description
//       ) {
//         const planPayload = {
//           plan_name: currentPlan.plan_name,
//           description: formData.description,
//           user_type: currentPlan.user_type,
//         };

//         const planResponse = await fetch(
//           `${baseurl}/subscription/plans/${formData.plan_id}/`,
//           {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(planPayload),
//           }
//         );

//         if (!planResponse.ok) {
//           const errorData = await planResponse.json();
//           throw new Error(
//             errorData.message || 'Failed to update plan description'
//           );
//         }
//       }

//       setSuccess(true);
//       setTimeout(() => {
//         navigate('/admin-subscriptions');
//       }, 2000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!variant) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="container mt-4">
//           <div className="alert alert-danger">
//             No variant data found. Please go back and try again.
//           </div>
//           <button
//             className="btn btn-secondary"
//             onClick={() => navigate(-1)}
//           >
//             Go Back
//           </button>
//         </div>
//       </>
//     );
//   }

//   if (plansLoading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="loader-wrapper">
//           <div className="spinner-border text-primary" />
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="container edit-subscription-container">
//         <div className="card shadow-sm p-4">
//           <h2 className="edit-title text-center">
//             Edit Subscription Plan Variant
//           </h2>

//           <p className="text-muted variant-id">
//             Variant ID: {id}
//           </p>

//           {error && (
//             <div className="alert alert-danger mb-3">
//               {error}
//             </div>
//           )}

//           {success && (
//             <div className="alert alert-success mb-3">
//               Subscription updated successfully! Redirecting...
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             {/* Plan */}
//             <div className="mb-3">
//               <label className="form-label">Plan</label>
//               <select
//                 className="form-select"
//                 name="plan_id"
//                 value={formData.plan_id}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Plan</option>
//                 {plans.map((plan) => (
//                   <option key={plan.plan_id} value={plan.plan_id}>
//                     {plan.plan_name} ({plan.user_type})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Duration */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Duration (in days)
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="duration_in_days"
//                 value={formData.duration_in_days}
//                 onChange={handleChange}
//                 min="1"
//                 required
//               />
//             </div>

//             {/* Price */}
//             <div className="mb-3">
//               <label className="form-label">Price</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className="mb-3">
//               <label className="form-label">
//                 Description
//               </label>
//               <textarea
//                 className="form-control"
//                 rows="4"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Actions */}
//             <div className="form-actions">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => navigate(-1)}
//                 disabled={loading}
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <span className="spinner-border spinner-border-sm me-2" />
//                 ) : null}
//                 Update Subscription
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditSubscription;





import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { baseurl } from '../../BaseURL/BaseURL';
import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditSubscription.css';

const EditSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [plans, setPlans] = useState([]); // always array
  const [currentPlan, setCurrentPlan] = useState(null);

  // Get variant from navigation state
  const { variant } = location.state || {};

  const [formData, setFormData] = useState({
    plan_id: '',
    duration_in_days: '',
    price: '',
    description: '',
  });

  /* ================= FETCH PLANS (FIXED) ================= */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${baseurl}/subscription/plans/`);
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }

        const data = await response.json();

        // normalize to array
        const plansArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : data
          ? [data]
          : [];

        setPlans(plansArray);
      } catch (err) {
        setError(err.message);
        setPlans([]);
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  /* ================= INIT FORM ================= */
  useEffect(() => {
    if (variant && plans.length > 0) {
      const foundPlan = plans.find(
        (plan) => plan.plan_id === variant.plan_id
      );

      if (foundPlan) {
        setCurrentPlan(foundPlan);
        setFormData({
          plan_id: variant.plan_id,
          duration_in_days: variant.duration_in_days,
          price: variant.price.toString(),
          description: foundPlan.description || '',
        });
      }
    }
  }, [variant, plans]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'plan_id') {
      const selectedPlan = plans.find(
        (plan) => plan.plan_id === Number(value)
      );

      setCurrentPlan(selectedPlan || null);

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        description: selectedPlan?.description || '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const variantPayload = {
        plan_id: Number(formData.plan_id),
        duration_in_days: Number(formData.duration_in_days),
        price: parseFloat(formData.price),
      };

      const variantResponse = await fetch(
        `${baseurl}/subscription/plan-variants/${id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(variantPayload),
        }
      );

      if (!variantResponse.ok) {
        const errorData = await variantResponse.json();
        throw new Error(
          errorData.message || 'Failed to update subscription variant'
        );
      }

      // Update plan description if changed
      if (
        currentPlan &&
        formData.description !== currentPlan.description
      ) {
        const planPayload = {
          plan_name: currentPlan.plan_name,
          description: formData.description,
          user_type: currentPlan.user_type,
        };

        const planResponse = await fetch(
          `${baseurl}/subscription/plans/${formData.plan_id}/`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(planPayload),
          }
        );

        if (!planResponse.ok) {
          const errorData = await planResponse.json();
          throw new Error(
            errorData.message || 'Failed to update plan description'
          );
        }
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin-subscriptions');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= GUARDS ================= */
  if (!variant) {
    return (
      <>
        <WebsiteNavbar />
        <div className="container mt-4">
          <div className="alert alert-danger">
            No variant data found. Please go back and try again.
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  if (plansLoading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="loader-wrapper">
          <div className="spinner-border text-primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />

      <div className="container edit-subscription-container">
        <div className="card shadow-sm p-4">
          <h2 className="edit-title text-center">
            Edit Subscription Plan Variant
          </h2>

          <p className="text-muted variant-id">
            Variant ID: {id}
          </p>

          {error && (
            <div className="alert alert-danger mb-3">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success mb-3">
              Subscription updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Plan */}
            <div className="mb-3">
              <label className="form-label">Plan</label>
              <select
                className="form-select"
                name="plan_id"
                value={formData.plan_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Plan</option>
                {Array.isArray(plans) &&
                  plans.map((plan) => (
                    <option
                      key={plan.plan_id}
                      value={plan.plan_id}
                    >
                      {plan.plan_name} ({plan.user_type})
                    </option>
                  ))}
              </select>
            </div>

            {/* Duration + Price in One Row */}
            <div className="row mb-3">
              {/* Duration */}
              <div className="col-md-6">
                <label className="form-label">
                  Duration (in days)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="duration_in_days"
                  value={formData.duration_in_days}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              {/* Price */}
              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn "
                    style={{
                  backgroundColor: '#273c75',
                  borderColor: '#273c75',
                  color: 'white',
                }}

                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" />
                ) : null}
                Update Subscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSubscription;
