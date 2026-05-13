// ButtonRow.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonRow.css';

const ButtonRow = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const buttons = [
    { 
      id: 1, 
      name: 'Property', 
      icon: '🏠', 
      // path: '/agent-properties',
      description: 'View all properties'
    },
    { 
      id: 2, 
      name: 'Business', 
      icon: '📦', 
      // path: '/agent-busineess-category',
      description: 'Browse our products'
    },
    { 
      id: 3, 
      name: 'Service', 
      icon: '⚙️', 
      // path: '/services',
      description: 'Our services'
    },
    { 
      id: 4, 
      name: 'Team', 
      icon: '👥', 
      // path: '/agent-my-team',
      description: 'Meet our team'
    },
    { 
      id: 5, 
      name: 'Shriraj Pay', 
      icon: '₹', 
      // path: '/payouts',
      description: 'View payouts'
    }
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll position for shadows (only needed for desktop horizontal scroll)
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container && !isMobile) {
      const leftScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      setShowLeftShadow(leftScroll > 5);
      setShowRightShadow(leftScroll < maxScroll - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && !isMobile) {
      checkScroll();
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [isMobile]);

  const handleButtonClick = (button) => {
    if (button.path) {
      console.log(`Navigating to: ${button.path}`);
      navigate(button.path);
    } else {
      console.log(`Path not defined for: ${button.name}`);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container && !isMobile) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="button-row-container">
      {/* Left scroll button for desktop horizontal scroll */}
      {!isMobile && showLeftShadow && (
        <button 
          className="scroll-btn scroll-left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ❮
        </button>
      )}

      {/* Buttons container */}
      <div 
        className={`buttons-wrapper ${isMobile ? 'mobile-scroll' : 'desktop-row'}`}
        ref={scrollContainerRef}
      >
        {buttons.map((button) => (
          <button
            key={button.id}
            className="action-button"
            onClick={() => handleButtonClick(button)}
            title={button.description}
          >
            <span className="button-icon">{button.icon}</span>
            <span className="button-text">{button.name}</span>
          </button>
        ))}
      </div>

      {/* Right scroll button for desktop horizontal scroll */}
      {!isMobile && showRightShadow && (
        <button 
          className="scroll-btn scroll-right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ❯
        </button>
      )}
    </div>
  );
};

export default ButtonRow;