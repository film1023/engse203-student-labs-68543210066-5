function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <div className="badge-container" style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span className={`badge priority-${request.priority}`}>
            {request.priority === 'urgent' ? 'เร่งด่วน' : 'ปกติ'}
          </span>
          <span className={`badge status-${request.status}`}>
            {request.status === 'pending' && 'รอดำเนินการ'}
            {request.status === 'in-progress' && 'กำลังดำเนินการ'}
            {request.status === 'completed' && 'เสร็จสิ้น'}
          </span>
        </div>
      </div>
      <button type="button" onClick={() => onDeleteRequest(request.id)}>ลบ</button>
    </article>
  );
}

export default RequestCard;

