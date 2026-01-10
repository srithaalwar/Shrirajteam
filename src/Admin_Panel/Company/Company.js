// import React, { useEffect, useState } from "react";
// // import "./CommonTable.css";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";



// const Company = () => {
//   const [companies, setCompanies] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//      fetch(`${baseurl}/phonenumbers/`)
//       .then((res) => res.json())
//       .then((data) => setCompanies(data.results || []))
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredCompanies = companies.filter((item) =>
//     `${item.name} ${item.phone_number}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//      <>
//     <WebsiteNavbar />
//     <div className="page-container">
//       {/* Header */}
//       <div className="page-header">
//         <h2>Company</h2>
//         <span className="welcome-text">Welcome back, Admin User</span>
//       </div>

//       {/* Toolbar */}
//       <div className="page-toolbar">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search by name or phone"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <span className="search-icon">🔍</span>
//         </div>

//         <button className="primary-btn">+ Add Company</button>
//       </div>

//       {/* Table */}
//       <div className="table-card">
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>NAME</th>
//               <th>PHONE NUMBER</th>
//               <th>CREATED AT</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredCompanies.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{index + 1}</td>
//                 <td className="name-cell">{item.name}</td>
//                 <td>{item.phone_number}</td>
//                 <td>{item.created_at}</td>
//                 <td className="actions">
//                   <button className="edit-btn">✏️</button>
//                   <button className="delete-btn">🗑️</button>
//                 </td>
//               </tr>
//             ))}

//             {filteredCompanies.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="no-data">
//                   No companies found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Company;




import React, { useEffect, useState } from "react";
import "./Company.css";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${baseurl}/phonenumbers/`)
      .then((res) => res.json())
      .then((data) => setCompanies(data.results || []))
      .catch((err) => console.error(err));
  }, []);

  const filteredCompanies = companies.filter((item) =>
    `${item.name} ${item.phone_number}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <WebsiteNavbar />

      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h2>Company</h2>
        </div>

        {/* Toolbar */}
        <div className="page-toolbar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

        </div>

        {/* Table */}
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>NAME</th>
                <th>PHONE NUMBER</th>
                <th>CREATED AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCompanies.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="name-cell">{item.name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.created_at}</td>
                  <td className="actions">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}

              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-data">
                    No companies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Company;
