import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IndianRupee, PieChart, TrendingUp, Calendar, Info, Zap, ArrowDown, Building, FileCheck } from 'lucide-react';
import './FinancePage.css';

const FinancePage = () => {
  const { userData } = useOutletContext();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setAnimate(true);
  }, []);

  // Data Retrieval
  const safeData = userData || {
    capital: '100000',
    name: 'Guest'
  };

  const availableMarginCapital = parseFloat(safeData.capital) || 100000;

  // Core Calculations
  const projectCost = availableMarginCapital / 0.10;
  const potentialLoan = projectCost * 0.90;

  // Scheme Routing Logic
  let scheme = null;
  if (projectCost <= 140000) {
    scheme = {
      name: 'Micro Finance Scheme',
      interestRate: 6.5, // per annum
      tenure: 3, // years
      moratorium: '3 months'
    };
  } else if (projectCost > 140000 && projectCost <= 5000000) {
    scheme = {
      name: 'Term Loan Scheme',
      interestRate: 8, // per annum
      tenure: 7, // years
      moratorium: '6 months'
    };
  }

  // EMI Calculation
  let emi = 0;
  if (scheme) {
    const P = potentialLoan;
    const r = scheme.interestRate / 12 / 100;
    const n = scheme.tenure * 12;
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  return (
    <div className={`finance-page ${animate ? 'loaded' : ''}`}>
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">Financial Roadmap</h1>
        <p className="page-subtitle">Understand your funding capacity and repayment obligations before borrowing.</p>
      </header>

      {/* Funding Flow Component */}
      <section className="funding-flow-section">
        <div className="funding-flow-container">
          
          <div className="flow-card glass-panel interactive">
            <div className="f-icon-wrapper f-contribution">
              <PieChart size={24} />
            </div>
            <div className="f-content">
              <span className="f-label">YOUR CONTRIBUTION</span>
              <span className="f-value">{formatCurrency(availableMarginCapital)}</span>
            </div>
          </div>

          <div className="flow-connector">
            <ArrowDown size={20} className="connector-icon" />
            <span className="connector-badge">10%</span>
            <div className="connector-line"></div>
          </div>

          <div className="flow-card glass-panel interactive highlight-card">
            <div className="f-icon-wrapper f-capacity">
              <Building size={24} />
            </div>
            <div className="f-content">
              <span className="f-label">TOTAL PROJECT CAPACITY</span>
              <span className="f-value text-gradient">{formatCurrency(projectCost)}</span>
            </div>
          </div>

          <div className="flow-connector">
            <ArrowDown size={20} className="connector-icon" />
            <span className="connector-badge">90%</span>
            <div className="connector-line"></div>
          </div>

          <div className="flow-card glass-panel interactive">
            <div className="f-icon-wrapper f-loan">
              <IndianRupee size={24} />
            </div>
            <div className="f-content">
              <span className="f-label">POTENTIAL LOAN</span>
              <span className="f-value text-emerald">{formatCurrency(potentialLoan)}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Grid: Scheme & Timeline */}
      <div className="finance-grid">
        
        {/* Recommended Scheme */}
        <section className="scheme-section">
          {scheme ? (
            <div className="scheme-card glass-card">
              <div className="scheme-badge">
                <FileCheck size={16} /> RECOMMENDED FUNDING SCHEME
              </div>
              <h2 className="scheme-name">{scheme.name}</h2>
              <p className="scheme-matched">Matched based on your estimated project cost.</p>
              
              <div className="scheme-details-grid">
                <div className="detail-item">
                  <span className="d-label">Interest Rate</span>
                  <span className="d-value">{scheme.interestRate}% <small>p.a.</small></span>
                </div>
                <div className="detail-item">
                  <span className="d-label">Repayment Tenure</span>
                  <span className="d-value">{scheme.tenure} Years</span>
                </div>
                <div className="detail-item">
                  <span className="d-label">Moratorium Period</span>
                  <span className="d-value text-orange">{scheme.moratorium}</span>
                </div>
                <div className="detail-item">
                  <span className="d-label">Potential Loan</span>
                  <span className="d-value text-emerald">{formatCurrency(potentialLoan)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="scheme-card glass-card unsupported-card">
              <Info size={40} className="text-red mb-4" />
              <h3>Outside Supported Range</h3>
              <p>Your estimated project cost ({formatCurrency(projectCost)}) is outside the currently supported scheme range.</p>
            </div>
          )}
        </section>

        {/* Repayment Timeline */}
        {scheme && (
          <section className="timeline-section">
            <div className="timeline-card glass-card">
              <h3 className="timeline-header"><Calendar size={20} /> REPAYMENT ROADMAP</h3>
              
              <div className="timeline-track">
                <div className="timeline-step">
                  <div className="step-marker"></div>
                  <div className="step-content">
                    <h4>Loan Approval</h4>
                    <p>Initial disbursement of funds</p>
                  </div>
                </div>

                <div className="timeline-step">
                  <div className="step-marker marker-orange"></div>
                  <div className="step-content">
                    <h4>Moratorium Period</h4>
                    <p className="text-orange">{scheme.moratorium} grace period. No principal repayment required.</p>
                  </div>
                </div>

                <div className="timeline-step">
                  <div className="step-marker"></div>
                  <div className="step-content">
                    <h4>Business Establishment</h4>
                    <p>Setup operations and generate initial revenue.</p>
                  </div>
                </div>

                <div className="timeline-step">
                  <div className="step-marker marker-emerald"></div>
                  <div className="step-content">
                    <h4>Regular Repayment Begins</h4>
                    <div className="emi-box">
                      <span className="emi-label">Estimated Monthly EMI</span>
                      <span className="emi-value text-emerald">{formatCurrency(emi)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* AI Financial Insight */}
      <section className="ai-insight-section">
        <div className="ai-insight-card glass-card">
          <div className="insight-header">
            <Zap size={24} className="text-emerald insight-icon" />
            <h3>AI FINANCIAL INSIGHT</h3>
          </div>
          <p className="insight-text">
            "With <strong>{formatCurrency(availableMarginCapital)}</strong> available as margin capital, you can support a project of approximately <strong>{formatCurrency(projectCost)}</strong>. 
            Your estimated borrowing requirement is <strong>{formatCurrency(potentialLoan)}</strong>, which currently falls within the <strong>{scheme ? scheme.name : 'supported ranges'}</strong>. 
            Consider keeping sufficient funds available for initial operating and working capital needs."
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <p className="disclaimer-text">
        <Info size={14} /> These calculations are indicative and based on the scheme rules configured in GramVenture AI. Final eligibility and repayment terms are subject to official verification.
      </p>

    </div>
  );
};

export default FinancePage;
