import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, MapPin, TrendingUp, Sparkles, Activity } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-container">
        
        {/* Top Text Content */}
        <div className="hero-content">
          <div className="section-badge">
            <Sparkles size={14} className="text-emerald mr-2" style={{marginRight: '6px'}} /> AI-POWERED BUSINESS INTELLIGENCE
          </div>
          
          <h1 className="hero-title">
            Know Your Business.<br />
            <span className="text-gradient">Before You Borrow.</span>
          </h1>
          
          <p className="hero-subtitle">
            AI-powered hyper-local business intelligence and smart financial planning<br/>for first-time rural and semi-urban entrepreneurs across Bharat.
          </p>
          
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary hero-btn-primary full-width-mobile">
              Start Business Analysis <ArrowRight size={18} className="btn-icon-anim" />
            </Link>
            <a href="#how-it-works" onClick={scrollToHowItWorks} className="btn btn-secondary hero-btn-secondary full-width-mobile">
              <Play size={16} className="btn-icon text-cyan" style={{marginRight: '8px'}} /> See How It Works
            </a>
          </div>
          
          <div className="social-proof">
            <div className="avatars">
              <div className="avatar mock-av-1">M</div>
              <div className="avatar mock-av-2">H</div>
              <div className="avatar mock-av-3">A</div>
              <div className="avatar mock-av-4">U</div>
              <div className="avatar mock-av-5">P</div>
            </div>
            <span className="proof-text">Over <strong>4,200+</strong> rural micro-enterprises vetted</span>
          </div>
        </div>
        
        {/* Bottom Dashboard Visual */}
        <div className="hero-visual">
          <div className="dashboard-glass glass-card">
            
            <div className="dash-header">
              <div className="dash-location">
                <MapPin size={16} className="text-emerald" />
                <span><strong>Anantapur Rural Cluster</strong> <span className="text-muted mx-2">•</span> <span className="text-cyan">Micro-Dairy Feasibility</span></span>
              </div>
              <div className="dash-status">
                Live Model
              </div>
            </div>
            
            <div className="dash-grid">
              
              {/* Metric 1 */}
              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-title">Market Opp.</div>
                  <div className="tag-high">HIGH</div>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value">82%</span>
                  <div className="circular-progress">
                    <svg viewBox="0 0 36 36">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle" strokeDasharray="82, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                  </div>
                </div>
                <div className="metric-desc text-emerald"><TrendingUp size={14} /> +14% cluster surge</div>
              </div>
              
              {/* Metric 2 */}
              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-title">Funding Capacity</div>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-cyan">₹9.0L</span>
                </div>
                <div className="metric-desc">From ₹1.0L Margin</div>
              </div>
              
              {/* Metric 3 */}
              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-title">Competition</div>
                  <div className="tag-med">MED</div>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value">Moderate</span>
                </div>
                <div className="metric-desc">2 units in 8km radius</div>
              </div>
              
              {/* Metric 4 */}
              <div className="metric-card">
                <div className="metric-header-row">
                  <div className="metric-title">Risk Score</div>
                  <div className="tag-score">28/100</div>
                </div>
                <div className="metric-value-row">
                  <span className="metric-value text-emerald">Low-Med</span>
                </div>
                <div className="metric-desc">High debt tolerance</div>
              </div>
              
            </div>
            
            {/* Chart Area */}
            <div className="dash-chart-area">
              <div className="chart-header">
                <span className="chart-title">12-Month Net Revenue Trajectory</span>
                <span className="chart-value text-emerald">+₹42,000 / mo</span>
              </div>
              <div className="mock-chart">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </linearGradient>
                  </defs>
                  <path d="M0,20 L0,18 C20,17 40,15 60,12 C80,9 90,6 100,5 L100,20 Z" fill="url(#gradient)" />
                  <path d="M0,18 C20,17 40,15 60,12 C80,9 90,6 100,5" fill="none" stroke="#10b981" strokeWidth="1" />
                </svg>
              </div>
              <div className="chart-footer">
                <span>M1: Break-even run</span>
                <span>M6: Target scale</span>
                <span>M12: Surplus</span>
              </div>
            </div>
            
            {/* AI Insight */}
            <div className="ai-insight-card">
              <div className="ai-icon-bg">
                <Sparkles size={16} className="text-emerald" />
              </div>
              <div className="ai-insight-content">
                <strong>AI Recommendation:</strong> Strong match for <span className="text-emerald">NABARD Agri-Infra Fund</span> with 3% interest subvention. Estimated operational break-even in <strong>14 months</strong>.
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
