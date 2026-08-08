import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import RequestForm from './components/RequestForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import RequestList from './components/RequestList.jsx';
import { initialRequests } from './data/initialRequests.js';

function App() {
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');

  const summary = {
    total: requests.length,
    pending: requests.filter((req) => req.status === 'pending').length,
    inProgress: requests.filter((req) => req.status === 'processing').length,
    completed: requests.filter((req) => req.status === 'completed').length,
  };

  const filteredRequests = statusFilter === 'all' ? requests : requests.filter((req) => req.status === statusFilter);

  function handleAddRequest(requestData) {
    const newRequest = { 
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`, 
      ...requestData, 
      status: 'pending'
    };
    setRequests((currentRequests) => [...currentRequests, newRequest]);
  }

  function handleDeleteRequest(requestId) {
    setRequests((currentRequests) => currentRequests.filter((req) => req.id !== requestId));
  }

  return (
    <>
      <AppHeader title="Campus Service Request" subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI" />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddRequest={handleAddRequest} />
          <section className="panel">
            <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            <RequestList requests={filteredRequests} onDeleteRequest={handleDeleteRequest} />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
