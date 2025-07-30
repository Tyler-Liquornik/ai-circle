import { useEffect, useRef, useState } from 'react';
import './GlassNavBar.css';

interface GlassNavBarProps {
  className?: string;
}

const GlassNavBar = ({ className = '' }: GlassNavBarProps) => {
  const [isBackdropSupported, setIsBackdropSupported] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if backdrop-filter is supported
    const isSupported = window.CSS?.supports?.('backdrop-filter', 'blur(1px)');
    setIsBackdropSupported(!!isSupported);

    // Set up responsive behavior
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle clicks outside of the mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('.glass-navbar-hamburger')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav 
      className={`glass-navbar ${isBackdropSupported ? 'backdrop-supported' : 'backdrop-not-supported'} ${className}`}
      aria-label="Main navigation"
    >
      <div className="glass-navbar-container">
        <div className="glass-navbar-brand">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        {isMobileView ? (
          <>
            <button 
              type="button"
              className="glass-navbar-hamburger" 
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {isMenuOpen && (
              <div ref={menuRef} className="glass-navbar-mobile-menu">
                <a href="/" className="glass-navbar-link">Home</a>
                <a href="/values" className="glass-navbar-link">Values</a>
                <a href="/membership" className="glass-navbar-link">Membership</a>
                <a href="/annotates" className="glass-navbar-link">Annotates</a>
                <a href="/apply" className="glass-navbar-apply-button">Apply</a>
              </div>
            )}
          </>
        ) : (
          <div className="glass-navbar-links">
            <a href="/" className="glass-navbar-link">Home</a>
            <a href="/values" className="glass-navbar-link">Values</a>
            <a href="/membership" className="glass-navbar-link">Membership</a>
            <a href="/annotates" className="glass-navbar-link">Annotates</a>
            <a href="/apply" className="glass-navbar-apply-button">Apply</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default GlassNavBar;
