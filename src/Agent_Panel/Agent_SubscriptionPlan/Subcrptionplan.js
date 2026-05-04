


import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl, redirecturl } from "../../BaseURL/BaseURL";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Subcrptionplan.css';
import { useLocation } from 'react-router-dom';

// ✅ Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const AgentSubcrptionplan = () => {
  const [variantData, setVariantData] = useState([]);
  const [planDataMap, setPlanDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [subscribedVariants, setSubscribedVariants] = useState([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', duration: '', final_price: 0 });
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const userId = localStorage.getItem('user_id');
  const paymentVerifiedRef = useRef(false);
  const paymentTimerRef = useRef(null);

  const location = useLocation();

  // ✅ Load Razorpay script on mount
  useEffect(() => {
    const loadScript = async () => {
      const loaded = await loadRazorpayScript();
      setRazorpayLoaded(loaded);
      if (!loaded) {
        console.error('Failed to load Razorpay script');
      }
    };
    loadScript();
  }, []);

  /* ================= FETCH USER SUBSCRIPTION ================= */
  const fetchUserSubscription = async () => {
    try {
      const res = await fetch(`${baseurl}/user-subscriptions/user-id/${userId}/`);

      if (res.ok) {
        const response = await res.json();
        console.log("Subscription API Response:", response);

        let isActive = false;
        let activeVariantIds = [];

        if (response?.results && Array.isArray(response.results)) {
          const activeSubscriptions = response.results.filter(sub =>
            sub.subscription_status === "paid" ||
            sub.subscription_status === "active" ||
            sub.status === "paid" ||
            sub.status === "active"
          );
          isActive = activeSubscriptions.length > 0;
          activeVariantIds = activeSubscriptions.map(sub =>
            Number(sub.subscription_variant || sub.variant_id)
          );
        } else if (
          response &&
          (response.subscription_status === "paid" || response.status === "paid")
        ) {
          isActive = true;
          activeVariantIds = [Number(response.subscription_variant || response.variant_id)];
        } else if (response?.latest_status === "paid") {
          isActive = true;
          activeVariantIds = (response.results || [])
            .filter(sub => sub.subscription_status === "paid")
            .map(sub => Number(sub.subscription_variant));
        }

        setHasActiveSubscription(isActive);
        setSubscribedVariants(activeVariantIds);
      } else {
        setHasActiveSubscription(false);
        setSubscribedVariants([]);
      }
    } catch (err) {
      console.error('Error fetching user subscription:', err);
      setHasActiveSubscription(false);
      setSubscribedVariants([]);
    }
  };

  /* ================= FETCH PLANS ================= */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const variantRes = await fetch(`${baseurl}/subscription/plan-variants/agent/`);
        if (!variantRes.ok) throw new Error(`HTTP error! status: ${variantRes.status}`);

        const variants = await variantRes.json();
        let variantsArray = [];
        if (Array.isArray(variants)) {
          variantsArray = variants;
        } else if (variants?.results && Array.isArray(variants.results)) {
          variantsArray = variants.results;
        } else if (variants?.data && Array.isArray(variants.data)) {
          variantsArray = variants.data;
        }

        setVariantData(variantsArray);

        const planIds = [...new Set(variantsArray.map(v => v.plan_id))];
        const planMap = {};

        await Promise.all(
          planIds.map(async id => {
            try {
              const res = await fetch(`${baseurl}/subscription/plans/${id}/`);
              if (res.ok) {
                const planData = await res.json();
                let plan = planData?.plan_name
                  ? planData
                  : planData?.results?.[0] || planData?.data || {};
                if (plan.plan_name) planMap[id] = plan;
              }
            } catch (err) {
              console.error(`Error fetching plan ${id}`, err);
            }
          })
        );

        setPlanDataMap(planMap);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setVariantData([]);
        setPlanDataMap({});
        Swal.fire('Error', 'Failed to load subscription plans', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
    fetchUserSubscription();
  }, []);

  /* ================= HANDLE RAZORPAY PAYMENT ================= */
  const handleRazorpayPayment = async (razorpayOrderId, amount, razorpayKey, transactionId) => {
    return new Promise((resolve, reject) => {
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: "INR",
        name: "Subscription Plan",
        description: selectedPlan.name,
        order_id: razorpayOrderId,
        handler: async (response) => {
          // ✅ Payment successful - verify on backend
          try {
            const verifyResponse = await fetch(`${baseurl}/subscription/verify-payment/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }),
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyResponse.ok && verifyData.message === "Payment success") {
              resolve(verifyData);
            } else {
              reject(new Error(verifyData.error || "Payment verification failed"));
            }
          } catch (error) {
            reject(error);
          }
        },
        prefill: {
          name: localStorage.getItem('user_name') || '',
          email: localStorage.getItem('user_email') || '',
        },
        theme: {
          color: "#001e3c",
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment cancelled by user"));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  };

  /* ================= INITIATE AND HANDLE PAYMENT ================= */
  const handleBuy = async () => {
    if (hasActiveSubscription) {
      Swal.fire({
        title: 'Already Subscribed',
        text: 'You already have an active subscription.',
        icon: 'info',
        confirmButtonColor: '#001e3c',
      });
      return;
    }

    if (!selectedVariantId) {
      Swal.fire({
        title: 'Select a Plan',
        text: 'Please select a subscription plan first',
        icon: 'warning',
        confirmButtonColor: '#001e3c',
      });
      return;
    }

    if (!razorpayLoaded) {
      Swal.fire({
        title: 'Loading Payment Gateway',
        text: 'Please wait, payment gateway is loading...',
        icon: 'info',
        confirmButtonColor: '#001e3c',
      });
      return;
    }

    setPaymentProcessing(true);

    try {
      // ✅ Step 1: Initiate payment - create Razorpay order
      const response = await fetch(`${baseurl}/subscription/initiate-payment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          user_id: Number(userId),
          variant_id: selectedVariantId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment initiation failed');
      }

      const data = await response.json();
      console.log("Payment initiation response:", data);

      // ✅ Step 2: Open Razorpay checkout
      const paymentResult = await handleRazorpayPayment(
        data.order_id,
        data.amount,
        data.razorpay_key,
        data.transaction_id
      );

      // ✅ Step 3: Payment successful
      console.log("Payment success:", paymentResult);
      
      Swal.fire({
        title: 'Subscription Activated! 🎉',
        html: `
          <div style="text-align: center;">
            <p><strong>${selectedPlan.name}</strong> has been activated.</p>
            <p>Amount Paid: ₹${selectedPlan.final_price}</p>
            <p>Document Number: ${paymentResult.document_number || 'N/A'}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#001e3c',
      }).then(async () => {
        await fetchUserSubscription();
        // Reset selection
        setSelectedVariantId(null);
        setSelectedPlan({ name: '', duration: '', final_price: 0 });
      });

    } catch (err) {
      console.error('Payment error:', err);
      
      // Handle specific error types
      if (err.message === "Payment cancelled by user") {
        Swal.fire({
          title: 'Payment Cancelled',
          text: 'You cancelled the payment. Please try again when ready.',
          icon: 'info',
          confirmButtonColor: '#001e3c',
        });
      } else {
        Swal.fire({
          title: 'Payment Failed',
          text: err.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonColor: '#001e3c',
        });
      }
    } finally {
      setPaymentProcessing(false);
    }
  };

  /* ================= HANDLE SELECTION ================= */
  const handleSelection = (planName, durationText, final_price, variant_id) => {
    if (hasActiveSubscription) {
      Swal.fire({
        title: 'Already Subscribed',
        text: 'You already have an active subscription. Please contact support to change your plan.',
        icon: 'info',
        confirmButtonColor: '#001e3c',
      });
      return;
    }
    setSelectedVariantId(variant_id);
    setSelectedPlan({ name: planName, duration: durationText, final_price: Number(final_price) });
  };

  /* ================= GROUP PLANS ================= */
  const groupedPlans = variantData.reduce((acc, variant) => {
    const plan = planDataMap[variant.plan_id];
    if (!plan) return acc;

    const planKey = variant.plan_id;
    if (!acc[planKey]) {
      acc[planKey] = {
        name: plan.plan_name,
        description: plan.description,
        type: plan.plan_type,
        highlight: plan.plan_name === 'Advanced Plus' ? 'Most Bought' : null,
        options: [],
      };
    }

    acc[planKey].options.push({
      duration: `${variant.duration_in_days} Days`,
      final_price: Number(variant.final_price),
      perMonth: `₹${Math.round(Number(variant.final_price) / (variant.duration_in_days / 30))}/month`,
      variant_id: variant.variant_id,
      isPopular: variant.is_popular || false,
    });

    return acc;
  }, {});

  const plansArray = Object.values(groupedPlans);

  /* ================= RENDER LOADING ================= */
  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="plans-page-container">
          <div className="loader-wrapper">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading subscription plans...</p>
          </div>
        </div>
      </>
    );
  }

  if (!loading && plansArray.length === 0) {
    return (
      <>
        <AgentNavbar />
        <div className="plans-page-container">
          <div className="no-plans-message">
            <h3>No Subscription Plans Available</h3>
            <p>Please check back later or contact support.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />

      <div className="plans-page-container">
        <h2 className="plans-title">Subscription Plans</h2>

        {hasActiveSubscription && (
          <div className="alert alert-success mb-4" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            <strong>Active Subscription:</strong> You have an active subscription.
          </div>
        )}

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
            const gradientClass = gradients[index % gradients.length];

            return (
              <div className="col-12 col-md-6 col-lg-4" key={`${plan.name}-${index}`}>
                <div
                  className={`plan-card ${gradientClass} ${plan.highlight ? 'popular-plan' : ''}`}
                >
                  {plan.highlight && (
                    <div className="popular-badge">{plan.highlight}</div>
                  )}

                  <div className="plan-card-body">
                    <div className="plan-header">
                      <h4>{plan.name}</h4>
                      <span className="plan-type badge bg-light text-dark">{plan.type}</span>
                    </div>

                    <p className="plan-description">{plan.description}</p>

                    <div className="options-list">
                      {plan.options.map(opt => {
                        const isBought = subscribedVariants.includes(opt.variant_id);
                        const isSelected = selectedVariantId === opt.variant_id;

                        return (
                          <label
                            key={opt.variant_id}
                            className={`option-row ${isSelected ? 'selected' : ''} ${isBought ? 'disabled' : ''}`}
                            onClick={() =>
                              !isBought &&
                              !hasActiveSubscription &&
                              handleSelection(
                                plan.name,
                                opt.duration,
                                opt.final_price,
                                opt.variant_id
                              )
                            }
                          >
                            <div className="option-content-wrapper">
                              <div className="option-radio-section">
                                <input
                                  type="radio"
                                  name="subscription-plan"
                                  value={opt.variant_id}
                                  disabled={isBought || hasActiveSubscription}
                                  checked={isSelected}
                                  onChange={() => {}}
                                />
                              </div>

                              <div className="option-details-section">
                                <div className="option-left">
                                  <div className="option-duration">
                                    {opt.duration}
                                    {opt.isPopular && (
                                      <span className="badge bg-warning text-dark ms-2">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <div className="option-permonth">{opt.perMonth}</div>
                                </div>

                                <div className="option-right">
                                  <div className="option-final_price">₹{opt.final_price}</div>
                                  {isBought ? (
                                    <span className="badge bg-success text-white">
                                      <i className="bi bi-check-circle me-1"></i>Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-secondary">Select</span>
                                  )}
                                </div>
                              </div>
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

        {selectedPlan.name && !hasActiveSubscription && (
          <div className="fixed-footer">
            <div>
              <div className="footer-title" style={{ color: 'black' }}>
                <i className="bi bi-cart-check me-2"></i>
                {selectedPlan.name} • {selectedPlan.duration}
              </div>
              <div className="footer-sub">₹{selectedPlan.final_price} (including all taxes)</div>
            </div>

            <div className="footer-right">
              <div className="footer-total-label">Total Amount</div>
              <div className="footer-total">₹{selectedPlan.final_price}</div>
              <button
                className="btn btn-dark buy-btn"
                onClick={handleBuy}
                disabled={paymentProcessing || !razorpayLoaded}
              >
                {paymentProcessing ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-lock-fill me-2"></i>
                    Proceed to Payment →
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentSubcrptionplan;