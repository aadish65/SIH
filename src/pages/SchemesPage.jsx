import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, ArrowDown, Percent, Calendar, Clock, IndianRupee, Zap, ArrowRight, BookOpen, ExternalLink, Target, Briefcase } from 'lucide-react';
import './SchemesPage.css';

const SchemesPage = () => {
  const { userData } = useOutletContext();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const safeData = userData || { capital: '100000', name: 'Guest', business: 'Retail Shop', village: 'Demo Village' };
  const availableMarginCapital = parseFloat(safeData.capital) || 100000;
  const businessInterest = safeData.business || 'Retail Shop';
  
  const projectCost = availableMarginCapital / 0.10;
  const potentialLoan = projectCost * 0.90;

  // Scheme Logic
  let scheme = null;
  let schemeRange = '';
  
  if (projectCost <= 140000) {
    scheme = {
      name: 'Micro Finance Scheme',
      interestRate: '6.5% p.a.',
      tenure: '3 Years',
      moratorium: '3 Months'
    };
    schemeRange = 'Up to ₹1.40 Lakh';
  } else if (projectCost > 140000 && projectCost <= 5000000) {
    scheme = {
      name: 'Term Loan Scheme',
      interestRate: '8% p.a.',
      tenure: '7 Years',
      moratorium: '6 Months'
    };
    schemeRange = '₹1.40 Lakh to ₹50 Lakh';
  }

  // ----------------------------------------------------
  // Business-Specific Scheme Discovery Engine
  // ----------------------------------------------------
  
  const allSchemes = [
    {
      id: 'pmegp',
      abbr: 'PMEGP',
      name: "Prime Minister's Employment Generation Programme",
      type: 'Enterprise / Self-employment Support',
      url: 'https://pmegp.msme.gov.in/',
      relevantCategories: ['Retail Shop', 'Agricultural Processing', 'Teaching Services'],
      getScore: (biz) => {
        let score = 0;
        let reasons = [];
        if (['Retail Shop', 'Agricultural Processing', 'Teaching Services'].includes(biz)) { score += 50; reasons.push('Your business category is supported under self-employment programs.'); }
        score += 20; reasons.push('Your estimated project cost falls within the broad limit for micro-enterprises.');
        score += 15; reasons.push('Your enterprise operates in a rural/semi-urban entrepreneurial context.');
        score += 10; reasons.push('Subject to individual demographic and educational eligibility.');
        return { score, reasons };
      }
    },
    {
      id: 'pmmy',
      abbr: 'PMMY',
      name: 'Pradhan Mantri MUDRA Yojana',
      type: 'Micro Enterprise Finance',
      url: 'https://www.mudra.org.in/',
      relevantCategories: ['Retail Shop', 'Agricultural Processing', 'Teaching Services'],
      getScore: (biz) => {
        let score = 0;
        let reasons = [];
        if (['Retail Shop', 'Agricultural Processing', 'Teaching Services'].includes(biz)) { score += 50; reasons.push('Your income-generating micro-enterprise category is highly relevant.'); }
        score += 20; reasons.push('Your funding requirement fits perfectly within MUDRA loan categories (Shishu/Kishore/Tarun).');
        score += 15; reasons.push('Designed explicitly for non-corporate, non-farm small/micro enterprises.');
        score += 5; reasons.push('Basic demographic eligibility assumed.');
        return { score: Math.min(score, 92), reasons };
      }
    },
    {
      id: 'cgtmse',
      abbr: 'CGTMSE',
      name: 'Credit Guarantee Scheme for Micro and Small Enterprises',
      type: 'Credit Guarantee / Enterprise Finance Support',
      url: 'https://www.cgtmse.in/',
      relevantCategories: ['Retail Shop', 'Agricultural Processing', 'Teaching Services'],
      warning: 'This is a credit guarantee mechanism and not a direct cash grant.',
      getScore: (biz) => {
        let score = 0;
        let reasons = [];
        if (['Retail Shop', 'Agricultural Processing', 'Teaching Services'].includes(biz)) { score += 50; reasons.push('Eligible MSME business category requiring collateral-free credit.'); }
        score += 20; reasons.push('Project cost is well within the guarantee cover limits.');
        score += 10; reasons.push('Highly relevant for first-time rural entrepreneurs lacking collateral.');
        return { score: (biz === 'Retail Shop' ? 88 : 82), reasons };
      }
    },
    {
      id: 'standup',
      abbr: 'Stand-Up India',
      name: 'Stand-Up India Scheme',
      type: 'Greenfield Enterprise Finance',
      url: 'https://www.standupmitra.in/',
      relevantCategories: ['Retail Shop', 'Agricultural Processing', 'Teaching Services'],
      warning: 'Additional profile eligibility conditions (SC/ST/Women entrepreneurs) apply.',
      getScore: (biz) => {
        let score = 0;
        let reasons = [];
        if (['Retail Shop', 'Agricultural Processing', 'Teaching Services'].includes(biz)) { score += 40; reasons.push('Category qualifies as a new greenfield enterprise in manufacturing/services/trading.'); }
        score += 15; reasons.push('Project size aligns with minimum lending thresholds.');
        score += 15; reasons.push('Targeted at specific demographic groups; highly relevant if you meet profile criteria.');
        return { score: 70, reasons };
      }
    },
    {
      id: 'pmfme',
      abbr: 'PMFME',
      name: 'PM Formalisation of Micro Food Processing Enterprises',
      type: 'Food Processing Enterprise Support',
      url: 'https://www.mofpi.gov.in/',
      relevantCategories: ['Agricultural Processing'],
      getScore: (biz) => {
        if (biz !== 'Agricultural Processing') return { score: 0, reasons: [] };
        return { 
          score: 98, 
          reasons: [
            'Your business category directly matches food processing requirements.',
            'Your enterprise is being evaluated as a micro-enterprise.',
            'Your business is in a rural entrepreneurship context prioritizing local supply chains.',
            'High alignment for capital subsidy and capacity building.'
          ]
        };
      }
    },
    {
      id: 'aspire',
      abbr: 'ASPIRE',
      name: 'A Scheme for Promotion of Innovation, Rural Industry and Entrepreneurship',
      type: 'Entrepreneurship / Incubation / Rural Enterprise Support',
      url: 'https://www.msme.gov.in/',
      relevantCategories: ['Agricultural Processing'],
      getScore: (biz) => {
        if (biz !== 'Agricultural Processing') return { score: 30, reasons: ['Low relevance for non-rural-industry sectors.'] };
        return { 
          score: 75, 
          reasons: [
            'Directly targets rural industry and agribusiness.',
            'Focuses on innovation and forward/backward linkages in agriculture.',
            'Relevant for value-added processing enterprises.'
          ] 
        };
      }
    },
    {
      id: 'esdp',
      abbr: 'ESDP',
      name: 'Entrepreneurship Skill Development Programme',
      type: 'Entrepreneurship Training and Business Skill Development',
      url: 'https://www.msme.gov.in/',
      relevantCategories: ['Retail Shop', 'Agricultural Processing', 'Teaching Services'],
      warning: 'This is primarily entrepreneurship and skill-development support rather than a direct business loan.',
      getScore: (biz) => {
        if (biz !== 'Teaching Services') return { score: 40, reasons: ['General skill development.'] };
        return { 
          score: 85, 
          reasons: [
            'Directly supports skill-based service enterprises.',
            'Relevant for establishing training and educational services.',
            'Provides necessary capacity building and structural entrepreneurship support.'
          ]
        };
      }
    }
  ];

  const scoredSchemes = allSchemes.map(s => {
    const evaluation = s.getScore(businessInterest);
    return { ...s, score: evaluation.score, reasons: evaluation.reasons };
  }).filter(s => s.score > 50).sort((a, b) => b.score - a.score).slice(0, 3);

  const getLabel = (score) => {
    if (score >= 90) return { text: 'Highly Relevant', color: 'text-emerald', border: 'border-emerald' };
    if (score >= 70) return { text: 'Relevant to Explore', color: 'text-cyan', border: 'border-cyan' };
    if (score >= 50) return { text: 'Potential Option', color: 'text-orange', border: 'border-orange' };
    return { text: 'Low Relevance', color: 'text-red', border: 'border-red' };
  };

  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={`schemes-page ${animate ? 'loaded' : ''}`}>
      
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">Smart Scheme Router</h1>
        <p className="page-subtitle">Understand which funding scheme matches your estimated project cost and repayment capacity.</p>
      </header>



      {/* Scheme Comparison */}
      <section className="comparison-section stagger-4">
        <h3 className="section-label">FINANCIAL SCHEME COMPARISON MATRIX</h3>
        <div className="comparison-grid">
          
          <div className={`comp-card glass-panel ${scheme?.name === 'Micro Finance Scheme' ? 'active-comp' : ''}`}>
            {scheme?.name === 'Micro Finance Scheme' && <div className="rec-badge">RECOMMENDED</div>}
            <h4>MICRO FINANCE SCHEME</h4>
            <ul className="comp-list">
              <li><span className="c-key">Project Range:</span> <span className="c-val">Up to ₹1.40 Lakh</span></li>
              <li><span className="c-key">Interest:</span> <span className="c-val">6.5% p.a.</span></li>
              <li><span className="c-key">Tenure:</span> <span className="c-val">3 Years</span></li>
              <li><span className="c-key">Moratorium:</span> <span className="c-val">3 Months</span></li>
            </ul>
          </div>

          <div className={`comp-card glass-panel ${scheme?.name === 'Term Loan Scheme' ? 'active-comp' : ''}`}>
            {scheme?.name === 'Term Loan Scheme' && <div className="rec-badge">RECOMMENDED</div>}
            <h4>TERM LOAN SCHEME</h4>
            <ul className="comp-list">
              <li><span className="c-key">Project Range:</span> <span className="c-val">₹1.40 Lakh – ₹50 Lakh</span></li>
              <li><span className="c-key">Interest:</span> <span className="c-val">8% p.a.</span></li>
              <li><span className="c-key">Tenure:</span> <span className="c-val">7 Years</span></li>
              <li><span className="c-key">Moratorium:</span> <span className="c-val">6 Months</span></li>
            </ul>
          </div>

        </div>
      </section>

      {/* NEW: BUSINESS-SPECIFIC SCHEME DISCOVERY ENGINE */}
      <section className="discovery-section stagger-5">
        <div className="section-header">
          <Target size={24} className="text-cyan" />
          <h2 className="discovery-title">BUSINESS-SPECIFIC SCHEME DISCOVERY</h2>
        </div>
        <p className="discovery-subtitle">Potential government and institutional support options relevant to your specific business: <strong>{businessInterest}</strong>.</p>
        
        <div className="discovery-grid">
          {scoredSchemes.map((item, index) => {
            const label = getLabel(item.score);
            const offset = circumference - (item.score / 100) * circumference;
            return (
              <div key={item.id} className="discovery-card glass-card">
                
                <div className="d-card-header">
                  <div className="d-header-text">
                    <h3 className="d-abbr text-gradient">{item.abbr}</h3>
                    <h4 className="d-full-name">{item.name}</h4>
                  </div>
                  <div className="d-score-visual">
                    <svg width="80" height="80" viewBox="0 0 80 80" className="d-score-circle">
                      <circle cx="40" cy="40" r={radius} className="d-circle-bg" />
                      <circle 
                        cx="40" cy="40" r={radius} 
                        className={`d-circle-progress ${label.border}`}
                        style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
                      />
                    </svg>
                    <div className="d-score-text">
                      <span className="d-score-val">{item.score}</span>
                    </div>
                  </div>
                </div>

                <div className={`d-label-badge ${label.border} ${label.color}`}>
                  {label.text}
                </div>

                <div className="d-support-type">
                  <Briefcase size={14} /> {item.type}
                </div>

                {item.warning && (
                  <div className="d-warning-box">
                    <AlertTriangle size={14} className="text-orange" />
                    <span>{item.warning}</span>
                  </div>
                )}

                <div className="d-reasons-box">
                  <span className="d-reason-title">Why {item.abbr} may match:</span>
                  <ul className="d-reasons-list">
                    {item.reasons.map((r, i) => (
                      <li key={i}><CheckCircle size={12} className="text-emerald" /> {r}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-card-footer">
                  <span className="d-verification-text">Official Verification Required</span>
                  <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-outline-glow">
                    View Official Details <ExternalLink size={14} className="btn-icon" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="discovery-disclaimer glass-panel mt-4">
          <AlertTriangle size={20} className="text-orange" />
          <p>
            <strong>Important Disclaimer:</strong> GramVenture AI provides relevance-based scheme recommendations using configured business and financial criteria. This is not an official eligibility decision. Scheme rules, availability and eligibility conditions should always be verified through the official government portal or implementing agency.
          </p>
        </div>
      </section>

      {/* Next Steps (Full Width) */}
      <section className="next-steps-card glass-panel stagger-5 mt-4">
        <div className="section-header">
          <BookOpen size={20} className="text-cyan" />
          <h3 className="section-label mb-0">NEXT STEPS</h3>
        </div>
        <ul className="steps-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <li>
            <Link to="/finance" className="step-link" style={{ height: '100%' }}>
              <div className="step-num">1</div>
              <div className="step-content">
                <h5>Review your financial roadmap</h5>
                <p>Check the exact EMI and repayment timeline.</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/feasibility" className="step-link" style={{ height: '100%' }}>
              <div className="step-num">2</div>
              <div className="step-content">
                <h5>Check your business feasibility report</h5>
                <p>Analyze SWOT and local competition.</p>
              </div>
            </Link>
          </li>
          <li>
            <div className="step-link non-clickable" style={{ height: '100%' }}>
              <div className="step-num">3</div>
              <div className="step-content">
                <h5>Prepare a detailed business plan</h5>
                <p>Required for official scheme applications.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="step-link non-clickable" style={{ height: '100%' }}>
              <div className="step-num">4</div>
              <div className="step-content">
                <h5>Verify final eligibility</h5>
                <p>Consult with the relevant official agency or bank.</p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Disclaimer */}
      <p className="disclaimer-text mt-4">
        <AlertTriangle size={14} /> Scheme routing is based on the rules configured in this demonstration according to the provided problem statement. Final eligibility, funding amount, and repayment terms are subject to official verification.
      </p>

    </div>
  );
};

export default SchemesPage;
