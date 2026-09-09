import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, UserCircle2 } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginType', 'user');
      navigate('/input');
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('loginType', 'guest');
    navigate('/input');
  };

  return (
    <div className="login-page-container">
      {/* Background Effects */}
      <div className="login-glow-bg"></div>
      
      <div className="login-card-wrapper">
        <div className="login-card glass-card">
          
          <div className="login-header">
            <div className="login-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Welcome to <span className="text-gradient">GramVenture AI</span></h2>
            <p>Enter your credentials to access your business command center.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Username</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Login to Dashboard <ArrowRight size={18} className="btn-icon-anim" />
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button onClick={handleGuestLogin} className="btn btn-secondary guest-btn">
            <UserCircle2 size={18} className="btn-icon" /> Continue as Guest
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
