// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import "./SubCategories.css";
// import { baseurl } from "../BaseURL/BaseURL";

// const SubCategories = () => {
//   const { id } = useParams();
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${baseurl}/categories/${id}/`)
    
//       .then(res => res.json())
//       .then(data => {
//         setSubCategories(data.children || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="webhome-container">
//         <h2 className="section-title">Sub Categories</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : subCategories.length === 0 ? (
//           <p>No subcategories available</p>
//         ) : (
//           <div className="categories-row">
//             {subCategories.map((sub, index) => (
//               <div className="category-item" key={index}>
//                 <div className="category-icon">
//                   <BusinessCenterIcon />
//                 </div>
//                 <p>{sub.name}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SubCategories;



import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./SubCategories.css";
import { baseurl } from "../BaseURL/BaseURL";

const SubCategories = () => {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch(`${baseurl}/categories/${id}/`)
      .then(res => res.json())
      .then(data => {
        setSubCategories(data.children || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Check scroll position to enable/disable arrows
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // 1px buffer for rounding errors
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current && canScrollLeft) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && canScrollRight) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  // Initial check after render and when data changes
  useEffect(() => {
    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      checkScroll();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [subCategories]);

  return (
    <>
      <WebsiteNavbar />

      <div className="webhome-container">
        <h2 className="section-title">Sub Categories</h2>

        {loading ? (
          <p>Loading...</p>
        ) : subCategories.length === 0 ? (
          <p>No subcategories available</p>
        ) : (
          <div className="scroll-wrapper">
            {/* Always show left arrow, but disable when can't scroll */}
            <button 
              className={`scroll-arrow left-arrow ${!canScrollLeft ? 'disabled' : ''}`} 
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ArrowBackIosIcon />
            </button>
            
            <div 
              className="categories-row" 
              ref={scrollContainerRef}
              onScroll={checkScroll}
            >
              {subCategories.map((sub, index) => (
                <div className="category-item" key={index}>
                  <div className="category-icon">
                    <BusinessCenterIcon />
                  </div>
                  <p>{sub.name}</p>
                </div>
              ))}
            </div>
            
            {/* Always show right arrow, but disable when can't scroll */}
            <button 
              className={`scroll-arrow right-arrow ${!canScrollRight ? 'disabled' : ''}`} 
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategories;