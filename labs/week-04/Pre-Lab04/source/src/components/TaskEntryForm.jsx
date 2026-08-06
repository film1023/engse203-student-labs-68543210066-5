// src/components/TaskEntryForm.jsx
import { useState } from 'react';

function TaskEntryForm({ onAddTask }) {
  // 1. ตั้งค่าสถานะเริ่มต้นของฟอร์มแบบออบเจกต์ตามคู่มือบทที่ 8
  const initialForm = { title: '', category: '' };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  // 2. ฟังก์ชันจับการพิมพ์รวมชิ้นเดียว (Generic change handler)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  // 3. ระบบ Validation ตรวจสอบความถูกต้อง (Pure Function)
  const validateTask = (data) => {
    const validCategories = ['reading', 'coding', 'review'];
    const nextErrors = {};

    if (data.title.trim().length < 3) {
      nextErrors.title = 'ชื่องานต้องมีอย่างน้อย 3 ตัวอักษร';
    }
    if (!validCategories.includes(data.category)) {
      nextErrors.category = 'กรุณาเลือกหมวดหมู่ที่กำหนด';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ
    const nextErrors = validateTask(formData);

    // กรณีมีข้อผิดพลาด: เก็บค่าฟอร์มเดิมไว้ ห้าม Reset แล้วแสดง Error แจ้งเตือน
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFeedback('');
      return;
    }

    // กรณีข้อมูลถูกต้อง: ส่งข้อมูลขึ้น Parent ล้างฟอร์ม และขึ้นความสำเร็จ
    onAddTask(formData.title); // ส่งชื่อเรื่องขึ้นไปที่ App.jsx
    setFormData(initialForm);
    setErrors({});
    setFeedback('เพิ่มรายการสำเร็จ 🎉');
  };

  return (
    <form className="card mb-4" onSubmit={handleSubmit} style={{ padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
      <h3 className="card-title">📝 เพิ่มงานใหม่ (Controlled Form)</h3>
      
      {/* ⚠️ ส่วนแสดง Success Feedback รวมยอดใหญ่ */}
      {feedback && <p role="status" style={{ color: '#15803d', fontWeight: 'bold' }}>{feedback}</p>}

      {/* ช่องที่ 1: พิมพ์ชื่องาน */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="task-title-input" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>ชื่องาน:</label>
        <input
          id="task-title-input"
          name="title"
          type="text"
          className="form-control"
          placeholder="พิมพ์ชื่องานอย่างน้อย 3 ตัวอักษร..."
          value={formData.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        {/* Error ใกล้ Field ชื่องาน */}
        {errors.title && <p id="title-error" style={{ color: '#dc2626', margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>{errors.title}</p>}
      </div>

      {/* ช่องที่ 2: เลือกหมวดหมู่ (Mini Challenge) */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="task-category-select" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>หมวดหมู่:</label>
        <select
          id="task-category-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? 'category-error' : undefined}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        >
          <option value="">-- กรุณเลือกหมวดหมู่ --</option>
          <option value="reading">reading (การอ่าน)</option>
          <option value="coding">coding (การเขียนโค้ด)</option>
          <option value="review">review (การตรวจทาน)</option>
        </select>
        {/* Error ใกล้ Field หมวดหมู่ */}
        {errors.category && <p id="category-error" style={{ color: '#dc2626', margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>{errors.category}</p>}
      </div>

      <button type="submit" className="btn btn-primary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
        เพิ่มงานเข้าบอร์ด
      </button>
    </form>
  );
}

export default TaskEntryForm;
