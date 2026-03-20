import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from '../../BaseURL/BaseURL';
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyTeam.css";

// Import appropriate navbar based on user role
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";

function MyTeam() {
  const navigate = useNavigate();
  const [currentAgent, setCurrentAgent] = useState(null);
  const [childAgents, setChildAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState("");

  const referralId = localStorage.getItem("referral_id");
  const agentName = localStorage.getItem("agent_name");

  const scrollRef = useRef(null);

  /* ================= GET USER ROLE ================= */
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          // Decode token or fetch user info to get role
          const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
          setUserRole(userInfo.role || "agent");
        }
      } catch (error) {
        console.error("Error getting user role:", error);
        setUserRole("agent");
      }
    };
    getUserRole();
  }, []);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    if (referralId) {
      setCurrentAgent({
        referral_id: referralId,
        first_name: agentName || "You",
      });
      loadChildren(referralId);
    }
  }, [referralId]);

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
  const fetchAgentWithChildren = async (refId) => {
    try {
      const res = await axios.get(
        `${baseurl}/users/search/?referred_by=${refId}`
      );
      return res.data.results || [];
    } catch (error) {
      console.error("API Error:", error);
      return [];
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

    setCurrentAgent(agent);
    const children = await fetchAgentWithChildren(agent.referral_id);
    setChildAgents(children);
    setFilteredAgents(children);
    setSearchQuery(""); // Clear search when navigating
  };

  const handleBack = () => {
    if (historyStack.length > 0) {
      const last = historyStack[historyStack.length - 1];
      setCurrentAgent(last.agent);
      setChildAgents(last.children);
      setFilteredAgents(last.children);
      setHistoryStack((prev) => prev.slice(0, -1));
      setSearchQuery(""); // Clear search when going back
    }
  };

  const handleBackToReport = () => {
    // Navigate back to referral report
    navigate("/referral-reports");
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

    if (agentsToRender.length === 0) {
      return (
        <div className="text-center text-muted mt-4">
          No direct members found
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
                {member.first_name} {member.last_name || ''}
              </div>
              <small className="text-muted">{member.referral_id}</small>
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
      {/* Render appropriate navbar based on user role */}
 <AdminNavbar />
      <div className="container-fluid bg-white min-vh-100 py-4">
        {/* Navigation and Search Row - Back button on left, Search on right */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Back Buttons - Left Side */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Back to Report Button - Always visible */}
            <button 
              className="btn btn-secondary" 
              onClick={handleBackToReport}
              style={{ 
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                border: 'none'
              }}
            >
              ← Back to Report
            </button>
            
            {/* Back in Hierarchy Button - Only visible when there's history */}
            {historyStack.length > 0 && (
              <button 
                className="btn btn-outline-primary" 
                onClick={handleBack}
                style={{ 
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                ← Back to {historyStack.at(-1)?.agent?.first_name || "Previous"}
              </button>
            )}
          </div>
          
          {/* Search Bar - Right Side */}
          <div style={{ width: '300px' }}>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or referral ID..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  padding: '8px 35px 8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              />
              <span style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999'
              }}>
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  style={{
                    position: 'absolute',
                    right: '35px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#999',
                    fontSize: '16px',
                    padding: '0'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Search Results Count */}
            {searchQuery && (
              <div className="mt-2 text-muted small text-end">
                Found {filteredAgents.length} of {childAgents.length} members
              </div>
            )}
          </div>
        </div>

        {/* CURRENT AGENT */}
        <div className="text-center mt-4">
          <div className="avatar-circle main mx-auto">
            {currentAgent?.first_name?.charAt(0)?.toUpperCase()}
          </div>
          <h5 className="mt-2 fw-bold">{currentAgent?.first_name}</h5>
          <small className="text-muted">
            {currentAgent?.referral_id}
          </small>
          <div className="text-primary mt-1">
            Direct Team: {childAgents.length}
          </div>
        </div>

        {/* CONNECTOR LINES - Only show if there are children */}
        {childAgents.length > 0 && (
          <>
            <div className="parent-line"></div>
            <div className="horizontal-line"></div>
          </>
        )}

        {/* CHILDREN */}
        {renderMembers()}
      </div>
    </>
  );
}

export default MyTeam;