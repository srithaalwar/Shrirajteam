// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MyTeam.css"; // custom css
// import { baseurl } from "../../BaseURL/BaseURL";



// function MyTeam() {
//   const [currentAgent, setCurrentAgent] = useState(null);
//   const [childAgents, setChildAgents] = useState([]);
//   const [historyStack, setHistoryStack] = useState([]);

//   const referralId = localStorage.getItem("referral_id");
//   const agentName = localStorage.getItem("agent_name");

//   const scrollRef = useRef(null);

//   useEffect(() => {
//     if (referralId) {
//       loadChildren(referralId);
//       setCurrentAgent({
//         referral_id: referralId,
//         first_name: agentName || "You",
//       });
//     }
//   }, [referralId]);

//   /* ================= API ================= */

//   const fetchAgentWithChildren = async (refId) => {
//     try {
//       const response = await axios.get(
//         `${baseurl}/users/search/?referred_by=${refId}`
//       );

//       return response.data.results || [];
//     } catch (error) {
//       console.error("API Error:", error);
//       return [];
//     }
//   };

//   const loadChildren = async (refId) => {
//     const data = await fetchAgentWithChildren(refId);
//     setChildAgents(data);
//   };

//   /* ================= HANDLERS ================= */

//   const handleAgentClick = async (agent) => {
//     setHistoryStack((prev) => [
//       ...prev,
//       { agent: currentAgent, children: childAgents },
//     ]);

//     setCurrentAgent(agent);
//     const children = await fetchAgentWithChildren(agent.referral_id);
//     setChildAgents(children);
//   };

//   const handleBack = () => {
//     if (!historyStack.length) return;

//     const last = historyStack[historyStack.length - 1];
//     setCurrentAgent(last.agent);
//     setChildAgents(last.children);
//     setHistoryStack((prev) => prev.slice(0, -1));
//   };

//   /* ================= SCROLL ================= */

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
//   };

//   /* ================= RENDER ================= */

//   const renderMembers = () => (
//     <div className="team-scroll-wrapper position-relative">
//       {childAgents.length > 5 && (
//         <button className="scroll-btn left" onClick={scrollLeft}>
//           ‹
//         </button>
//       )}

//       <div className="team-scroll" ref={scrollRef}>
//         {childAgents.map((member) => (
//           <div
//             key={member.user_id}
//             className="team-member text-center"
//             onClick={() => handleAgentClick(member)}
//           >
//             <div className="avatar-circle">
//               {member.first_name?.charAt(0)?.toUpperCase()}
//             </div>

//             <div className="fw-bold mt-2 text-truncate">
//               {member.first_name}
//             </div>
//             <small className="text-muted">{member.referral_id}</small>
//           </div>
//         ))}
//       </div>

//       {childAgents.length > 5 && (
//         <button className="scroll-btn right" onClick={scrollRight}>
//           ›
//         </button>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <AgentNavbar />

//       <div className="container-fluid bg-white min-vh-100 py-4">
//         {historyStack.length > 0 && (
//           <button className="btn btn-outline-primary mb-3" onClick={handleBack}>
//             ← Back to {historyStack.at(-1)?.agent?.first_name || "Previous"}
//           </button>
//         )}

//         {/* Current Agent */}
//         <div className="text-center mb-4">
//           <div className="avatar-circle main mx-auto">
//             {currentAgent?.first_name?.charAt(0)?.toUpperCase()}
//           </div>
//           <h5 className="mt-2 fw-bold">{currentAgent?.first_name}</h5>
//           <small className="text-muted">
//             {currentAgent?.referral_id}
//           </small>
//           <div className="text-primary mt-1">
//             Direct Team: {childAgents.length}
//           </div>
//         </div>

//         {/* Children */}
//         {childAgents.length > 0 ? (
//           renderMembers()
//         ) : (
//           <div className="text-center text-muted mt-4">
//             No direct members found
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default MyTeam;





// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MyTeam.css";
// import AgentNavbar from "../Agent_Navbar/Agent_Navbar";

// function MyTeam() {
//   const [currentAgent, setCurrentAgent] = useState(null);
//   const [childAgents, setChildAgents] = useState([]);
//   const [historyStack, setHistoryStack] = useState([]);

//   const referralId = localStorage.getItem("referral_id");
//   const agentName = localStorage.getItem("agent_name");

//   const scrollRef = useRef(null);

//   /* ================= INITIAL LOAD ================= */

//   useEffect(() => {
//     if (referralId) {
//       setCurrentAgent({
//         referral_id: referralId,
//         first_name: agentName || "You",
//       });
//       loadChildren(referralId);
//     }
//   }, [referralId]);

//   /* ================= API ================= */

//   const fetchAgentWithChildren = async (refId) => {
//     try {
//       const res = await axios.get(
//         `${baseurl}/users/search/?referred_by=${refId}`
//       );
//       return res.data.results || [];
//     } catch (error) {
//       console.error("API Error:", error);
//       return [];
//     }
//   };

//   const loadChildren = async (refId) => {
//     const data = await fetchAgentWithChildren(refId);
//     setChildAgents(data);
//   };

//   /* ================= HANDLERS ================= */

//   const handleAgentClick = async (agent) => {
//     setHistoryStack((prev) => [
//       ...prev,
//       { agent: currentAgent, children: childAgents },
//     ]);

//     setCurrentAgent(agent);
//     const children = await fetchAgentWithChildren(agent.referral_id);
//     setChildAgents(children);
//   };

//   const handleBack = () => {
//     if (!historyStack.length) return;

//     const last = historyStack[historyStack.length - 1];
//     setCurrentAgent(last.agent);
//     setChildAgents(last.children);
//     setHistoryStack((prev) => prev.slice(0, -1));
//   };

//   /* ================= SCROLL ================= */

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
//   };

//   /* ================= RENDER CHILDREN ================= */

//   const renderMembers = () => (
//     <div className="team-wrapper position-relative">
//       {childAgents.length > 5 && (
//         <button className="scroll-btn left" onClick={scrollLeft}>
//           ‹
//         </button>
//       )}

//       <div className="team-scroll" ref={scrollRef}>
//         {childAgents.map((member) => (
//           <div
//             key={member.user_id}
//             className="team-member text-center"
//             onClick={() => handleAgentClick(member)}
//           >
//             <div className="child-line"></div>

//             <div className="avatar-circle">
//               {member.first_name?.charAt(0)?.toUpperCase()}
//             </div>

//             <div className="fw-bold mt-2 text-truncate">
//               {member.first_name}
//             </div>
//             <small className="text-muted">{member.referral_id}</small>
//           </div>
//         ))}
//       </div>

//       {childAgents.length > 5 && (
//         <button className="scroll-btn right" onClick={scrollRight}>
//           ›
//         </button>
//       )}
//     </div>
//   );

//   /* ================= JSX ================= */

//   return (
//     <>
//       <AgentNavbar />

//       <div className="container-fluid bg-white min-vh-100 py-4">
//         {historyStack.length > 0 && (
//           <button className="btn btn-outline-primary mb-3" onClick={handleBack}>
//             ← Back to {historyStack.at(-1)?.agent?.first_name || "Previous"}
//           </button>
//         )}

//         {/* CURRENT AGENT */}
//         <div className="text-center ">
//           <div className="avatar-circle main mx-auto">
//             {currentAgent?.first_name?.charAt(0)?.toUpperCase()}
//           </div>
//           <h5 className="mt-2 fw-bold">{currentAgent?.first_name}</h5>
//           <small className="text-muted">
//             {currentAgent?.referral_id}
//           </small>
//           <div className="text-primary mt-1">
//             Direct Team: {childAgents.length}
//           </div>
//         </div>

//         {/* CONNECTOR LINES */}
//         {childAgents.length > 0 && (
//           <>
//             <div className="parent-line"></div>
//             <div className="horizontal-line"></div>
//           </>
//         )}

//         {/* CHILDREN */}
//         {childAgents.length > 0 ? (
//           renderMembers()
//         ) : (
//           <div className="text-center text-muted mt-4">
//             No direct members found
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default MyTeam;



// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { baseurl } from '../../BaseURL/BaseURL';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MyTeam.css";
// import AgentNavbar from "../Agent_Navbar/Agent_Navbar";

// function MyTeam() {
//   const [currentAgent, setCurrentAgent] = useState(null);
//   const [childAgents, setChildAgents] = useState([]);
//   const [filteredAgents, setFilteredAgents] = useState([]);
//   const [historyStack, setHistoryStack] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const referralId = localStorage.getItem("referral_id");
//   const agentName = localStorage.getItem("agent_name");

//   const scrollRef = useRef(null);

//   /* ================= INITIAL LOAD ================= */

//   useEffect(() => {
//     if (referralId) {
//       setCurrentAgent({
//         referral_id: referralId,
//         first_name: agentName || "You",
//       });
//       loadChildren(referralId);
//     }
//   }, [referralId]);

//   /* ================= FILTER EFFECT ================= */

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredAgents(childAgents);
//     } else {
//       const query = searchQuery.toLowerCase().trim();
//       const filtered = childAgents.filter(
//         (agent) =>
//           agent.first_name?.toLowerCase().includes(query) ||
//           agent.referral_id?.toLowerCase().includes(query)
//       );
//       setFilteredAgents(filtered);
//     }
//   }, [searchQuery, childAgents]);

//   /* ================= API ================= */

//   const fetchAgentWithChildren = async (refId) => {
//     try {
//       const res = await axios.get(
//         `${baseurl}/users/search/?referred_by=${refId}`
//       );
//       return res.data.results || [];
//     } catch (error) {
//       console.error("API Error:", error);
//       return [];
//     }
//   };

//   const loadChildren = async (refId) => {
//     const data = await fetchAgentWithChildren(refId);
//     setChildAgents(data);
//     setFilteredAgents(data);
//     setSearchQuery(""); // Clear search when navigating
//   };

//   /* ================= HANDLERS ================= */

//   const handleAgentClick = async (agent) => {
//     setHistoryStack((prev) => [
//       ...prev,
//       { agent: currentAgent, children: childAgents },
//     ]);

//     setCurrentAgent(agent);
//     const children = await fetchAgentWithChildren(agent.referral_id);
//     setChildAgents(children);
//     setFilteredAgents(children);
//     setSearchQuery(""); // Clear search when navigating
//   };

//   const handleBack = () => {
//     if (!historyStack.length) return;

//     const last = historyStack[historyStack.length - 1];
//     setCurrentAgent(last.agent);
//     setChildAgents(last.children);
//     setFilteredAgents(last.children);
//     setHistoryStack((prev) => prev.slice(0, -1));
//     setSearchQuery(""); // Clear search when going back
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//   };

//   /* ================= SCROLL ================= */

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
//   };

//   /* ================= RENDER CHILDREN ================= */

//   const renderMembers = () => {
//     const agentsToRender = filteredAgents;

//     if (agentsToRender.length === 0 && searchQuery) {
//       return (
//         <div className="text-center text-muted mt-4">
//           No members found matching "{searchQuery}"
//         </div>
//       );
//     }

//     return (
//       <div className="team-wrapper position-relative">
//         {agentsToRender.length > 5 && (
//           <button className="scroll-btn left" onClick={scrollLeft}>
//             ‹
//           </button>
//         )}

//         <div className="team-scroll" ref={scrollRef}>
//           {agentsToRender.map((member) => (
//             <div
//               key={member.user_id}
//               className="team-member text-center"
//               onClick={() => handleAgentClick(member)}
//             >
//               <div className="child-line"></div>

//               <div className="avatar-circle">
//                 {member.first_name?.charAt(0)?.toUpperCase()}
//               </div>

//               <div className="fw-bold mt-2 text-truncate">
//                 {member.first_name}
//               </div>
//               <small className="text-muted">{member.referral_id}</small>
//             </div>
//           ))}
//         </div>

//         {agentsToRender.length > 5 && (
//           <button className="scroll-btn right" onClick={scrollRight}>
//             ›
//           </button>
//         )}
//       </div>
//     );
//   };

//   /* ================= JSX ================= */

//   return (
//     <>
//       <AgentNavbar />

//       <div className="container-fluid bg-white min-vh-100 py-4">
//         {/* Navigation and Search Row */}
//         <div className="d-flex align-items-center mb-3">
//           {historyStack.length > 0 && (
//             <button className="btn btn-outline-primary me-3" onClick={handleBack}>
//               ← Back to {historyStack.at(-1)?.agent?.first_name || "Previous"}
//             </button>
//           )}
          
//           {/* Search Bar */}
//           <div className="flex-grow-1 position-relative">
//             <div className="input-group">
//               <span className="input-group-text bg-white border-end-0">
//                 <i className="bi bi-search text-muted"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control border-start-0"
//                 placeholder="Search by name or referral ID..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//               {searchQuery && (
//                 <button
//                   className="btn btn-outline-secondary"
//                   type="button"
//                   onClick={clearSearch}
//                 >
//                   <i className="bi bi-x"></i>
//                 </button>
//               )}
//             </div>
            
//             {/* Search Results Count */}
//             {searchQuery && (
//               <div className="mt-2 text-muted small">
//                 Found {filteredAgents.length} of {childAgents.length} members
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CURRENT AGENT */}
//         <div className="text-center ">
//           <div className="avatar-circle main mx-auto">
//             {currentAgent?.first_name?.charAt(0)?.toUpperCase()}
//           </div>
//           <h5 className="mt-2 fw-bold">{currentAgent?.first_name}</h5>
//           <small className="text-muted">
//             {currentAgent?.referral_id}
//           </small>
//           <div className="text-primary mt-1">
//             Direct Team: {currentAgent?.direct_team}

//           </div>
//            <div className="text-primary mt-1">
//             Total Team: {currentAgent?.total_team}

//           </div>
//         </div>

//         {/* CONNECTOR LINES */}
//         {filteredAgents.length > 0 && (
//           <>
//             <div className="parent-line"></div>
//             <div className="horizontal-line"></div>
//           </>
//         )}

//         {/* CHILDREN */}
//         {childAgents.length > 0 ? (
//           renderMembers()
//         ) : (
//           <div className="text-center text-muted mt-4">
//             No direct members found
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default MyTeam;



import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { baseurl } from '../../BaseURL/BaseURL';
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyTeam.css";
import AgentNavbar from "../Agent_Navbar/Agent_Navbar";

function MyTeam() {
  const [currentAgent, setCurrentAgent] = useState(null);
  const [childAgents, setChildAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userId = localStorage.getItem("user_id"); // Get user_id from localStorage
  const referralId = localStorage.getItem("referral_id");
  const agentName = localStorage.getItem("agent_name");

  const scrollRef = useRef(null);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    if (userId) {
      loadCurrentUserDetails(userId);
    } else if (referralId) {
      // Fallback: search by referral_id if user_id not available
      loadCurrentAgentByReferral(referralId);
    }
  }, [userId, referralId]);

  /* ================= FILTER EFFECT ================= */

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAgents(childAgents);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = childAgents.filter(
        (agent) =>
          agent.first_name?.toLowerCase().includes(query) ||
          agent.referral_id?.toLowerCase().includes(query)
      );
      setFilteredAgents(filtered);
    }
  }, [searchQuery, childAgents]);

  /* ================= API ================= */

  // Fetch current user by user_id (using the users/ endpoint)
  const fetchCurrentUserById = async (id) => {
    try {
      const res = await axios.get(`${baseurl}/users/${id}/`);
      return {
        user_id: res.data.user_id,
        referral_id: res.data.referral_id,
        first_name: res.data.first_name,
        direct_team: res.data.direct_team,
        total_team: res.data.total_team,
        level_no: res.data.level_no,
        level_wise_counts: res.data.level_wise_counts
      };
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  };

  // Fetch current user by referral_id (fallback method)
  const fetchCurrentAgentByReferral = async (refId) => {
    try {
      const res = await axios.get(
        `${baseurl}/users/search/?referral_id=${refId}`
      );
      if (res.data.results && res.data.results.length > 0) {
        const userData = res.data.results[0];
        return {
          user_id: userData.user_id,
          referral_id: userData.referral_id,
          first_name: userData.first_name,
          direct_team: userData.direct_team,
          total_team: userData.total_team,
          level_no: userData.level_no
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching user by referral:", error);
      return null;
    }
  };

  const fetchAgentWithChildren = async (refId) => {
    try {
      const res = await axios.get(
        `${baseurl}/users/search/?referred_by=${refId}`
      );
      // Fetch complete details for each child including their team counts
      const childrenWithDetails = await Promise.all(
        (res.data.results || []).map(async (child) => {
          try {
            const childDetails = await axios.get(`${baseurl}/users/${child.user_id}/`);
            return {
              ...child,
              direct_team: childDetails.data.direct_team,
              total_team: childDetails.data.total_team
            };
          } catch (error) {
            return child;
          }
        })
      );
      return childrenWithDetails;
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  };

  const loadCurrentUserDetails = async (id) => {
    const userDetails = await fetchCurrentUserById(id);
    if (userDetails) {
      setCurrentAgent(userDetails);
      await loadChildren(userDetails.referral_id);
    } else if (referralId) {
      loadCurrentAgentByReferral(referralId);
    }
  };

  const loadCurrentAgentByReferral = async (refId) => {
    const agentDetails = await fetchCurrentAgentByReferral(refId);
    if (agentDetails) {
      setCurrentAgent(agentDetails);
      await loadChildren(refId);
    } else {
      // Fallback to basic info if API fails
      setCurrentAgent({
        referral_id: refId,
        first_name: agentName || "You",
        direct_team: 0,
        total_team: 0
      });
      await loadChildren(refId);
    }
  };

  const loadChildren = async (refId) => {
    const data = await fetchAgentWithChildren(refId);
    setChildAgents(data);
    setFilteredAgents(data);
    setSearchQuery(""); // Clear search when navigating
  };

  /* ================= HANDLERS ================= */

  const handleAgentClick = async (agent) => {
    setHistoryStack((prev) => [
      ...prev,
      { agent: currentAgent, children: childAgents },
    ]);

    // Fetch complete details for the clicked agent using their user_id
    const completeAgentDetails = await fetchCurrentUserById(agent.user_id);
    setCurrentAgent(completeAgentDetails || agent);
    
    const children = await fetchAgentWithChildren(agent.referral_id);
    setChildAgents(children);
    setFilteredAgents(children);
    setSearchQuery(""); // Clear search when navigating
  };

  const handleBack = () => {
    if (!historyStack.length) return;

    const last = historyStack[historyStack.length - 1];
    setCurrentAgent(last.agent);
    setChildAgents(last.children);
    setFilteredAgents(last.children);
    setHistoryStack((prev) => prev.slice(0, -1));
    setSearchQuery(""); // Clear search when going back
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  /* ================= SCROLL ================= */

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  /* ================= RENDER CHILDREN ================= */

  const renderMembers = () => {
    const agentsToRender = filteredAgents;

    if (agentsToRender.length === 0 && searchQuery) {
      return (
        <div className="text-center text-muted mt-4">
          No members found matching "{searchQuery}"
        </div>
      );
    }

    return (
      <div className="team-wrapper position-relative">
        {agentsToRender.length > 5 && (
          <button className="scroll-btn left" onClick={scrollLeft}>
            ‹
          </button>
        )}

        <div className="team-scroll" ref={scrollRef}>
          {agentsToRender.map((member) => (
            <div
              key={member.user_id}
              className="team-member text-center"
              onClick={() => handleAgentClick(member)}
            >
              <div className="child-line"></div>

              <div className="avatar-circle">
                {member.first_name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="fw-bold mt-2 text-truncate">
                {member.first_name}
              </div>
              <small className="text-muted">{member.referral_id}</small>
              {/* Optional: Show child's team counts on hover or as tooltip */}
              <div className="small text-primary mt-1">
                <small>DT: {member.direct_team || 0} | TT: {member.total_team || 0}</small>
              </div>
            </div>
          ))}
        </div>

        {agentsToRender.length > 5 && (
          <button className="scroll-btn right" onClick={scrollRight}>
            ›
          </button>
        )}
      </div>
    );
  };

  /* ================= JSX ================= */

  return (
    <>
      <AgentNavbar />

      <div className="container-fluid bg-white min-vh-100 py-4">
        {/* Navigation and Search Row */}
        <div className="d-flex align-items-center mb-3">
          {historyStack.length > 0 && (
            <button className="btn btn-outline-primary me-3 mobile-view-team" onClick={handleBack}>
              ← Back to {historyStack.at(-1)?.agent?.first_name || "Previous"}
            </button>
          )}
          
          {/* Search Bar */}
          <div className="flex-grow-1 position-relative">
            <div className="input-group">
            
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by name or referral ID..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={clearSearch}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
            
            {/* Search Results Count */}
            {searchQuery && (
              <div className="mt-2 text-muted small">
                Found {filteredAgents.length} of {childAgents.length} members
              </div>
            )}
          </div>
        </div>

        {/* CURRENT AGENT */}
        {currentAgent && (
          <div className="text-center">
            <div className="avatar-circle main mx-auto">
              {currentAgent?.first_name?.charAt(0)?.toUpperCase()}
            </div>
            <h5 className="mt-2 fw-bold">{currentAgent?.first_name}</h5>
            <small className="text-muted">
              {currentAgent?.referral_id}
            </small>
            <div className="text-primary mt-1">
              <strong>Direct Team:</strong> {currentAgent?.direct_team || 0}
            </div>
            <div className="text-primary mt-1">
              <strong>Total Team:</strong> {currentAgent?.total_team || 0}
            </div>
          </div>
        )}

        {/* CONNECTOR LINES */}
        {filteredAgents.length > 0 && (
          <>
            <div className="parent-line"></div>
            <div className="horizontal-line"></div>
          </>
        )}

        {/* CHILDREN */}
        {childAgents.length > 0 ? (
          renderMembers()
        ) : (
          <div className="text-center text-muted mt-4">
            No direct members found
          </div>
        )}
      </div>
    </>
  );
}

export default MyTeam;