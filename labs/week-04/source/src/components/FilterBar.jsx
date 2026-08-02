function FilterBar() {
  return (
    <div className="filter-bar" style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <label htmlFor="task-filter" style={{ fontWeight: 'bold' }}>🔍 ตัวกรอง:</label>
      <select id="task-filter" style={{ padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
        <option value="all">ทั้งหมด</option>
        <option value="active">กำลังทำ</option>
        <option value="completed">เสร็จสิ้น</option>
      </select>
    </div>
  );
}
export default FilterBar;
