import React, { useState } from 'react';
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import ReferralPrefix from './ReferralPrefix';
import { useNavigate } from 'react-router-dom';
import './SettingsMain.css';

function SettingsMain() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('referral');

  return (
    <>
      <AdminNavbar />
      <div className="settings-container">
        <div className="container">
          {/* Breadcrumb */}
          {/* <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Settings</li>
            </ol>
          </nav> */}

          <div className="card ">
            {/* <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Settings</h3>
            </div> */}
            
              {/* Tabs Navigation */}
              {/* <ul className="nav nav-tabs" id="settingsTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'referral' ? 'active' : ''}`}
                    id="referral-tab"
                    onClick={() => setActiveTab('referral')}
                    type="button"
                    role="tab"
                  >
                    Referral Prefix
                  </button>
                </li>
              </ul> */}

              {/* Tab Content */}
              <div className="tab-content" id="settingsTabContent">
                <div
                  className={`tab-pane fade ${activeTab === 'referral' ? 'show active' : ''}`}
                  id="referral"
                  role="tabpanel"
                >
                  <ReferralPrefix />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsMain;
