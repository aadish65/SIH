import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart2, IndianRupee, FileText, Lightbulb, MapPin, Target, ShieldAlert, Zap } from 'lucide-react';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { userData } = useOutletContext();
  const [score, setScore] = useState(0);

  // Fallback defaults if no data exists
  const safeData = userData || {
    name: 'Guest',
    village: 'Demo Area',
    business: 'Retail Shop',
    capital: '100000'
  };

  // Logic based on business selection
  const businessScores = {
    'Retail Shop': 82,
    'Agricultural Processing': 86,
    'Teaching Services': 79
  };
  const targetScore = businessScores[safeData.business] || 75;

  const metricsLogic = {
    'Retail Shop': { opp: '82%', comp: 'Medium', risk: 'Low-Medium' },
    'Agricultural Processing': { opp: '86%', comp: 'Low-Medium', risk: 'Medium' },
    'Teaching Services': { opp: '79%', comp: 'Medium', risk: 'Low' }
  };
  const currentMetrics = metricsLogic[safeData.business] || { opp: '75%', comp: 'Medium', risk: 'Medium' };

  const capital = parseFloat(safeData.capital) || 100000;
  const projectCost = capital / 0.10;
  const potentialLoan = projectCost * 0.90;

  // Animate score on load
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= targetScore) {
        setScore(targetScore);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [targetScore]);

  // SVG Circle calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1 className="welcome-title">Good Evening, <span className="text-gradient">{safeData.name}</span> 👋</h1>
        <p className="welcome-subtitle">Here's your personalized business intelligence overview.</p>
        <div className="welcome-badges">
          <span className="badge"><MapPin size={14}/> {safeData.village}</span>
          <span className="badge"><Target size={14}/> {safeData.business}</span>
        </div>
      </section>

      {/* Hero: Business Potential */}
      <section className="hero-potential glass-card">
        <div className="hero-potential-content">
          <div className="potential-text">
            <h2 className="section-heading">BUSINESS POTENTIAL</h2>
            <h3 className="potential-status text-emerald">HIGH POTENTIAL</h3>
            <p className="potential-desc">
              Based on localized demand in {safeData.village} and your capital structure, {safeData.business} shows strong viability metrics. Proceed to feasibility for a deep dive.
            </p>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/feasibility')}>
              View Full Analysis <ArrowRight size={16} className="btn-icon-anim" />
            </button>
          </div>
          
          <div className="potential-score-wrapper">
            <svg className="score-circle" width="160" height="160" viewBox="0 0 160 160">
              <circle className="circle-bg" cx="80" cy="80" r={radius} />
              <circle 
                className="circle-progress" 
                cx="80" 
                cy="80" 
                r={radius} 
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset
                }}
              />
            </svg>
            <div className="score-text">
              <span className="score-value">{score}</span>
              <span className="score-total">/ 100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="metrics-section">
        <h3 className="section-label">KEY METRICS</h3>
        <div className="metrics-grid">
          
          <div className="metric-card glass-panel interactive">
            <div className="m-header">
              <BarChart2 size={20} className="text-cyan" />
              <span className="m-title">Market Opportunity</span>
            </div>
            <div className="m-value text-gradient">{currentMetrics.opp}</div>
            <div className="m-desc">Based on {safeData.village} demographics</div>
          </div>

          <div className="metric-card glass-panel interactive">
            <div className="m-header">
              <Target size={20} className="text-orange" />
              <span className="m-title">Competition</span>
            </div>
            <div className="m-value text-orange">{currentMetrics.comp}</div>
            <div className="m-desc">Density in a 5km radius</div>
          </div>

          <div className="metric-card glass-panel interactive">
            <div className="m-header">
              <ShieldAlert size={20} className="text-red" />
              <span className="m-title">Business Risk</span>
            </div>
            <div className="m-value text-red">{currentMetrics.risk}</div>
            <div className="m-desc">Estimated operational risk</div>
          </div>

          <div className="metric-card glass-panel interactive">
            <div className="m-header">
              <IndianRupee size={20} className="text-emerald" />
              <span className="m-title">Funding Capacity</span>
            </div>
            <div className="m-value text-emerald">₹{projectCost.toLocaleString('en-IN')}</div>
            <div className="m-desc">Based on ₹{capital.toLocaleString('en-IN')} margin</div>
          </div>

        </div>
      </section>



      {/* Explore Navigation */}
      <section className="explore-section">
        <h3 className="section-label">EXPLORE YOUR ANALYSIS</h3>
        <div className="explore-grid">
          
          <Link to="/feasibility" className="explore-card glass-panel interactive">
            <div className="e-icon-wrapper feasibility-icon">
              <BarChart2 size={28} />
            </div>
            <h4 className="e-title">Business Feasibility</h4>
            <p className="e-desc">Explore market opportunity, competition, SWOT and threats.</p>
          </Link>

          <Link to="/finance" className="explore-card glass-panel interactive">
            <div className="e-icon-wrapper finance-icon">
              <IndianRupee size={28} />
            </div>
            <h4 className="e-title">Financial Roadmap</h4>
            <p className="e-desc">Understand project cost, loan amount and repayment.</p>
          </Link>

          <Link to="/schemes" className="explore-card glass-panel interactive">
            <div className="e-icon-wrapper schemes-icon">
              <FileText size={28} />
            </div>
            <h4 className="e-title">Scheme Router</h4>
            <p className="e-desc">Find the applicable scheme, interest rate and tenure.</p>
          </Link>

          <Link to="/mentor" className="explore-card glass-panel interactive">
            <div className="e-icon-wrapper mentor-icon">
              <Lightbulb size={28} />
            </div>
            <h4 className="e-title">AI Business Mentor</h4>
            <p className="e-desc">Ask personalized questions about your business.</p>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default DashboardPage;
