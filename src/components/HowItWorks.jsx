import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const processSteps = [
    {
      num: "1",
      title: "Input Business Parameters",
      desc: "Specify your pin code, category, available margin capital, and unit count. (e.g. Navi Mumbai, Retail Electronics, ₹2.5L margin, 1 unit size)"
    },
    {
      num: "2",
      title: "Local Hyper- Profiling",
      desc: "Algorithm scans demand demographics, neighboring competitor spread & implied supply gaps using public geospatial layers."
    },
    {
      num: "3",
      title: "Capital & Scheme Architecture",
      desc: "Dynamic financial models calculate required Project Cost. Auto-matches coverage (e.g. PMEGP Margin Money Subsidy) vs Term Loan vs WC limits."
    },
    {
      num: "4",
      title: "Actionable Enterprise Dossier",
      desc: "Generate full, compliant, data-backed viability checks, SWOT tables, and lender-ready DPR (Detailed Project Report)."
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section section-padding">
      <div className="container">
        
        <div className="how-it-works-header">
          <div className="section-badge">4 Simple Steps Process</div>
          <h2 className="section-title">
            From Idea to Informed Decision.
          </h2>
          <p className="section-subtitle">
            Four step back-end calculation checkpoints to establish data enterprise validity:
          </p>
        </div>
        
        <div className="vertical-timeline">
          {processSteps.map((step, index) => (
            <div key={index} className="timeline-step">
              <div className="timeline-node">
                <span className="node-number">{step.num}</span>
              </div>
              <div className="timeline-content glass-panel">
                <div className="step-label">STEP {step.num}</div>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;
