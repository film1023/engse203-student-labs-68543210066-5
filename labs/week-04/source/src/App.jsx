import { useState } from 'react';
import { initialTasks } from './data/initialTasks.js';
import AppHeader from './components/AppHeader.jsx';
import TaskCard from './components/TaskCard.jsx';         // 👈 เพิ่มบรรทัดนี้
import TaskEntryForm from './components/TaskEntryForm.jsx'; // 👈 เพิ่มบรรทัดนี้
import SummaryPanel from './components/SummaryPanel.jsx'; // 👈 เพิ่มบรรทัดนี้
import FilterBar from './components/FilterBar.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const taskSummary = {
    total: tasks.length,
    doing: tasks.filter(t => !t.completed).length,
    done: tasks.filter(t => t.completed).length
  };

  const handleDelete = (id) => {
    setTasks((currentTasks) => currentTasks.filter(task => task.id !== id));
  };

  const handleAddTask = (title) => {
    const newTask = {
      id: `TASK-${Date.now()}`, 
      title: title,
      description: 'หมวดหมู่งานที่สร้างผ่านการตรวจเช็กและคัดกรองข้อมูล',
      completed: false
    };
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  return (
    <>
      <AppHeader title="Study Task Board (CP05)" subtitle="ระบบจัดการงานผ่านไฟล์แยกโมดูลเรียบร้อย!" />
      <main className="container page-content">
        
        <TaskEntryForm onAddTask={handleAddTask} />
        <SummaryPanel summary={taskSummary} />
        
        <div className="task-container">
          <div className="filter-bar" style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label htmlFor="task-filter" style={{ fontWeight: 'bold' }}>🔍 ตัวกรอง:</label>
            <select 
              id="task-filter" 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '0.25rem 0.5rem', borderRadius: '4px' }}
            >
              <option value="all">ทั้งหมด</option>
              <option value="active">กำลังทำ</option>
              <option value="completed">เสร็จสิ้น</option>
            </select>
          </div>
          <h2 className="section-title">
            {filteredTasks.length === 1 ? 'พบ 1 รายการ' : `พบ ${filteredTasks.length} รายการ`}
          </h2>
          <TaskList tasks={filteredTasks} onDelete={handleDelete} />
        </div>
      </main>
    </>
  );
}
export default App;
