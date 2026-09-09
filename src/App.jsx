import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import FeasibilityPage from './pages/FeasibilityPage';
import FinancePage from './pages/FinancePage';
import SchemesPage from './pages/SchemesPage';
import MentorPage from './pages/MentorPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

function App() {
  const location = useLocation();
  const isOnboarding = location.pathname === '/input';
  const isLogin = location.pathname === '/login';
  const isDashboardLayout = location.pathname.startsWith('/dashboard') || 
                            location.pathname === '/feasibility' || 
                            location.pathname === '/finance' || 
                            location.pathname === '/schemes' || 
                            location.pathname === '/mentor';

  return (
    <div className="app-container">
      {!isOnboarding && !isLogin && !isDashboardLayout && <Navbar />}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/input" element={<OnboardingPage />} />
        
        {/* Dashboard Layout Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/feasibility" element={<FeasibilityPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/mentor" element={<MentorPage />} />
        </Route>
      </Routes>
      
      {!isOnboarding && !isDashboardLayout && <Footer />}
      {!isOnboarding && !isDashboardLayout && <BottomNav />}
    </div>
  );
}

export default App;
