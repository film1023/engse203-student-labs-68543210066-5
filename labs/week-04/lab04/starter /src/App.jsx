import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import RequestForm from './components/RequestForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import RequestList from './components/RequestList.jsx';
import { initialRequests } from './data/initialRequests.js';

function App() {
  // 1. นำโครงสร้าง useState ของคุณมาจัดการระบบคำร้องแจ้งซ่อม
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');

  // 2. ปรับสูตรนับสถิติของคุณให้แมตช์กับคำว่า pending, processing, completed เพื่อให้เลขดีดเป็น 1 ครับ
  const summary = {
    total: requests.length,
    pending: requests.filter((req) => req.status === 'pending').length,
    inProgress: requests.filter((req) => req.status === 'processing').length,
    completed: requests.filter((req) => req.status === 'completed').length,
  };

  // 3. เงื่อนไขฟิลเตอร์กรองข้อมูลตามแท็บที่คุณกดเลือก
  const filteredRequests = statusFilter === 'all' ? requests : requests.filter((req) => req.status === statusFilter);

  // 4. ฟังก์ชันสำหรับกดปุ่ม "เพิ่มคำร้อง"
  function handleAddRequest(requestData) {
    const newRequest = { 
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`, 
      ...requestData, 
      status: 'pending' // บังคับให้เป็นรอดำเนินการตอนเริ่มสร้าง
    };
    setRequests((currentRequests) => [...currentRequests, newRequest]);
  }

  // 5. ฟังก์ชันสำหรับกดปุ่ม "ลบ" ข้อมูล
  function handleDeleteRequest(requestId) {
    setRequests((currentRequests) => currentRequests.filter((req) => req.id !== requestId));
  }

  return (
    <>
      <AppHeader title="Campus Service Request" subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI" />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          {/* ผูกฟังก์ชันเข้ากับหน้าปุ่มกดของแล็บ 4 */}
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
