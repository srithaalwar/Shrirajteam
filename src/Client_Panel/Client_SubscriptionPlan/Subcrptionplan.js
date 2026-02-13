import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl, redirecturl } from "../../BaseURL/BaseURL";
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

  /* ================= FETCH USER SUBSCRIPTION ================= */
  const fetchUserSubscription = async () => {
    try {
      const res = await fetch(
        `${baseurl}/user-subscriptions/user-id/${userId}/`
      );
      if (res.ok) {
        const data = await res.json();
        console.log("Subscription data:", data); // For debugging
        
        // Check if user has any active subscription
        if (data && data.length > 0) {
          const activeSubscription = data.find(sub => 
            sub.latest_status === 'paid' || 
            sub.status === 'paid'
          );
          
          if (activeSubscription && activeSubscription.subscription_variant) {
            setSubscribedVariants([Number(activeSubscription.subscription_variant)]);
          } else {
            setSubscribedVariants([]);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching user subscription:', err);
      setSubscribedVariants([]);
    }
  };

  /* ================= FETCH PLANS ================= */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        
        // 1️⃣ Fetch variants
        const variantRes = await fetch(
          `${baseurl}/subscription/plan-variants/client/`
        );
        
        if (!variantRes.ok) {
          throw new Error(`HTTP error! status: ${variantRes.status}`);
        }
        
        const variants = await variantRes.json();
        
        // Handle different response formats
        let variantsArray = [];
        if (Array.isArray(variants)) {
          variantsArray = variants;
        } else if (variants && variants.results && Array.isArray(variants.results)) {
          variantsArray = variants.results;
        } else if (variants && Array.isArray(variants.data)) {
          variantsArray = variants.data;
        } else {
          console.warn("Unexpected variants format:", variants);
        }
        
        setVariantData(variantsArray);

        // 2️⃣ Collect unique plan IDs
        const planIds = [...new Set(variantsArray.map((v) => v.plan_id))];
        const planMap = {};

        // 3️⃣ Fetch plans for each unique plan ID
        await Promise.all(
          planIds.map(async (id) => {
            try {
              const res = await fetch(
                `${baseurl}/subscription/plans/${id}/`
              );
              
              if (res.ok) {
                const planData = await res.json();
                
                // Handle different response formats
                let plan = {};
                if (planData && planData.plan_name) {
                  plan = planData;
                } else if (planData && planData.results && planData.results[0]) {
                  plan = planData.results[0];
                } else if (planData && planData.data) {
                  plan = planData.data;
                }
                
                if (plan.plan_name) {
                  planMap[id] = plan;
                }
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

  /* ================= HANDLE SELECTION ================= */
  const handleSelection = (
    planName,
    durationText,
    price,
    variant_id
  ) => {
    // Don't allow selection if user already has a subscription
    if (subscribedVariants.length > 0) {
      Swal.fire({
        title: 'Already Subscribed',
        text: 'You already have an active subscription. Please contact support to change your plan.',
        icon: 'info'
      });
      return;
    }
    
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

    const planKey = variant.plan_id;
    
    if (!acc[planKey]) {
      acc[planKey] = {
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

    acc[planKey].options.push({
      duration: `${variant.duration_in_days} Days`,
      price: Number(variant.price),
      perMonth: `₹${Math.round(
        Number(variant.price) /
          (variant.duration_in_days / 30)
      )}/month`,
      variant_id: variant.variant_id,
      isPopular: variant.is_popular || false,
    });

    return acc;
  }, {});

  const plansArray = Object.values(groupedPlans);

  /* ================= HANDLE BUY ================= */
  const handleBuy = async () => {
    // Don't allow buying if already subscribed
    if (subscribedVariants.length > 0) {
      Swal.fire({
        title: 'Already Subscribed',
        text: 'You already have an active subscription.',
        icon: 'info'
      });
      return;
    }
    
    if (!selectedVariantId) {
      Swal.fire({
        title: 'Select a Plan',
        text: 'Please select a subscription plan first',
        icon: 'warning'
      });
      return;
    }

    try {
      const response = await fetch(
        `${baseurl}/subscription/initiate-payment/`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            user_id: Number(userId),
            variant_id: selectedVariantId,
            redirect_url: `${redirecturl}/agent-subscription-plan`,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Payment initiation failed: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.payment_url && data.merchant_order_id) {
        // Store payment information
        localStorage.setItem('merchant_order_id', data.merchant_order_id);
        localStorage.setItem('variant_id', selectedVariantId);
        localStorage.setItem('selected_plan_name', selectedPlan.name);
        localStorage.setItem('selected_plan_price', selectedPlan.price);
        
        // Clear selection
        setSelectedVariantId(null);
        setSelectedPlan({ name: '', duration: '', price: 0 });
        
        // Redirect to payment gateway
        window.location.href = data.payment_url;
      } else {
        throw new Error('Invalid response from payment gateway');
      }
    } catch (err) {
      console.error('Payment error:', err);
      Swal.fire({
        title: 'Error',
        text: err.message || 'Something went wrong. Please try again.',
        icon: 'error'
      });
    }
  };

  /* ================= CONFIRM PAYMENT AFTER REDIRECT ================= */
  useEffect(() => {
    const confirmPayment = async () => {
      const merchant_order_id = localStorage.getItem('merchant_order_id');
      const variant_id = localStorage.getItem('variant_id');
      const planName = localStorage.getItem('selected_plan_name');
      const planPrice = localStorage.getItem('selected_plan_price');

      // Check if we just returned from payment gateway
      if (
        hasPostedStatus.current ||
        !userId ||
        !merchant_order_id ||
        !variant_id
      ) {
        return;
      }

      try {
        hasPostedStatus.current = true;
        
        console.log('Confirming payment for:', {
          userId,
          variant_id,
          merchant_order_id
        });

        const response = await fetch(
          `${baseurl}/subscription/confirm-payment/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              user_id: Number(userId),
              variant_id: Number(variant_id),
              merchant_order_id: merchant_order_id,
            }),
          }
        );

        const result = await response.json();
        
        if (response.ok) {
          // Payment confirmed successfully
          Swal.fire({
            title: 'Success!',
            html: `
              <div style="text-align: center;">
                <p>🎉 Subscription Successful!</p>
                <p><strong>${planName}</strong> has been activated.</p>
                <p>Amount: ₹${planPrice}</p>
              </div>
            `,
            icon: 'success',
            confirmButtonText: 'Continue'
          }).then(() => {
            // Refresh subscription status
            fetchUserSubscription();
            
            // Clear stored payment data
            localStorage.removeItem('merchant_order_id');
            localStorage.removeItem('variant_id');
            localStorage.removeItem('selected_plan_name');
            localStorage.removeItem('selected_plan_price');
          });
        } else {
          // Payment failed
          throw new Error(result.detail || result.message || 'Payment confirmation failed');
        }
        
      } catch (err) {
        console.error('Error confirming payment:', err);
        hasPostedStatus.current = false; // Allow retry
        
        Swal.fire({
          title: 'Payment Issue',
          text: 'There was an issue confirming your payment. Please contact support if the amount was deducted.',
          icon: 'warning'
        });
      }
    };

    // Check URL parameters for payment callback
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');
    
    if (paymentStatus === 'success' || paymentStatus === 'failed') {
      confirmPayment();
    }
    
    // Also run on component mount to handle page refresh after payment
    confirmPayment();
    
  }, [userId]);

  /* ================= REFRESH SUBSCRIPTION STATUS ================= */
  useEffect(() => {
    if (userId) {
      fetchUserSubscription();
    }
  }, [userId]);

  /* ================= RENDER LOADING ================= */
  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="plans-page-container">
          <div className="loader-wrapper">
            <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading subscription plans...</p>
          </div>
        </div>
      </>
    );
  }

  /* ================= RENDER NO PLANS ================= */
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
        <h2 className="plans-title">
          Subscription Plans
        </h2>
        
        {subscribedVariants.length > 0 && (
          <div className="alert alert-success mb-4">
            <i className="bi bi-check-circle-fill me-2"></i>
            You have an active subscription. To upgrade or change plans, please contact support.
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
              <div
                className="col-12 col-md-6 col-lg-4"
                key={`${plan.name}-${index}`}
              >
                <div
                  className={`plan-card ${gradientClass} ${plan.highlight ? 'popular-plan' : ''}`}
                >
                  {plan.highlight && (
                    <div className="popular-badge">
                      {plan.highlight}
                    </div>
                  )}
                  
                  <div className="plan-card-body">
                    <div className="plan-header">
                      <h4>{plan.name}</h4>
                      <span className="plan-type badge bg-light text-dark">
                        {plan.type}
                      </span>
                    </div>

                    <p className="plan-description">
                      {plan.description}
                    </p>

                    <div className="options-list">
                      {plan.options.map((opt) => {
                        const isBought = subscribedVariants.includes(opt.variant_id);
                        const isSelected = selectedVariantId === opt.variant_id;

                        return (
                        <label
  key={opt.variant_id}
  className={`option-row ${isSelected ? 'selected' : ''} ${isBought ? 'disabled' : ''}`}
  onClick={() => !isBought && handleSelection(
    plan.name,
    opt.duration,
    opt.price,
    opt.variant_id
  )}
>
  <div className="option-content-wrapper">
    <div className="option-radio-section">
      <input
        type="radio"
        name="subscription-plan"
        value={opt.variant_id}
        disabled={isBought}
        checked={isSelected}
        onChange={() => {}} // Handled by label onClick
      />
    </div>

    <div className="option-details-section">
      <div className="option-left">
        <div className="option-duration">
          {opt.duration}
          {opt.isPopular && (
            <span className="badge bg-warning text-dark ms-2">Popular</span>
          )}
        </div>
        <div className="option-permonth">
          {opt.perMonth}
        </div>
      </div>

      <div className="option-right">
        <div className="option-price">
          ₹{opt.price}
        </div>
        {isBought ? (
          <span className="badge bg-success">
            <i className="bi bi-check-circle me-1"></i>
            Active
          </span>
        ) : (
          <span className="badge bg-secondary">
            Select
          </span>
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

        {/* Fixed Footer */}
        {selectedPlan.name && subscribedVariants.length === 0 && (
          <div className="fixed-footer">
            <div>
<div className="footer-title" style={{ color: 'black' }}>                <i className="bi bi-cart-check me-2"></i>
                {selectedPlan.name} • {selectedPlan.duration}
              </div>
              <div className="footer-sub">
                ₹{selectedPlan.price} (including all taxes)
              </div>
            </div>

            <div className="footer-right">
              <div className="footer-total-label">
                Total Amount
              </div>
              <div className="footer-total">
                ₹{selectedPlan.price}
              </div>
              <button
                className="btn btn-dark buy-btn"
                onClick={handleBuy}
              >
                <i className="bi bi-lock-fill me-2"></i>
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentSubcrptionplan;