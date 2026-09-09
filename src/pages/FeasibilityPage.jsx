import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Target, Briefcase, Zap, AlertTriangle, Users, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';
import './FeasibilityPage.css';

const FeasibilityPage = () => {
  const { userData } = useOutletContext();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [score, setScore] = useState(0);

  const safeData = userData || {
    name: 'Guest',
    village: 'Demo Village',
    district: 'Demo District',
    business: 'Retail Shop',
    capital: '100000'
  };

  // ----------------------------------------------------
  // Dynamic Business Data Dictionary
  // ----------------------------------------------------
  const businessDataMap = {
    'Retail Shop': {
      score: 82,
      reach: '2,500 – 5,000 potential consumers',
      channels: ['Walk-in customers', 'Local delivery', 'Nearby villages'],
      opportunities: ['Daily essentials', 'Affordable packaged products', 'Home delivery', 'Underserved product categories'],
      swot: {
        strengths: ['Consistent daily demand', 'Familiar business model'],
        weaknesses: ['Margin pressure', 'Inventory management'],
        opportunities: ['Underserved products', 'Home delivery'],
        threats: ['Established competitors', 'Supplier price changes']
      },
      threats: [
        { title: 'Supplier price inflation', desc: 'Rising costs of wholesale goods.', level: 'Medium' },
        { title: 'Local credit defaults', desc: 'Customers failing to pay tabs.', level: 'Medium' }
      ],
      competition: 'Medium',
      pricing: 'Competitive pricing based on local purchasing power and competitor comparison.'
    },
    'Agricultural Processing': {
      score: 86,
      reach: 'Potential local + nearby distribution market',
      channels: ['Local retailers', 'Nearby markets', 'Direct-to-consumer'],
      opportunities: ['Value-added agricultural products', 'Packaging', 'Local branding', 'Nearby market distribution'],
      swot: {
        strengths: ['Value addition', 'Local raw materials'],
        weaknesses: ['Processing equipment requirements', 'Quality control'],
        opportunities: ['Packaged products', 'Regional distribution'],
        threats: ['Seasonal raw material availability', 'Supply chain disruption']
      },
      threats: [
        { title: 'Raw material shortage', desc: 'Dependent on seasonal yields.', level: 'Low' },
        { title: 'Machinery breakdown', desc: 'Costly downtime for repairs.', level: 'Medium' }
      ],
      competition: 'Low-Medium',
      pricing: 'Cost-plus pricing combined with local market comparison and value-added packaging.'
    },
    'Teaching Services': {
      score: 79,
      reach: '500 – 1,500 potential learners',
      channels: ['Local students', 'Small group classes', 'Community referrals'],
      opportunities: ['School tutoring', 'Digital literacy', 'Skill training', 'Competitive exam preparation'],
      swot: {
        strengths: ['Lower starting investment', 'Skill-based business'],
        weaknesses: ['Limited scalability initially', 'Dependence on educator availability'],
        opportunities: ['Skill development', 'Digital education'],
        threats: ['Competition', 'Seasonal enrollment changes']
      },
      threats: [
        { title: 'Student retention', desc: 'Drop-offs during harvest seasons.', level: 'Medium' },
        { title: 'Digital alternatives', desc: 'Free online content accessibility.', level: 'Low' }
      ],
      competition: 'Medium',
      pricing: 'Tiered pricing based on service level and local affordability.'
    }
  };

  // Fallback to Retail Shop if exact match not found
  const bData = businessDataMap[safeData.business] || businessDataMap['Retail Shop'];

  // ----------------------------------------------------
  // Score Animation
  // ----------------------------------------------------
  useEffect(() => {
    setAnimate(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= bData.score) {
        setScore(bData.score);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [bData.score]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let potentialLabel = 'MODERATE POTENTIAL';
  let potentialColor = 'text-orange';
  if (bData.score >= 80) {
    potentialLabel = 'HIGH POTENTIAL';
    potentialColor = 'text-emerald';
  } else if (bData.score < 60) {
    potentialLabel = 'NEEDS REVIEW';
    potentialColor = 'text-red';
  }

  // Competition Meter logic
  let meterWidth = '50%';
  if (bData.competition === 'Low-Medium') meterWidth = '35%';
  if (bData.competition === 'High') meterWidth = '80%';

  return (
    <div className={`feasibility-page ${animate ? 'loaded' : ''}`}>
      
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">Business Feasibility Report</h1>
        <p className="page-subtitle">An indicative assessment of your business opportunity based on your selected business, location, profile, and configured local market assumptions.</p>
        
        <div className="header-badges mt-4">
          <span className="badge"><Briefcase size={14} className="text-cyan"/> {safeData.business}</span>
          <span className="badge"><MapPin size={14} className="text-emerald"/> {safeData.village}</span>
          <span className="badge"><Target size={14} className="text-orange"/> {safeData.district}</span>
        </div>
      </header>

      {/* Feasibility Hero */}
      <section className="feasibility-hero glass-card stagger-1">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="section-label">BUSINESS FEASIBILITY SCORE</h2>
            <h3 className={`potential-label ${potentialColor}`}>{potentialLabel}</h3>
            <p className="hero-desc">
              Based on the configured demo data for {safeData.village}, a {safeData.business} exhibits strong indicators for success. 
              Local demand aligns well with your proposed model.
            </p>
          </div>

          <div className="score-visual">
            <svg className="score-circle" width="160" height="160" viewBox="0 0 160 160">
              <circle className="circle-bg" cx="80" cy="80" r={radius} />
              <circle 
                className="circle-progress" 
                cx="80" 
                cy="80" 
                r={radius} 
                style={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }}
              />
            </svg>
            <div className="score-text">
              <span className="score-value">{score}</span>
              <span className="score-total">/ 100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout for Reach & Opportunity */}
      <div className="split-grid stagger-2">
        {/* Market Reach */}
        <section className="market-reach glass-panel">
          <div className="section-header">
            <Users size={20} className="text-cyan" />
            <h3 className="section-label mb-0">MARKET REACH (ESTIMATE)</h3>
          </div>
          <div className="reach-highlight">
            <span className="reach-value text-gradient">{bData.reach}</span>
          </div>
          <h4 className="sub-label">Primary Distribution Channels:</h4>
          <ul className="reach-list">
            {bData.channels.map((ch, i) => (
              <li key={i}><ArrowRight size={14} className="text-cyan"/> {ch}</li>
            ))}
          </ul>
        </section>

        {/* Opportunity Analysis */}
        <section className="opportunity-analysis glass-panel">
          <div className="section-header">
            <TrendingUp size={20} className="text-emerald" />
            <h3 className="section-label mb-0">KEY OPPORTUNITIES</h3>
          </div>
          <div className="opportunities-grid">
            {bData.opportunities.map((opp, i) => (
              <div key={i} className="opp-card">
                <Lightbulb size={16} className="text-emerald mb-2" />
                <p>{opp}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SWOT Analysis */}
      <section className="swot-section stagger-3">
        <h3 className="section-label">SWOT ANALYSIS</h3>
        <div className="swot-grid">
          
          <div className="swot-card glass-panel interactive s-card">
            <h4>STRENGTHS</h4>
            <ul>
              {bData.swot.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          
          <div className="swot-card glass-panel interactive w-card">
            <h4>WEAKNESSES</h4>
            <ul>
              {bData.swot.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
          
          <div className="swot-card glass-panel interactive o-card">
            <h4>OPPORTUNITIES</h4>
            <ul>
              {bData.swot.opportunities.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
          
          <div className="swot-card glass-panel interactive t-card">
            <h4>THREATS</h4>
            <ul>
              {bData.swot.threats.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

        </div>
      </section>

      {/* Threats & Competition */}
      <div className="split-grid stagger-4">
        {/* Local Threats */}
        <section className="local-threats glass-panel">
          <div className="section-header">
            <AlertTriangle size={20} className="text-red" />
            <h3 className="section-label mb-0">LOCAL THREAT IDENTIFICATION</h3>
          </div>
          <div className="threats-list">
            {bData.threats.map((threat, i) => (
              <div key={i} className="threat-item">
                <div className="threat-top">
                  <h5>{threat.title}</h5>
                  <span className={`threat-badge ${threat.level === 'Low' ? 'badge-low' : 'badge-med'}`}>{threat.level}</span>
                </div>
                <p>{threat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Competitor Landscape */}
        <section className="competitor-landscape glass-panel">
          <div className="section-header">
            <Target size={20} className="text-orange" />
            <h3 className="section-label mb-0">COMPETITOR LANDSCAPE</h3>
          </div>
          
          <div className="competition-meter-wrapper">
            <div className="meter-labels">
              <span>Low</span>
              <span className="text-orange font-bold">{bData.competition}</span>
              <span>High</span>
            </div>
            <div className="meter-track">
              <div className="meter-fill" style={{ width: meterWidth }}></div>
            </div>
          </div>
          <p className="indicative-text mt-4">
            This is an indicative competition assessment based on configured demo assumptions. A production version can connect verified local business and market datasets.
          </p>
        </section>
      </div>

      {/* Pricing Strategy */}
      <section className="pricing-section glass-card stagger-4">
        <div className="section-header">
          <DollarSign size={20} className="text-emerald" />
          <h3 className="section-label mb-0">PRODUCT MARKET VALUE & PRICING</h3>
        </div>
        <div className="pricing-content">
          <div className="pricing-main">
            <h4>Recommended Strategy</h4>
            <p className="pricing-desc">{bData.pricing}</p>
          </div>
          <div className="pricing-factors">
            <h4>Pricing Factors</h4>
            <div className="factor-badges">
              <span>Demand</span>
              <span>Cost</span>
              <span>Competition</span>
              <span>Purchasing Power</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendation */}
      <section className="ai-recommendation glass-card stagger-5">
        <div className="insight-header">
          <Zap size={24} className="text-cyan insight-icon" />
          <h3>AI RECOMMENDATION</h3>
        </div>
        <p className="insight-text">
          "Your {safeData.business} idea shows promising potential under the configured local assumptions for {safeData.village}. 
          Before borrowing, validate demand by surveying nearby households and identifying at least one underserved product or service category."
        </p>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/mentor')}>
          Ask AI Mentor <ArrowRight size={16} className="btn-icon-anim" />
        </button>
      </section>

      {/* Disclaimer */}
      <p className="disclaimer-text mt-4">
        This feasibility report is an indicative AI-assisted assessment based on user inputs and configured demonstration assumptions. It is not a substitute for verified field-level market research.
      </p>

    </div>
  );
};

export default FeasibilityPage;
