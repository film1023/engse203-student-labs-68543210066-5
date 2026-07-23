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
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
            ลบงาน
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskCard;
