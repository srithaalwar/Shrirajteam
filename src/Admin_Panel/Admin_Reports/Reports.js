import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import './Reports.css'; 

const AdminReportsPage = () => {
  const [properties, setProperties] = useState([]);
  const [soldProperties, setSoldProperties] = useState([]);
  const [bookedProperties, setBookedProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openReportConfigDialog, setOpenReportConfigDialog] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState('monthly');
  const [currentReport, setCurrentReport] = useState('all');
  const [reportData, setReportData] = useState([]);
  const [reportColumns, setReportColumns] = useState([
    { id: 'property_title', label: 'Property Title', checked: true },
    { id: 'city', label: 'City', checked: true },
    { id: 'state', label: 'State', checked: true },
    { id: 'property_value', label: 'Value (₹)', checked: true },
    { id: 'status', label: 'Status', checked: true },
    { id: 'created_at', label: 'Date Added', checked: true },
    { id: 'owner_name', label: 'Owner', checked: false },
    { id: 'owner_contact', label: 'Contact', checked: false },
    { id: 'area', label: 'Area', checked: false },
    { id: 'builtup_area', label: 'Built-up Area', checked: false },
  ]);
  const [userReportColumns, setUserReportColumns] = useState([
    { id: 'username', label: 'Username', checked: true },
    { id: 'email', label: 'Email', checked: true },
    { id: 'first_name', label: 'First Name', checked: true },
    { id: 'last_name', label: 'Last Name', checked: true },
    { id: 'phone_number', label: 'Phone', checked: true },
    { id: 'date_joined', label: 'Date Joined', checked: true },
    { id: 'is_active', label: 'Active', checked: true },
    { id: 'user_type', label: 'User Type', checked: false },
  ]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${baseurl}/property/`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const fetchSoldProperties = async () => {
    try {
      const response = await fetch(`${baseurl}/properties/status/sold/`);
      const data = await response.json();
      setSoldProperties(data);
      return data;
    } catch (error) {
      console.error('Error fetching sold properties:', error);
      return [];
    }
  };

  const fetchBookedProperties = async () => {
    try {
      const response = await fetch(`${baseurl}/properties/status/booked/`);
      const data = await response.json();
      setBookedProperties(data);
      return data;
    } catch (error) {
      console.error('Error fetching booked properties:', error);
      return [];
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseurl}/users/`);
      const data = await response.json();
      setUsers(data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const openReportConfiguration = (reportType) => {
    setCurrentReport(reportType);
    
    if (reportType === 'sold') {
      fetchSoldProperties();
    } else if (reportType === 'booked') {
      fetchBookedProperties();
    } else if (reportType === 'users') {
      fetchUsers();
    }
    
    setOpenReportConfigDialog(true);
  };

  const closeReportConfiguration = () => {
    setOpenReportConfigDialog(false);
  };

  const generateReport = async () => {
    let data = [];
    let filtered = [];

    switch (currentReport) {
      case 'all':
        data = properties;
        break;
      case 'sold':
        data = await fetchSoldProperties();
        break;
      case 'booked':
        data = await fetchBookedProperties();
        break;
      case 'users':
        data = await fetchUsers();
        break;
      default:
        data = properties;
    }

    if (currentReport === 'users') {
      filtered = data.filter(user => {
        const userDate = new Date(user.date_joined || user.created_at);
        return userDate >= startDate && userDate <= endDate;
      });
    } else {
      filtered = data.filter(property => {
        const propertyDate = new Date(property.created_at);
        return propertyDate >= startDate && propertyDate <= endDate;
      });
    }

    if (reportType === 'monthly') {
      const grouped = filtered.reduce((acc, item) => {
        const date = new Date(currentReport === 'users' ? (item.date_joined || item.created_at) : item.created_at);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(item);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([monthYear, items]) => ({
        period: monthYear,
        count: items.length,
        totalValue: currentReport === 'users' ? 0 : items.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: items
      }));

      setReportData(report);
    } else if (reportType === 'yearly') {
      const grouped = filtered.reduce((acc, item) => {
        const date = new Date(currentReport === 'users' ? (item.date_joined || item.created_at) : item.created_at);
        const year = date.getFullYear().toString();
        
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(item);
        return acc;
      }, {});

      const report = Object.entries(grouped).map(([year, items]) => ({
        period: year,
        count: items.length,
        totalValue: currentReport === 'users' ? 0 : items.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: items
      }));

      setReportData(report);
    } else {
      setReportData([{
        period: `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
        count: filtered.length,
        totalValue: currentReport === 'users' ? 0 : filtered.reduce((sum, p) => sum + (p.property_value || 0), 0),
        properties: filtered
      }]);
    }

    setOpenReportConfigDialog(false);
    setOpenReportDialog(true);
  };

  const getCurrentColumns = () => {
    return currentReport === 'users' ? userReportColumns : reportColumns;
  };

  const exportToCSV = () => {
    const activeColumns = getCurrentColumns().filter(col => col.checked).map(col => col.id);
    
    let csv = activeColumns.map(col => 
      getCurrentColumns().find(rc => rc.id === col)?.label || col
    ).join(',') + '\n';
    
    reportData.forEach(group => {
      group.properties.forEach(item => {
        const row = activeColumns.map(col => {
          if (col === 'created_at' || col === 'date_joined') {
            return `"${new Date(item[col] || item.created_at).toLocaleDateString()}"`;
          }
          if (col === 'property_value') {
            return `"${item[col] ? '₹' + item[col].toLocaleString() : '-'}"`;
          }
          if (col === 'is_active') {
            return `"${item[col] ? 'Yes' : 'No'}"`;
          }
          return `"${item[col] || ''}"`;
        }).join(',');
        csv += row + '\n';
      });
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${currentReport}_report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const printReport = () => {
    const reportTitle = `${currentReport.charAt(0).toUpperCase() + currentReport.slice(1)} Report`;
    const allItems = reportData.flatMap(group => group.properties || []);
    
    const printContent = `
      <html>
        <head>
          <title>${reportTitle}</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1 class="text-center mb-4">${reportTitle}</h1>
          
          <div class="card mb-4">
            <div class="card-body">
              <p class="mb-1"><strong>Generated on:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
              <p class="mb-1"><strong>Report Type:</strong> ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}</p>
              <p class="mb-0"><strong>Date Range:</strong> ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Summary</h5>
              <p class="mb-1"><strong>Total ${currentReport === 'users' ? 'Users' : 'Properties'}:</strong> ${allItems.length}</p>
            </div>
          </div>

          ${allItems.length > 0 ? `
          <table class="table table-bordered table-striped">
            <thead class="table-primary">
              <tr>
                <th>S.no</th>
                ${getCurrentColumns().filter(col => col.checked).map(col => `<th>${col.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${allItems.map((item, index) => {
                const row = getCurrentColumns()
                  .filter(col => col.checked)
                  .map(col => {
                    let value = '';
                    if (col.id === 'created_at' || col.id === 'date_joined') {
                      value = new Date(item[col.id] || item.created_at).toLocaleDateString();
                    } else if (col.id === 'property_value') {
                      value = item[col.id] ? `₹${item[col.id].toLocaleString()}` : '-';
                    } else if (col.id === 'is_active') {
                      value = item[col.id] ? 'Yes' : 'No';
                    } else {
                      value = item[col.id] || item[col.label?.toLowerCase().replace(/ /g, '_')] || '-';
                    }
                    return `<td>${value}</td>`;
                  }).join('');
                
                  return `<tr><td>${index + 1}</td>${row}</tr>`;
              }).join('')}
            </tbody>
          </table>
          ` : `
          <div class="alert alert-info text-center">
            <h4>No data available for the selected criteria</h4>
            <p>Please adjust your date range or filters and try again.</p>
          </div>
          `}
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank', 'width=1000,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = function() {
        printWindow.print();
      };
    }
  };

  const getReportTitle = () => {
    const titles = {
      all: 'All Properties Report',
      sold: 'Sold Properties Report',
      booked: 'Booked Properties Report',
      users: 'Users Report'
    };
    return titles[currentReport] || 'Report';
  };

  // Modal Components
  const ReportConfigModal = () => (
    <div className={`modal fade ${openReportConfigDialog ? 'show' : ''}`} 
         style={{ display: openReportConfigDialog ? 'block' : 'none' }} 
         tabIndex="-1" 
         role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{getReportTitle()}</h5>
            <button type="button" className="btn-close" onClick={closeReportConfiguration}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="reportType" className="form-label">Report Type</label>
              <select 
                className="form-select" 
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="form-control"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="form-control"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Select Columns to Include</label>
              <div className="border p-3 rounded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {getCurrentColumns().map((column) => (
                  <div key={column.id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`col-${column.id}`}
                      checked={column.checked}
                      onChange={(e) => {
                        const updatedColumns = getCurrentColumns().map(col => 
                          col.id === column.id ? { ...col, checked: e.target.checked } : col
                        );
                        if (currentReport === 'users') {
                          setUserReportColumns(updatedColumns);
                        } else {
                          setReportColumns(updatedColumns);
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor={`col-${column.id}`}>
                      {column.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeReportConfiguration}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={generateReport}>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportDisplayModal = () => (
    <div className={`modal fade ${openReportDialog ? 'show' : ''}`} 
         style={{ display: openReportDialog ? 'block' : 'none' }} 
         tabIndex="-1" 
         role="dialog">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{getReportTitle()}</h5>
            <button type="button" className="btn-close" onClick={() => setOpenReportDialog(false)}></button>
          </div>
          <div className="modal-body">
            <div className="table-responsive" style={{ maxHeight: '60vh' }}>
              <table className="table table-striped table-bordered">
                <thead className="sticky-top bg-white">
                  <tr>
                    {getCurrentColumns().filter(col => col.checked).map(column => (
                      <th key={column.id} style={{ backgroundColor: '#4A90E2', color: 'white' }}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.flatMap(group => 
                    group.properties.map((item, idx) => (
                      <tr key={`${group.period}-${idx}`}>
                        {getCurrentColumns().filter(col => col.checked).map(column => (
                          <td key={`${item.id}-${column.id}`}>
                            {column.id === 'created_at' || column.id === 'date_joined'
                              ? new Date(item[column.id] || item.created_at).toLocaleDateString()
                              : column.id === 'property_value'
                                ? `₹${item[column.id]?.toLocaleString() || '-'}`
                                : column.id === 'is_active'
                                  ? item[column.id] ? 'Yes' : 'No'
                                  : item[column.id] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setOpenReportDialog(false)}>
              Close
            </button>
            <button type="button" className="btn btn-info" onClick={printReport}>
              <i className="bi bi-printer"></i> Print
            </button>
            <button type="button" className="btn btn-success" onClick={exportToCSV}>
              <i className="bi bi-file-text"></i> CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h4 fw-bold">Reports</h1>
        </div>

        {/* Report Cards */}
        <div className="row mb-4 g-3">
          <div className="col-12 col-sm-6 col-md-3">
            <div 
              className="card h-100 report-card"
              onClick={() => openReportConfiguration('all')}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <div className="card-body text-center py-4">
                <i className="bi bi-file-text" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                <h6 className="card-title mt-3">All Properties Report</h6>
                <p className="card-text text-muted small">
                  Generate comprehensive report for all properties
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div 
              className="card h-100 report-card"
              onClick={() => openReportConfiguration('sold')}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <div className="card-body text-center py-4">
                <i className="bi bi-tag" style={{ fontSize: '3rem', color: '#198754' }}></i>
                <h6 className="card-title mt-3">Sold Properties Report</h6>
                <p className="card-text text-muted small">
                  Report for properties marked as sold
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div 
              className="card h-100 report-card"
              onClick={() => openReportConfiguration('booked')}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <div className="card-body text-center py-4">
                <i className="bi bi-book" style={{ fontSize: '3rem', color: '#ffc107' }}></i>
                <h6 className="card-title mt-3">Booked Properties Report</h6>
                <p className="card-text text-muted small">
                  Report for properties that are booked
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <div 
              className="card h-100 report-card"
              onClick={() => openReportConfiguration('users')}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <div className="card-body text-center py-4">
                <i className="bi bi-people" style={{ fontSize: '3rem', color: '#0dcaf0' }}></i>
                <h6 className="card-title mt-3">Users Report</h6>
                <p className="card-text text-muted small">
                  Generate report for all registered users
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm text-center">
          <h6 className="text-muted mb-2">Property Reports Dashboard</h6>
          <p className="text-muted mb-0">
            Generate comprehensive reports for properties and users with various filters and export options.
          </p>
        </div>

        {/* Modals */}
        {openReportConfigDialog && <ReportConfigModal />}
        {openReportDialog && <ReportDisplayModal />}
        
        {/* Modal Backdrops */}
        {openReportConfigDialog && <div className="modal-backdrop fade show"></div>}
        {openReportDialog && <div className="modal-backdrop fade show"></div>}
      </div>
    </>
  );
};

export default AdminReportsPage;