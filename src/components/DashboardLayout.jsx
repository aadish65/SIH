import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, BarChart2, IndianRupee, FileText, Lightbulb, Menu, X, User } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('gramventure_onboarding');
    if (data) {
      setUserData(JSON.parse(data));
    } else {
      setUserData({ name: 'Guest', business: 'Demo Enterprise' });
    }
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/feasibility', name: 'Feasibility', icon: BarChart2 },
    { path: '/finance', name: 'Finance', icon: IndianRupee },
    { path: '/schemes', name: 'Schemes', icon: FileText },
    { path: '/mentor', name: 'AI Mentor', icon: Lightbulb },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile Header */}
      <div className="mobile-dashboard-header hidden-desktop">
        <button className="icon-btn" onClick={() => setIsMobileOpen(true)}>
          <Menu size={24} />
        </button>
        <span className="mobile-brand">GramVenture<span className="text-gradient">AI</span></span>
        <div className="avatar-placeholder">
          <User size={16} />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="sidebar-overlay hidden-desktop" onClick={() => setIsMobileOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar glass-panel ${isSidebarOpen ? 'expanded' : 'collapsed'} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          {isSidebarOpen && (
            <span className="sidebar-brand text-gradient">GramVentureAI</span>
          )}
          {!isSidebarOpen && <span className="sidebar-brand-icon">G<span className="text-emerald">V</span></span>}
          
          <button className="toggle-btn hidden-mobile" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={20} />
          </button>
          <button className="close-btn hidden-desktop" onClick={() => setIsMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}
                title={!isSidebarOpen ? item.name : ''}
              >
                <div className="link-icon-wrapper">
                  <Icon size={20} className="link-icon" />
                </div>
                <span className="link-text">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {userData && (
          <div className="sidebar-footer">
            <div className="user-profile-mini">
              <div className="avatar">
                <User size={18} />
              </div>
              <div className="user-details">
                <span className="user-name">{userData.name}</span>
                <span className="user-business">{userData.business}</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <div className="dashboard-content-wrapper">
          <Outlet context={{ userData }} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
