import React from 'react';
import { LayoutDashboard, Map, PieChart, Users, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav glass-panel">
      <div className="bottom-nav-item active">
        <LayoutDashboard size={20} className="nav-icon" />
        <span className="nav-label">Overview</span>
      </div>
      <div className="bottom-nav-item">
        <Map size={20} className="nav-icon" />
        <span className="nav-label">Market</span>
      </div>
      <div className="bottom-nav-item">
        <PieChart size={20} className="nav-icon" />
        <span className="nav-label">Feasibility</span>
      </div>
      <div className="bottom-nav-item">
        <Users size={20} className="nav-icon" />
        <span className="nav-label">Lenders</span>
      </div>
      <div className="bottom-nav-item">
        <User size={20} className="nav-icon" />
        <span className="nav-label">Profile</span>
      </div>
    </div>
  );
};

export default BottomNav;
