// import React, { useEffect, useState, useRef } from 'react';
// import Swal from 'sweetalert2';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Subcrptionplan.css';

// const AgentSubcrptionplan = () => {
//   const [variantData, setVariantData] = useState([]);
//   const [planDataMap, setPlanDataMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [subscribedVariants, setSubscribedVariants] = useState([]);
//   const [selectedVariantId, setSelectedVariantId] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState({
//     name: '',
//     duration: '',
//     price: 0,
//   });

//   const userId = localStorage.getItem('user_id');
//   const hasPostedStatus = useRef(false);
//  const redirecturl = "http://localhost:3000";

//   /* ================= FETCH USER SUBSCRIPTION ================= */
//   const fetchUserSubscription = async () => {
//     try {
//       const res = await fetch(
//         `${baseurl}/user-subscriptions/user-id/${userId}/`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         if (
//           data[0]?.latest_status === 'paid' &&
//           data[1]?.subscription_variant
//         ) {
//           setSubscribedVariants([
//             Number(data[1].subscription_variant),
//           ]);
//         }
//       }
//     } catch (err) {
//       console.error('Error fetching user subscription:', err);
//     }
//   };

//   /* ================= FETCH PLANS ================= */
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const variantRes = await fetch(
//           `${baseurl}/subscription/plan-variants/agent/`
//         );
//         const variants = await variantRes.json();
//         setVariantData(variants);

//         const planIds = [...new Set(variants.map((v) => v.plan_id))];
//         const planMap = {};

//         await Promise.all(
//           planIds.map(async (id) => {
//             const res = await fetch(
//               `${baseurl}/subscription/plans/${id}/`
//             );
//             const plan = await res.json();
//             planMap[id] = plan;
//           })
//         );

//         setPlanDataMap(planMap);
//       } catch (err) {
//         console.error('Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//     fetchUserSubscription();
//   }, []);

//   /* ================= HANDLE SELECTION ================= */
//   const handleSelection = (
//     planName,
//     durationText,
//     price,
//     variant_id
//   ) => {
//     setSelectedVariantId(variant_id);
//     setSelectedPlan({
//       name: planName,
//       duration: durationText,
//       price,
//     });
//   };

//   /* ================= GROUP PLANS ================= */
//   const groupedPlans = variantData.reduce((acc, variant) => {
//     const plan = planDataMap[variant.plan_id];
//     if (!plan) return acc;

//     if (!acc[variant.plan_id]) {
//       acc[variant.plan_id] = {
//         name: plan.plan_name,
//         description: plan.description,
//         type: plan.plan_type,
//         highlight:
//           plan.plan_name === 'Advanced Plus'
//             ? 'Most Bought'
//             : null,
//         options: [],
//       };
//     }

//     acc[variant.plan_id].options.push({
//       duration: `${variant.duration_in_days} Days`,
//       price: variant.price,
//       perMonth: `₹${Math.round(
//         variant.price / (variant.duration_in_days / 30)
//       )}/month`,
//       variant_id: variant.variant_id,
//     });

//     return acc;
//   }, {});

//   const plansArray = Object.values(groupedPlans);

//   /* ================= BUY ================= */
//   const handleBuy = async () => {
//     if (!selectedVariantId) {
//       Swal.fire('Select a plan first', '', 'warning');
//       return;
//     }

//     try {
//       const res = await fetch(
//         `${baseurl}/subscription/initiate-payment/`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             user_id: Number(userId),
//             variant_id: selectedVariantId,
//             redirect_url: `${redirecturl}/p-plans`,
//           }),
//         }
//       );

//       const data = await res.json();
//       localStorage.setItem(
//         'merchant_order_id',
//         data.merchant_order_id
//       );
//       localStorage.setItem(
//         'variant_id',
//         selectedVariantId
//       );
//       window.location.href = data.payment_url;
//     } catch (err) {
//       Swal.fire('Error', 'Something went wrong', 'error');
//     }
//   };

//   /* ================= CONFIRM PAYMENT ================= */
//   useEffect(() => {
//     const userId = localStorage.getItem('user_id');
//     const merchant_order_id =
//       localStorage.getItem('merchant_order_id');
//     const variant_id =
//       localStorage.getItem('variant_id');

//     const updatePaymentStatus = async () => {
//       if (
//         hasPostedStatus.current ||
//         !userId ||
//         !merchant_order_id ||
//         !variant_id
//       )
//         return;

//       try {
//         hasPostedStatus.current = true;

//         await fetch(
//           `${baseurl}/subscription/confirm-payment/`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               user_id: Number(userId),
//               variant_id: Number(variant_id),
//               merchant_order_id,
//             }),
//           }
//         );

//         localStorage.removeItem('merchant_order_id');
//         localStorage.removeItem('variant_id');

//         fetchUserSubscription();
//       } catch (err) {
//         console.error(
//           'Error sending payment status:',
//           err
//         );
//         hasPostedStatus.current = false;
//       }
//     };

//     updatePaymentStatus();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchUserSubscription();
//     }
//   }, [userId]);

//   return (
//     <>
//       <AgentNavbar />

//       <div className="plans-page-container">
//         <h2 className="plans-title">
//           Subscription Plans
//         </h2>

//         {loading ? (
//           <div className="loader-wrapper">
//             <div className="spinner-border text-primary" />
//           </div>
//         ) : (
//           <div className="row g-4">
//             {plansArray.map((plan, index) => {
//               const gradients = [
//                 'gradient-blue',
//                 'gradient-purple',
//                 'gradient-orange',
//                 'gradient-green',
//                 'gradient-peach',
//                 'gradient-sky',
//               ];

//               const gradientClass =
//                 gradients[index % gradients.length];

//               return (
//                 <div
//                   className="col-12 col-md-6 col-lg-4"
//                   key={plan.name}
//                 >
//                   <div
//                     className={`plan-card ${gradientClass}`}
//                   >
//                     <div className="plan-card-body">
//                       <div className="plan-header">
//                         <h4>{plan.name}</h4>
//                         <span className="plan-type">
//                           {plan.type}
//                         </span>
//                       </div>

//                       {plan.highlight && (
//                         <span className="badge bg-warning text-dark mb-2">
//                           {plan.highlight}
//                         </span>
//                       )}

//                       <p className="plan-description">
//                         {plan.description}
//                       </p>

//                       <div className="options-list">
//                         {plan.options.map((opt) => {
//                           const isBought =
//                             subscribedVariants.includes(
//                               opt.variant_id
//                             );

//                           return (
//                             <label
//                               key={opt.variant_id}
//                               className={`option-row ${
//                                 selectedVariantId ===
//                                 opt.variant_id
//                                   ? 'selected'
//                                   : ''
//                               } ${
//                                 isBought
//                                   ? 'disabled'
//                                   : ''
//                               }`}
//                             >
//                               <input
//                                 type="radio"
//                                 name={`plan-${plan.name}`}
//                                 value={opt.variant_id}
//                                 disabled={
//                                   !!subscribedVariants.length
//                                 }
//                                 checked={
//                                   selectedVariantId ===
//                                   opt.variant_id
//                                 }
//                                 onChange={() =>
//                                   !subscribedVariants.length &&
//                                   handleSelection(
//                                     plan.name,
//                                     opt.duration,
//                                     opt.price,
//                                     opt.variant_id
//                                   )
//                                 }
//                               />

//                               <div className="option-left">
//                                 <div className="option-duration">
//                                   {opt.duration}
//                                 </div>
//                                 <div className="option-permonth">
//                                   {opt.perMonth}
//                                 </div>
//                               </div>

//                               <div className="option-right">
//                                 <div className="option-price">
//                                   ₹{opt.price}
//                                 </div>
//                                 {isBought && (
//                                   <span className="badge bg-success">
//                                     Bought
//                                   </span>
//                                 )}
//                               </div>
//                             </label>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Fixed Footer */}
//         {selectedPlan.name && (
//           <div className="fixed-footer">
//             <div>
//               <div className="footer-title">
//                 {selectedPlan.name} •{' '}
//                 {selectedPlan.duration}
//               </div>
//               <div className="footer-sub">
//                 ₹{selectedPlan.price} incl tax
//               </div>
//             </div>

//             <div className="footer-right">
//               <div className="footer-total-label">
//                 Total
//               </div>
//               <div className="footer-total">
//                 ₹{selectedPlan.price}
//               </div>
//               <button
//                 className="btn btn-dark buy-btn"
//                 onClick={handleBuy}
//               >
//                 Buy Now →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AgentSubcrptionplan;





import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Subcrptionplan.css';

const AgentSubcrptionplan = () => {
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscribedVariants, setSubscribedVariants] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState({
    name: '',
    duration: '',
    price: 0,
  });

  const userId = localStorage.getItem('user_id');
  const hasPostedStatus = useRef(false);
  const redirecturl = "http://localhost:3000";

  /* ================= NORMALIZERS ================= */
  const normalizeList = (data) =>
    Array.isArray(data) ? data : data?.results || [];

  const normalizeObject = (data) =>
    data?.results?.[0] || data;

  /* ================= FETCH USER SUBSCRIPTION ================= */
  const fetchUserSubscription = async () => {
    try {
      const res = await fetch(
        `${baseurl}/user-subscriptions/user-id/${userId}/`
      );
      if (res.ok) {
        const data = await res.json();
        if (
          data[0]?.latest_status === 'paid' &&
          data[1]?.subscription_variant
        ) {
          setSubscribedVariants([
            Number(data[1].subscription_variant),
          ]);
        }
      }
    } catch (err) {
      console.error('Error fetching user subscription:', err);
    }
  };

  /* ================= FETCH PLANS ================= */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // 1️⃣ Fetch variants (FIXED)
        const variantRes = await fetch(
          `${baseurl}/subscription/plan-variants/agent/`
        );
        const variantJson = await variantRes.json();

        const variants = normalizeList(variantJson);
        setVariantData(variants);

        // 2️⃣ Collect unique plan IDs
        const planIds = [...new Set(variants.map((v) => v.plan_id))];
        const planMap = {};

        // 3️⃣ Fetch plans safely (FIXED)
        await Promise.all(
          planIds.map(async (id) => {
            try {
              const res = await fetch(
                `${baseurl}/subscription/plans/${id}/`
              );
              const planJson = await res.json();

              const plan = normalizeObject(planJson);
              planMap[id] = plan;
            } catch (err) {
              console.error(`Error fetching plan ${id}`, err);
            }
          })
        );

        setPlanDataMap(planMap);
      } catch (err) {
        console.error('Error:', err);
        setVariantData([]);
        setPlanDataMap({});
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
    fetchUserSubscription();
  }, []);

  /* ================= HANDLE SELECTION ================= */
  const handleSelection = (
    planName,
    durationText,
    price,
    variant_id
  ) => {
    setSelectedVariantId(variant_id);
    setSelectedPlan({
      name: planName,
      duration: durationText,
      price: Number(price),
    });
  };

  /* ================= GROUP PLANS ================= */
  const groupedPlans = variantData.reduce((acc, variant) => {
    const plan = planDataMap[variant.plan_id];
    if (!plan) return acc;

    if (!acc[variant.plan_id]) {
      acc[variant.plan_id] = {
        name: plan.plan_name,
        description: plan.description,
        type: plan.plan_type,
        highlight:
          plan.plan_name === 'Advanced Plus'
            ? 'Most Bought'
            : null,
        options: [],
      };
    }

    acc[variant.plan_id].options.push({
      duration: `${variant.duration_in_days} Days`,
      price: Number(variant.price),
      perMonth: `₹${Math.round(
        Number(variant.price) /
          (variant.duration_in_days / 30)
      )}/month`,
      variant_id: variant.variant_id,
    });

    return acc;
  }, {});

  const plansArray = Object.values(groupedPlans);

  /* ================= BUY ================= */
  const handleBuy = async () => {
    if (!selectedVariantId) {
      Swal.fire('Select a plan first', '', 'warning');
      return;
    }

    try {
      const res = await fetch(
        `${baseurl}/subscription/initiate-payment/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: Number(userId),
            variant_id: selectedVariantId,
            redirect_url: `${redirecturl}/p-plans`,
          }),
        }
      );

      const data = await res.json();
      localStorage.setItem(
        'merchant_order_id',
        data.merchant_order_id
      );
      localStorage.setItem(
        'variant_id',
        selectedVariantId
      );
      window.location.href = data.payment_url;
    } catch (err) {
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  /* ================= CONFIRM PAYMENT ================= */
  useEffect(() => {
    const merchant_order_id =
      localStorage.getItem('merchant_order_id');
    const variant_id =
      localStorage.getItem('variant_id');

    const updatePaymentStatus = async () => {
      if (
        hasPostedStatus.current ||
        !userId ||
        !merchant_order_id ||
        !variant_id
      )
        return;

      try {
        hasPostedStatus.current = true;

        await fetch(
          `${baseurl}/subscription/confirm-payment/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: Number(userId),
              variant_id: Number(variant_id),
              merchant_order_id,
            }),
          }
        );

        localStorage.removeItem('merchant_order_id');
        localStorage.removeItem('variant_id');

        fetchUserSubscription();
      } catch (err) {
        console.error(
          'Error sending payment status:',
          err
        );
        hasPostedStatus.current = false;
      }
    };

    updatePaymentStatus();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserSubscription();
    }
  }, [userId]);

  return (
    <>
      <AgentNavbar />

      <div className="plans-page-container">
        <h2 className="plans-title">
          Subscription Plans
        </h2>

        {loading ? (
          <div className="loader-wrapper">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <div className="row g-4">
            {plansArray.map((plan, index) => {
              const gradients = [
                'gradient-blue',
                'gradient-purple',
                'gradient-orange',
                'gradient-green',
                'gradient-peach',
                'gradient-sky',
              ];

              const gradientClass =
                gradients[index % gradients.length];

              return (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={plan.name}
                >
                  <div
                    className={`plan-card ${gradientClass}`}
                  >
                    <div className="plan-card-body">
                      <div className="plan-header">
                        <h4>{plan.name}</h4>
                        <span className="plan-type">
                          {plan.type}
                        </span>
                      </div>

                      {plan.highlight && (
                        <span className="badge bg-warning text-dark mb-2">
                          {plan.highlight}
                        </span>
                      )}

                      <p className="plan-description">
                        {plan.description}
                      </p>

                      <div className="options-list">
                        {plan.options.map((opt) => {
                          const isBought =
                            subscribedVariants.includes(
                              opt.variant_id
                            );

                          return (
                            <label
                              key={opt.variant_id}
                              className={`option-row ${
                                selectedVariantId ===
                                opt.variant_id
                                  ? 'selected'
                                  : ''
                              } ${
                                isBought
                                  ? 'disabled'
                                  : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name={`plan-${plan.name}`}
                                value={opt.variant_id}
                                disabled={
                                  !!subscribedVariants.length
                                }
                                checked={
                                  selectedVariantId ===
                                  opt.variant_id
                                }
                                onChange={() =>
                                  !subscribedVariants.length &&
                                  handleSelection(
                                    plan.name,
                                    opt.duration,
                                    opt.price,
                                    opt.variant_id
                                  )
                                }
                              />

                              <div className="option-left">
                                <div className="option-duration">
                                  {opt.duration}
                                </div>
                                <div className="option-permonth">
                                  {opt.perMonth}
                                </div>
                              </div>

                              <div className="option-right">
                                <div className="option-price">
                                  ₹{opt.price}
                                </div>
                                {isBought && (
                                  <span className="badge bg-success">
                                    Bought
                                  </span>
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Fixed Footer */}
        {selectedPlan.name && (
          <div className="fixed-footer">
            <div>
              <div className="footer-title">
                {selectedPlan.name} •{' '}
                {selectedPlan.duration}
              </div>
              <div className="footer-sub">
                ₹{selectedPlan.price} incl tax
              </div>
            </div>

            <div className="footer-right">
              <div className="footer-total-label">
                Total
              </div>
              <div className="footer-total">
                ₹{selectedPlan.price}
              </div>
              <button
                className="btn btn-dark buy-btn"
                onClick={handleBuy}
              >
                Buy Now →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentSubcrptionplan;
