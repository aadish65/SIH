import React from 'react';
import { Target, Calculator, FileText, CheckCircle } from 'lucide-react';
import './BentoGrid.css';

const BentoGrid = () => {
  return (
    <section id="features" className="bento-section section-padding">
      <div className="container">
        
        <div className="bento-header text-center">
          <div className="section-badge">Everything You Need</div>
          <h2 className="section-title">
            Make a Smarter<br />Business Decision.
          </h2>
        </div>
        
        <div className="bento-grid">
          
          {/* Card 1: Market Analysis */}
          <div className="bento-card card-large glass-card icon-hover-effect">
            <div className="card-header">
              <div className="card-icon"><Target size={20} className="text-emerald" /></div>
              <span className="card-tag">Hyper-Local</span>
            </div>
            <h3 className="bento-title">Market Analysis</h3>
            <p className="bento-desc">Understand real demand, footfall data, and area risks.</p>
            
            <div className="bento-visual market-visual">
              <div className="radar-circle"></div>
              <div className="radar-circle rc-2"></div>
              <div className="radar-dot dot-1"></div>
              <div className="radar-dot dot-2"></div>
              <div className="radar-dot dot-3"></div>
            </div>
          </div>
          
          {/* Card 2: Financial Calculator */}
          <div className="bento-card card-tall glass-card icon-hover-effect">
            <div className="card-header">
              <div className="card-icon"><Calculator size={20} className="text-cyan" /></div>
              <span className="card-tag tag-cyan">Financials</span>
            </div>
            <h3 className="bento-title">Smart Calculator</h3>
            <p className="bento-desc">Turn limited capital into actionable project budgets.</p>
            
            <div className="bento-visual fin-visual">
              <div className="fin-step">
                <span className="fin-label">Available Capital</span>
                <span className="fin-val">₹1,00,000</span>
              </div>
              <div className="fin-arrow">↓</div>
              <div className="fin-step active">
                <span className="fin-label">Project Capacity</span>
                <span className="fin-val text-gradient">₹10,00,000</span>
              </div>
              <div className="fin-arrow">↓</div>
              <div className="fin-step">
                <span className="fin-label">Potential Loan</span>
                <span className="fin-val text-emerald">₹9,00,000</span>
              </div>
            </div>
          </div>
          
          {/* Card 3: Scheme Router */}
          <div className="bento-card glass-card icon-hover-effect">
            <div className="card-header">
              <div className="card-icon"><CheckCircle size={20} className="text-emerald" /></div>
            </div>
            <h3 className="bento-title">Scheme Router</h3>
            <p className="bento-desc">Auto-match with PMEGP & mudra loans.</p>
            <div className="scheme-tag">PMEGP Eligible: 35% Subsidy</div>
          </div>
          
          {/* Card 4: Feasibility Report */}
          <div className="bento-card glass-card icon-hover-effect">
            <div className="card-header">
              <div className="card-icon"><FileText size={20} className="text-cyan" /></div>
            </div>
            <h3 className="bento-title">Feasibility Report</h3>
            <p className="bento-desc">Downloadable report for bank applications.</p>
            <div className="report-mock">
              <div className="report-line w-full"></div>
              <div className="report-line w-3-4"></div>
              <div className="report-line w-1-2"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
