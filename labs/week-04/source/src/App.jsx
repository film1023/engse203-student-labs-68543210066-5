import { useState } from 'react';
import { initialTasks } from './data/initialTasks.js';

// 1. เพิ่ม { title, subtitle } เพื่อรับค่า Props เข้ามาใช้งาน
function AppHeader({ title, subtitle }) {
  return (
    <header className="hero">
      <div className="container">
        <p className="eyebrow">ENGSE203 • PRE-LAB 04 • CP02</p>
        {/* นำตัวแปรที่รับมามาแสดงผลในเครื่องหมายปีกกา { } */}
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}

// 3. เพิ่ม onDelete เข้ามาในตัวรับข้อมูล Props ของการ์ด
function TaskCard({ task, onDelete }) {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{task.title}</h3>
        <p className="card-text">{task.description}</p>
        <div className="card-actions">
          <span className={`badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
            {task.completed ? 'เสร็จสิ้น' : 'กำลังทำ'}
          </span>
          
          {/* เพิ่มปุ่มกดลบที่จะทำงานส่ง ID กลับไปหาฟังก์ชันหลักตัวบน */}
          <button 
            className="btn btn-danger btn-sm" 
            onClick={() => onDelete(task.id)}
          >
            ลบงาน
          </button>
        </div>
      </div>
    </div>
  );
}

// 1. เพิ่ม Component สำหรับช่องพิมพ์เพิ่มงานใหม่
function TaskEntryForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // ถ้าช่องพิมพ์ว่างเปล่า ไม่ให้กดส่งข้อมูล
    
    onAddTask(title); // ส่งชื่อที่พิมพ์กลับไปหาฟังก์ชันหลักด้านล่าง
    setTitle(''); // ล้างช่องพิมพ์ให้กลับมาว่างเปล่าหลังกดเพิ่มงานสำเร็จ
  };

  // แก้ตรงส่วน return ของฟังก์ชัน TaskEntryForm ให้มี label ผูกเข้ากับ input
return (
  <form className="card mb-4" onSubmit={handleSubmit}>
    <div className="card-body">
      {/* 1. เพิ่ม Label และผูก id/htmlFor เข้าหากัน */}
      <label htmlFor="task-title-input" className="form-label font-bold mb-2 block">
        เพิ่มงานใหม่
      </label>
      
      <div className="input-group">
        <input
          id="task-title-input" // 2. ใส่ id ให้ตรงกับ htmlFor ด้านบน
          type="text"
          className="form-control"
          placeholder="พิมพ์ชื่อเรื่องงานที่นี่..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-required="true" // 3. เสริมความปลอดภัย/ความเข้าถึงง่าย
        />
        <button type="submit" className="btn btn-primary">
          เพิ่มงาน
        </button>
      </div>
    </div>
  </form>
);

}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // 2. เพิ่มฟังก์ชันสำหรับสร้างโครงสร้าง Object งานใหม่นำไปบวกเพิ่มใน State
  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(), // ใช้เวลาปัจจุบันจำลองเป็น ID ที่ไม่ซ้ำกัน
      title: title,
      description: 'งานที่เพิ่มขึ้นมาใหม่ในระบบ',
      completed: false
    };
    setTasks([...tasks, newTask]); // นำชิ้นงานใหม่ไปต่อท้ายอาเรย์เดิมใน State
  };

  return (
    <>
      <AppHeader title="Study Task Board (CP05)" subtitle="ระบบจัดการงานผ่าน Form และ Controlled Component" />
      <main className="container page-content">
        
        {/* 3. เรียกใช้งานฟอร์มพิมพ์เพิ่มงาน และส่งฟังก์ชัน handleAddTask เข้าไปผ่าน Props */}
        <TaskEntryForm onAddTask={handleAddTask} />

        <div className="task-container">
          <h2 className="section-title">รายการงานทั้งหมด ({tasks.length})</h2>
          <div className="task-list">
            {tasks.map((item) => (
              <TaskCard key={item.id} task={item} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}


export default App;

