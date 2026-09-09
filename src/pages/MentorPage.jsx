import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BrainCircuit, Send, User, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, RefreshCw, Loader } from 'lucide-react';
import './MentorPage.css';

// Basic Markdown Parser (handles **bold**, *italic*, \n\n, and basic unordered lists)
const renderMarkdown = (text) => {
  if (!text) return null;
  
  const blocks = text.split('\n\n');
  
  return blocks.map((block, i) => {
    // Check if it's a list block
    if (block.trim().startsWith('- ') || block.trim().startsWith('* ')) {
      const listItems = block.split('\n').map((item, idx) => {
        const cleanItem = item.replace(/^[-*]\s/, '');
        return <li key={idx}>{parseInline(cleanItem)}</li>;
      });
      return <ul key={i}>{listItems}</ul>;
    }
    
    // Check if it's a heading block (simplistic)
    if (block.trim().startsWith('### ')) {
      return <h4 key={i}>{parseInline(block.replace('### ', ''))}</h4>;
    }
    if (block.trim().startsWith('## ')) {
      return <h3 key={i}>{parseInline(block.replace('## ', ''))}</h3>;
    }
    
    return <p key={i}>{parseInline(block)}</p>;
  });
};

const parseInline = (text) => {
  // Bold
  let parsed = text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
  return parsed;
};


const MentorPage = () => {
  const { userData } = useOutletContext();
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const safeData = userData || { 
    capital: '100000', 
    name: 'Guest', 
    business: 'Retail Shop', 
    village: 'Demo Village',
    district: 'Demo District',
    skills: 'Customer service, basic accounting',
    education: 'High School'
  };
  
  const availableMarginCapital = parseFloat(safeData.capital) || 100000;
  const projectCost = availableMarginCapital / 0.10;
  const potentialLoan = projectCost * 0.90;

  const userProfile = {
    name: safeData.name || 'Not available',
    business: safeData.business || 'Not available',
    village: safeData.village || 'Not available',
    district: safeData.district || 'Not available',
    capital: formatCurrency(availableMarginCapital),
    projectCost: formatCurrency(projectCost),
    potentialLoan: formatCurrency(potentialLoan),
    skills: safeData.skills || 'Not available',
    education: safeData.education || 'Not available'
  };

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm your GramVenture AI Business Mentor. I already know the business information you provided, so you can ask me questions about your business idea, finances, risks, or scheme options."
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { role: 'user', content: textToSend.trim() }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    setError(null);

    // Limit history to last 10 messages for API
    const historyForApi = newMessages.slice(-10);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend.trim(),
          user_profile: userProfile,
          conversation_history: historyForApi.slice(0, -1) // Exclude current message
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      console.error('API Error:', err);
      setError("Your AI Mentor is temporarily unavailable. Please try again.");
      // Pop the user message so they can retry easily if needed, or leave it and show error inline.
      // Let's leave it and just show the error message block.
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Is my business idea viable?",
    "What are the biggest risks in my business?",
    "How much funding can I potentially plan for?",
    "Which schemes should I explore?",
    "What should I do before applying for funding?",
    "How can I improve my business idea?"
  ];

  function formatCurrency(amount) {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  }

  return (
    <div className="mentor-page fade-in">
      
      <header className="page-header">
        <h1 className="page-title"><BrainCircuit size={28} className="text-emerald inline-icon" /> AI Business Mentor</h1>
        <p className="page-subtitle">Your personalized AI advisor for smarter business decisions.</p>
      </header>

      {/* Business Context Card */}
      <div className="context-card-wrapper mb-4">
        <div 
          className="context-card-header glass-panel interactive" 
          onClick={() => setShowContext(!showContext)}
        >
          <div className="c-header-left">
            <span className="context-status">
              <span className="status-dot"></span> AI Context Loaded
            </span>
          </div>
          <div className="c-header-right">
            {showContext ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        {showContext && (
          <div className="context-card-body glass-card">
            <div className="context-grid">
              <div className="c-item">
                <span className="c-label">🏪 Business</span>
                <span className="c-val">{userProfile.business}</span>
              </div>
              <div className="c-item">
                <span className="c-label">📍 Location</span>
                <span className="c-val">{userProfile.village}, {userProfile.district}</span>
              </div>
              <div className="c-item">
                <span className="c-label">💰 Margin Capital</span>
                <span className="c-val">{userProfile.capital}</span>
              </div>
              <div className="c-item">
                <span className="c-label">📊 Project Capacity</span>
                <span className="c-val text-cyan">{userProfile.projectCost}</span>
              </div>
              <div className="c-item">
                <span className="c-label">🏦 Potential Loan</span>
                <span className="c-val text-emerald">{userProfile.potentialLoan}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="suggested-questions mb-4">
          <h3 className="section-label">Ask your Business Mentor:</h3>
          <div className="chips-container">
            {suggestedQuestions.map((q, i) => (
              <button 
                key={i} 
                className="chip-btn glass-panel"
                onClick={() => handleSend(q)}
                disabled={isTyping}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="chat-container glass-card">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-row ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="avatar ai-avatar">
                  <BrainCircuit size={20} />
                </div>
              )}
              
              <div className={`message-bubble ${msg.role}-bubble`}>
                {msg.role === 'assistant' && <div className="msg-name">GramVenture AI Mentor</div>}
                <div className="msg-content">
                  {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="avatar user-avatar">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="message-row assistant">
              <div className="avatar ai-avatar pulsing">
                <BrainCircuit size={20} />
              </div>
              <div className="message-bubble assistant-bubble typing-bubble">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
                <span className="typing-text">GramVenture AI is thinking...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="message-row error-row">
              <div className="error-bubble glass-panel">
                <AlertTriangle size={18} className="text-red" />
                <span>{error}</span>
                <button className="btn-retry" onClick={() => handleSend(messages[messages.length-1]?.content)}>
                  <RefreshCw size={14} /> Retry
                </button>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input-area">
          <textarea
            className="chat-textarea"
            placeholder="Ask anything about your business..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            rows={1}
          />
          <button 
            className={`send-btn ${input.trim() ? 'active' : ''}`} 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            {isTyping ? <Loader size={20} className="spinner" /> : <Send size={20} />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default MentorPage;
