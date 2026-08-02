// src/components/SummaryPanel.jsx
function SummaryPanel({ summary }) {
  return (
    <section className="panel" aria-labelledby="summary-title" style={{ marginBottom: '1.5rem' }}>
      <h2 id="summary-title" className="section-title">📊 ภาพรวมแดชบอร์ด (Props)</h2>
      
      {/* จัดบล็อกแสดงผลตัวเลขทั้ง 4 ค่าแยกจากกันตาม Mini Challenge */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        <p style={{ margin: 0 }}>📋 ทั้งหมด: <strong>{summary.total}</strong></p>
        <p style={{ margin: 0, color: '#d97706' }}>⏳ กำลังทำ: <strong>{summary.doing}</strong></p>
        <p style={{ margin: 0, color: '#15803d' }}>✅ เสร็จสิ้น: <strong>{summary.done}</strong></p>
      </div>
    </section>
  );
}

export default SummaryPanel;
