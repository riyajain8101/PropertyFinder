import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PropertyListings from './pages/PropertyListings';
import Neighborhoods from './pages/Neighborhoods';
import AgentProfiles from './pages/AgentProfiles';
import AdGeneration from './pages/AdGeneration';

function App() {
  const [activeTab, setActiveTab] = useState('listings');
  const [apiStatus, setApiStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');

  useEffect(() => {
    // Check if API is available
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/health', { 
          method: 'GET',
          timeout: 5000 
        } as RequestInit);
        setApiStatus(response.ok ? 'available' : 'unavailable');
      } catch (error) {
        setApiStatus('unavailable');
      }
    };

    checkApiStatus();
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'listings':
        return <PropertyListings apiStatus={apiStatus} />;
      case 'neighborhoods':
        return <Neighborhoods apiStatus={apiStatus} />;
      case 'agents':
        return <AgentProfiles apiStatus={apiStatus} />;
      case 'ads':
        return <AdGeneration apiStatus={apiStatus} />;
      default:
        return <PropertyListings apiStatus={apiStatus} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} apiStatus={apiStatus}>
      {renderPage()}
    </Layout>
  );
}

export default App;