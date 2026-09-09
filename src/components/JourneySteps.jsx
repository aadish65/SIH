import React from 'react';
import { Lightbulb, Map, Calculator, ArrowRight } from 'lucide-react';
import './JourneySteps.css';

const JourneySteps = () => {
  const steps = [
    {
      icon: <Lightbulb size={24} className="step-icon text-cyan" />,
      title: "Understand Your Business",
      description: "Analyze your specific venture against hyper-local market data, demands, risks, and economic viability.",
      linkText: "Automated business modeling"
    },
    {
      icon: <Map size={24} className="step-icon text-emerald" />,
      title: "Analyze Your Local Market",
      description: "Understand the density, competition and potential within a 5km/10km radius. Get clear insights for your location.",
      linkText: "Hyper-local intelligence"
    },
    {
      icon: <Calculator size={24} className="step-icon text-cyan" />,
      title: "Plan Your Funding",
      description: "Turn your available margin capital into an expected project budget, loan amount, and find the right scheme.",
      linkText: "Smart financial projections"
    }
  ];

  return (
    <section className="journey-section section-padding">
      <div className="container">
        
        <div className="journey-header">
          <div className="section-badge">Valid AI-Driven Insights</div>
          <h2 className="section-title">
            From Business Idea to<br />Confident Decision.
          </h2>
          <p className="section-subtitle">
            GramVenture AI gives first-time entrepreneurs the intelligence needed for real demand, risks, and financial viability before taking a loan.
          </p>
        </div>
        
        <div className="journey-grid">
          {steps.map((step, index) => (
            <div key={index} className="journey-card glass-card">
              <div className="card-icon-wrapper">
                {step.icon}
              </div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-desc">{step.description}</p>
              <div className="card-link text-gradient">
                {step.linkText} <ArrowRight size={14} className="link-arrow" />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default JourneySteps;
