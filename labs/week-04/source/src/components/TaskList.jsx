// src/components/TaskList.jsx
import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onDelete }) {
  // 🛠️ เพิ่มระบบ Empty State เมื่องานว่างเปล่าตามที่โจทย์ระบุ
  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status" style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
        <h3>🔍 ยังไม่มีรายการในสถานะนี้</h3>
        <p>ลองเปลี่ยนตัวกรองหรือเพิ่มงานใหม่ดูนะ</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((item) => (
        <TaskCard key={item.id} task={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
