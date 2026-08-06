// ดึงสไตล์ตามข้อกำหนดระบบสร้างไฟล์ของอาจารย์
import './style.css'; 

// TODO 1: ดึง Element ฟอร์มและกล่อง preview มาใช้งาน
const form = document.querySelector('#requestForm'); // ใช้ id ให้ตรงกับหน้า index.html ของเรา
const studentNameInput = document.querySelector('#studentName');
const livePreview = document.querySelector('#livePreview');
const requestList = document.querySelector('#requestList');

console.log('LAB 3 starter ready', form);

// TODO 3 & TODO 6: ดักจับเหตุการณ์การพิมพ์เพื่อทำ Live Preview ทันที
studentNameInput.addEventListener('input', (e) => {
    // ป้องกันช่องโหว่ความปลอดภัยด้วยการใช้ textContent
    livePreview.textContent = e.target.value || "พิมพ์ข้อความเพื่อดูตัวอย่าง...";
});

// TODO 4, 5 & 6: ตรวจสอบความถูกต้องและดักจับเหตุการณ์ตอนกด Submit ฟอร์ม
form.addEventListener('submit', (e) => {
    e.preventDefault(); // บล็อกการโหลดหน้าใหม่เพื่อประมวลผลผ่าน JS ตามเงื่อนไข

    // TODO 2: อ่านค่าจากฟอร์ม
    const nameValue = studentNameInput.value.trim();
    const nameError = document.querySelector('#nameError');

    // TODO 4 & 5: ตรวจสอบและแสดงผลข้อผิดพลาด (Validate & Render Error)
    if (nameValue === "") {
        nameError.textContent = "กรุณากรอกชื่อ-นามสกุลให้เรียบร้อย";
        return; // สั่งหยุดทำงานทันที ห้ามเพิ่มข้อมูลลงลิสต์
    }

    // หากข้อมูลผ่านการตรวจสอบเรียบร้อย (Valid)
    nameError.textContent = ""; // ล้างคำเตือนข้อผิดพลาดเก่าออก
    
    // บันทึกและแสดงผลรายการใหม่ลงในลิสต์
    const li = document.createElement('li');
    li.textContent = `คำร้องจากคุณ: ${nameValue}`;
    requestList.appendChild(li);

    // แจ้งเตือนความสำเร็จ
    alert("ส่งคำร้องสำเร็จแล้ว!");

    // รีเซ็ตเคลียร์ข้อมูลในฟอร์มและกล่อง Live Preview ให้กลับเป็นค่าเริ่มต้น
    form.reset();
    livePreview.textContent = "พิมพ์ข้อความเพื่อดูตัวอย่าง...";
});
