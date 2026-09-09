import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Plus, HelpCircle, Loader2, IndianRupee, User } from 'lucide-react';
import './OnboardingPage.css';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    skills: [],
    customSkill: '',
    district: '',
    village: '',
    capital: '',
    business: ''
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const submitAnalysis = () => {
    setIsAnalyzing(true);
    // Sequence animations
    const stages = [
      "Understanding your profile",
      "Mapping your local market",
      "Analyzing business opportunities",
      "Calculating funding capacity",
      "Finding the applicable scheme",
      "Preparing your business roadmap"
    ];
    
    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage >= stages.length) {
        clearInterval(interval);
        localStorage.setItem('gramventure_onboarding', JSON.stringify(formData));
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setAnalysisStage(currentStage);
      }
    }, 1500); // 1.5 seconds per stage
  };

  // Nav Items
  const navSteps = ['Profile', 'Geo', 'Capital', 'Business', 'AI Engine'];

  if (isAnalyzing) {
    return (
      <div className="onboarding-page loading-screen">
        <div className="loading-content">
          <div className="loading-icon-wrapper">
            <Loader2 size={64} className="loading-spinner text-emerald" />
          </div>
          <h2 className="loading-title">AI Engine Analyzing...</h2>
          <div className="loading-stages">
            {[
              "Understanding your profile",
              "Mapping your local market",
              "Analyzing business opportunities",
              "Calculating funding capacity",
              "Finding the applicable scheme",
              "Preparing your business roadmap"
            ].map((stage, idx) => (
              <div key={idx} className={`loading-stage ${idx < analysisStage ? 'completed' : idx === analysisStage ? 'active' : 'pending'}`}>
                <div className="stage-dot">{idx < analysisStage && <Check size={12} />}</div>
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      {/* Custom Header */}
      <header className="onboarding-header">
        <div className="onboarding-logo">
          <div className="logo-icon-small">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">GramVenture<span className="text-gradient">AI</span></span>
          <span className="engine-badge">
            <span className="live-dot green"></span> SOVEREIGN ENGINE
          </span>
        </div>

        <div className="onboarding-nav-steps hidden-mobile">
          {navSteps.map((name, idx) => (
            <div key={idx} className={`nav-step ${step === idx + 1 ? 'active' : step > idx + 1 ? 'completed' : ''}`}>
              {idx + 1}. {name}
            </div>
          ))}
        </div>

        <button className="support-btn hidden-mobile">
          <HelpCircle size={16} /> Advisory Support
        </button>
      </header>

      {/* Main Content */}
      <div className="onboarding-content">
        
        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="progress-text">
            <span className="step-count text-cyan">STEP {step} OF 4</span>
            <span className="step-name">
              {step === 1 && "Entrepreneur Profile"}
              {step === 2 && "Geographic Context"}
              {step === 3 && "Financial Capacity"}
              {step === 4 && "Business Selection"}
            </span>
          </div>
          <div className="progress-bar-wrapper">
            {[1,2,3,4].map(s => (
              <div key={s} className={`progress-segment ${step >= s ? 'active' : ''}`}></div>
            ))}
          </div>
        </div>

        {/* Step Container */}
        <div className="step-card glass-card">
          {step === 1 && <Step1 formData={formData} updateForm={updateForm} onNext={handleNext} />}
          {step === 2 && <Step2 formData={formData} updateForm={updateForm} onNext={handleNext} onBack={handleBack} />}
          {step === 3 && <Step3 formData={formData} updateForm={updateForm} onNext={handleNext} onBack={handleBack} />}
          {step === 4 && <Step4 formData={formData} updateForm={updateForm} onSubmit={submitAnalysis} onBack={handleBack} />}
        </div>
        
        <div className="security-footer text-muted">
          <Check size={14} className="text-emerald" /> Government Scheme Aligned • 256-Bit Financial Encryption
        </div>

      </div>
    </div>
  );
};

// ==========================================
// STEP 1: ABOUT YOU
// ==========================================
const Step1 = ({ formData, updateForm, onNext }) => {
  const [customSkillInput, setCustomSkillInput] = useState('');
  const educations = ['School', 'Intermediate', 'Diploma', 'Graduate', 'Postgraduate', 'Other'];
  const suggestedSkills = ['Communication', 'Teaching', 'Farming', 'Sales', 'Computer Skills', 'Management'];

  const toggleSkill = (skill) => {
    const current = formData.skills;
    if (current.includes(skill)) {
      updateForm('skills', current.filter(s => s !== skill));
    } else {
      updateForm('skills', [...current, skill]);
    }
  };

  const addCustomSkill = () => {
    if (customSkillInput.trim() && !formData.skills.includes(customSkillInput.trim())) {
      updateForm('skills', [...formData.skills, customSkillInput.trim()]);
      setCustomSkillInput('');
    }
  };

  const isValid = formData.name.trim() !== '' && formData.age.trim() !== '';

  return (
    <div className="step-inner">
      <h2 className="step-title">Let's get to know you.</h2>
      <p className="step-desc">A few details will help GramVenture AI personalize your business analysis.</p>
      
      <div className="form-row two-col">
        <div className="form-group">
          <label>WHAT SHOULD WE CALL YOU?</label>
          <div className="input-wrapper">
            <User size={18} className="input-icon" />
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => updateForm('name', e.target.value)}
              placeholder="Your Name"
            />
          </div>
        </div>
        <div className="form-group">
          <label>HOW OLD ARE YOU?</label>
          <div className="input-wrapper">
            <input 
              type="number" 
              value={formData.age} 
              onChange={e => updateForm('age', e.target.value)}
              placeholder="e.g. 28"
            />
            <span className="input-suffix">YRS</span>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>WHAT IS YOUR HIGHEST EDUCATION LEVEL?</label>
        <div className="pill-group">
          {educations.map(edu => (
            <button 
              key={edu} 
              className={`select-pill ${formData.education === edu ? 'active' : ''}`}
              onClick={() => updateForm('education', edu)}
            >
              {formData.education === edu && <Check size={14} />} {edu}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="flex-between">
          <span>WHAT SKILLS DO YOU HAVE? (SELECT ALL THAT APPLY)</span>
          <span className="text-emerald text-sm">{formData.skills.length} SELECTED</span>
        </label>
        <div className="pill-group">
          {suggestedSkills.map(skill => (
            <button 
              key={skill} 
              className={`select-pill ${formData.skills.includes(skill) ? 'active' : ''}`}
              onClick={() => toggleSkill(skill)}
            >
              {formData.skills.includes(skill) && <Check size={14} />} {skill}
            </button>
          ))}
          {formData.skills.filter(s => !suggestedSkills.includes(s)).map(custom => (
            <button key={custom} className="select-pill active" onClick={() => toggleSkill(custom)}>
              <Check size={14} /> {custom}
            </button>
          ))}
          
          <div className="custom-skill-adder">
            <input 
              type="text" 
              placeholder="Add skill..." 
              value={customSkillInput}
              onChange={e => setCustomSkillInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCustomSkill()}
            />
            <button onClick={addCustomSkill} className="add-btn"><Plus size={16} /></button>
          </div>
        </div>
      </div>

      <div className="step-actions right-align">
        <button className="btn btn-primary next-btn" disabled={!isValid} onClick={onNext}>
          Continue to Location <ArrowRight size={18} className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// STEP 2: LOCATION
// ==========================================
const Step2 = ({ formData, updateForm, onNext, onBack }) => {
  const demoData = {
    "Tumkur": ["Hebbur", "Gulur", "Heggere"],
    "Hubli": ["Byahatti", "Kusugal", "Adarguchi"]
  };

  const handleDistrictChange = (e) => {
    updateForm('district', e.target.value);
    updateForm('village', ''); // Reset village
  };

  const isValid = formData.district !== '' && formData.village !== '';
  const villages = formData.district ? demoData[formData.district] : [];

  return (
    <div className="step-inner">
      <h2 className="step-title">Where do you want to start?</h2>
      <p className="step-desc">Your location defines your market opportunity and competition.</p>
      
      <div className="form-group">
        <label>SELECT DISTRICT</label>
        <select value={formData.district} onChange={handleDistrictChange} className="custom-select">
          <option value="" disabled>Select a district...</option>
          {Object.keys(demoData).map(dist => (
            <option key={dist} value={dist}>{dist}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>SELECT VILLAGE / AREA</label>
        <select 
          value={formData.village} 
          onChange={e => updateForm('village', e.target.value)} 
          className="custom-select"
          disabled={!formData.district}
        >
          <option value="" disabled>Select a village...</option>
          {villages.map(vil => (
            <option key={vil} value={vil}>{vil}</option>
          ))}
        </select>
      </div>

      <div className="step-actions split">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="btn btn-primary next-btn" disabled={!isValid} onClick={onNext}>
          Continue to Finance <ArrowRight size={18} className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// STEP 3: FINANCIAL CAPACITY
// ==========================================
const Step3 = ({ formData, updateForm, onNext, onBack }) => {
  const cap = parseFloat(formData.capital) || 0;
  const projectCost = cap / 0.10;
  const potentialLoan = projectCost * 0.90;

  const isValid = cap > 0;

  return (
    <div className="step-inner">
      <h2 className="step-title">Plan your funding.</h2>
      <p className="step-desc">Enter your available margin capital (your own investment) to see your project capacity.</p>
      
      <div className="form-group">
        <label>AVAILABLE MARGIN CAPITAL</label>
        <div className="currency-input-wrapper">
          <IndianRupee size={28} className="currency-icon" />
          <input 
            type="number" 
            className="large-currency-input"
            value={formData.capital} 
            onChange={e => updateForm('capital', e.target.value)}
            placeholder="0"
          />
        </div>
        {cap > 0 && (
          <div className="formatted-currency text-emerald">
            ₹{cap.toLocaleString('en-IN')}
          </div>
        )}
      </div>

      <div className="smart-funding-preview glass-panel">
        <h4 className="preview-title">Live Smart Funding Preview</h4>
        
        <div className="preview-grid">
          <div className="preview-item">
            <span className="p-label">Available Capital</span>
            <span className="p-val text-white">₹{cap.toLocaleString('en-IN')}</span>
          </div>
          <div className="preview-divider">/ 10% =</div>
          <div className="preview-item highlight">
            <span className="p-label">Total Project Cost</span>
            <span className="p-val text-gradient">₹{projectCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="preview-divider">* 90% =</div>
          <div className="preview-item">
            <span className="p-label">Potential Loan</span>
            <span className="p-val text-emerald">₹{potentialLoan.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <p className="preview-note">Based on standard 10% margin requirement for micro-enterprises.</p>
      </div>

      <div className="step-actions split">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="btn btn-primary next-btn" disabled={!isValid} onClick={onNext}>
          Continue to Business <ArrowRight size={18} className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// STEP 4: BUSINESS INTEREST
// ==========================================
const Step4 = ({ formData, updateForm, onSubmit, onBack }) => {
  const businesses = [
    { id: 'Retail Shop', icon: '🏪', desc: 'Grocery, electronics, or clothing.' },
    { id: 'Agricultural Processing', icon: '🌾', desc: 'Milling, packaging, or cold storage.' },
    { id: 'Teaching Services', icon: '📚', desc: 'Tutoring center or skill training.' }
  ];

  const isValid = formData.business !== '';

  return (
    <div className="step-inner">
      <h2 className="step-title">Select your business model.</h2>
      <p className="step-desc">Choose the primary category for your enterprise.</p>
      
      <div className="business-cards-grid">
        {businesses.map(b => (
          <div 
            key={b.id} 
            className={`business-card glass-panel ${formData.business === b.id ? 'active' : ''}`}
            onClick={() => updateForm('business', b.id)}
          >
            <div className="b-card-icon">{b.icon}</div>
            <h4 className="b-card-title">{b.id}</h4>
            <p className="b-card-desc">{b.desc}</p>
            <div className="b-card-check">
              <Check size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="step-actions split">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="btn btn-analyze next-btn glow-effect" disabled={!isValid} onClick={onSubmit}>
          ✦ Analyze My Business <ArrowRight size={18} className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
