import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import './FinalCTA.css';

const FinalCTA = () => {
  return (
    <section className="final-cta-section section-padding">
      <div className="container">
        
        <div className="cta-box glass-card">
          <div className="cta-glow-bg"></div>
          
          <div className="cta-icon-wrapper">
            <Sparkles size={32} className="text-emerald" />
          </div>
          
          <h2 className="cta-headline">
            Your Business Journey Starts<br />With One Smart Decision.
          </h2>
          
          <p className="cta-text">
            Understand your local advantage, stress test your financial plan, and validate your idea with data before taking a loan.
          </p>
          
          <Link to="/input" className="btn btn-primary cta-btn-large">
            Start Business Analysis <ArrowRight size={20} className="cta-btn-icon" />
          </Link>
          
          <div className="cta-badges">
            <span className="cta-badge"><CheckCircle size={14} className="text-emerald"/> Instant Assessment</span>
            <span className="cta-badge"><CheckCircle size={14} className="text-emerald"/> Free Feasibility Report</span>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

// Quick inline component for the check icon
const CheckCircle = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default FinalCTA;
