import { useState } from 'react';

function RequestForm({ onAddRequest }) {
  // 🌟 สร้าง Controlled Form State ตามเกณฑ์
  const [formData, setFormData] = useState({
    requesterName: '',
    requestType: '',
    location: '',
    details: '',
    priority: 'normal'
  });

  // 🌟 สร้าง State สำหรับเก็บข้อความ Error เพื่อใช้กับ aria-invalid
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  // 🌟 ฟังก์ชัน onChange ดักจับการเปลี่ยนแปลงอินพุตทุกช่อง
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // เคลียร์ error ช่องนั้นๆ เมื่อเริ่มพิมพ์ใหม่
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // ตรวจสอบความถูกต้องของข้อมูลพื้นฐาน (Validation)
    const newErrors = {};
    if (!formData.requesterName.trim()) newErrors.requesterName = 'กรุณากรอกชื่อผู้แจ้ง';
    if (!formData.requestType) newErrors.requestType = 'กรุณาเลือกประเภทคำร้อง';
    if (!formData.location.trim()) newErrors.location = 'กรุณากรอกสถานที่';
    if (!formData.details.trim()) newErrors.details = 'กรุณากรอกรายละเอียด';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFeedback('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // เรียกฟังก์ชันส่งข้อมูลขึ้นไปอัปเดตแอปหลัก
    onAddRequest(formData);
    setFeedback('เพิ่มคำร้องสำเร็จเรียบร้อยแล้ว!');

    // ล้างค่าในฟอร์มหลังจากส่งข้อมูลสำเร็จ
    setFormData({
      requesterName: '',
      requestType: '',
      location: '',
      details: '',
      priority: 'normal'
    });
    setErrors({});
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input 
            id="requesterName" 
            name="requesterName" 
            value={formData.requesterName}
            onChange={handleChange}
            aria-invalid={!!errors.requesterName}
            aria-describedby={errors.requesterName ? "requesterName-error" : undefined}
          />
          <small className="error" id="requesterName-error">{errors.requesterName}</small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select 
            id="requestType" 
            name="requestType" 
            value={formData.requestType}
            onChange={handleChange}
            aria-invalid={!!errors.requestType}
            aria-describedby={errors.requestType ? "requestType-error" : undefined}
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
          </select>
          <small className="error" id="requestType-error">{errors.requestType}</small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input 
            id="location" 
            name="location" 
            value={formData.location}
            onChange={handleChange}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "location-error" : undefined}
          />
          <small className="error" id="location-error">{errors.location}</small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea 
            id="details" 
            name="details" 
            rows="4"
            value={formData.details}
            onChange={handleChange}
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? "details-error" : undefined}
          ></textarea>
          <small className="error" id="details-error">{errors.details}</small>
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>
          <label>
            <input 
              type="radio" 
              name="priority" 
              value="normal" 
              checked={formData.priority === 'normal'} 
              onChange={handleChange}
            /> ปกติ
          </label>
          <label>
            <input 
              type="radio" 
              name="priority" 
              value="urgent" 
              checked={formData.priority === 'urgent'} 
              onChange={handleChange}
            /> เร่งด่วน
          </label>
          <small className="error" id="priority-error"></small>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>
        <p className="status" role="status">{feedback}</p>
      </form>
    </section>
  );
}

export default RequestForm;
