# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: ธีรนัย (film1023)
- รหัสนักศึกษา: 685432100665
- Section: 2

## URLs

- Repository: https://github.com
- Pull Request: https://github.com/pull/4
- GitHub Pages: https://film1023.github.io/engse203-student-labs-685432100665/

## Component Tree

```text
App (State Owner: requests, statusFilter)
├── AppHeader (Props: title, subtitle)
├── SummaryPanel (Props: summary)
├── RequestForm (Props: onAddRequest)
└── FilterBar & RequestList
    ├── FilterBar (Props: value, onFilterChange)
    └── RequestList (Props: requests, onDeleteRequest)
        └── RequestCard (Props: request, onDeleteRequest)
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

- **State Owner**: Component `App` เป็นผู้เก็บสถานะหลัก ได้แก่ `requests` (รายการคำร้องทั้งหมด) และ `statusFilter` (สถานะการคัดกรองข้อมูล) และ component `RequestForm` เป็นผู้เก็บสถานะ `formData` และ `errors` สำหรับควบคุมข้อมูลฟอร์ม
- **Props Flow**: ข้อมูลไหลจาก `App` ลงไปยัง Component ย่อย เช่น `summary` ส่งไปยัง `SummaryPanel`, `filteredRequests` ส่งไปยัง `RequestList` และ `statusFilter` ส่งไปยัง `FilterBar`
- **Callback Flow**: เมื่อเกิด Event ใน Component ย่อย จะใช้ Callback Function ส่งข้อมูลกลับขึ้นมายัง `App` เช่น `onAddRequest` ส่งจาก `RequestForm` และ `onDeleteRequest` ส่งจาก `RequestCard` ผ่าน `RequestList`

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดงรายการคำร้องเริ่มต้นพร้อมป้ายสถานะถูกต้อง | Pass | ดูได้จากหน้าเว็บ GitHub Pages |
| TC-02 Controlled input | พิมพ์ข้อมูลลงในฟอร์มแล้ว State อัปเดตตามจริง | Pass | ระบบทำงานผ่านองค์ประกอบ Controlled Component |
| TC-03 Invalid | หากข้อมูลไม่ครบ ระบบพ่นข้อความ Error แจ้งเตือนในฟอร์ม | Pass | แสดงผล Error และล็อกฟอร์มไม่ให้ส่ง |
| TC-04 Valid add | กดเพิ่มคำร้องสำเร็จ รายการคำร้องและบอร์ดสถิติด้านบนอัปเดตทันที | Pass | รายการถูกเพิ่มเข้าไปในระบบ State อัตโนมัติ |
| TC-05 Filter | เลือกกรองสถานะแล้ว ข้อมูลคัดกรองตามเงื่อนไขถูกต้อง | Pass | แสดงเฉพาะรายการที่เลือก |
| TC-06 All | เลือกแสดงทั้งหมดแล้ว ข้อมูลกลับมาครบถ้วน | Pass | ฟิลเตอร์สลับกลับมาเป็น 'all' ได้สมบูรณ์ |
| TC-07 Empty | เมื่อลบคำร้องจนหมด ระบบจัดการแสดงผลสถานะว่างเปล่าได้ | Pass | รองรับเงื่อนไข Array ว่าง |
| TC-08 Delete | กดปุ่มลบคำร้องแล้ว รายการชิ้นนั้นหายไปจากหน้าจอทันที | Pass | ฟังก์ชัน onDeleteRequest ทำงานถูกต้อง |
| TC-09 Mobile | หน้าตา UI จัดเรียงเหมาะสมเมื่อเปิดบนขนาดหน้าจอมือถือ | Pass | โครงสร้าง CSS Responsive |
| TC-10 Keyboard | สามารถใช้ปุ่ม Tab และปุ่ม Enter ควบคุมการส่งฟอร์มได้ | Pass | รองรับมาตรฐาน Accessibility |
| TC-11 Build | สั่ง npm run build แล้วผ่านฉลุย ไม่มี Error ในคอมไพเลอร์ | Pass | ผลลัพธ์เก็บใน publish/ หรือ dist/ สมบูรณ์ |
| TC-12 Pages | ปุ่ม Source ลิงก์ไปยังคลังข้อมูลถูกต้อง หน้าเว็บใช้งานได้ปกติ | Pass | GitHub Pages อัปเดตผ่านระบบ Hub สำเร็จ |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: ระบบแสดงผลแจ้งเตือนกล่องอินพุตเมื่อข้อมูลว่าง

## Week 03 → Week 04 Reflection

ในสัปดาห์ที่ 3 เราใช้ DOM mutation ในการเข้าไปจับกลุ่ม Elements และเปลี่ยนค่าบนหน้าจอตรง ๆ ซึ่งเขียนยากและเสี่ยงต่อการเกิดข้อผิดพลาดเมื่อโปรเจกต์มีขนาดใหญ่ขึ้น แต่ในสัปดาห์ที่ 4 เมื่อเปลี่ยนมาใช้ State-driven UI ของ React ทำให้นักพัฒนาหันมาโฟกัสแค่การเปลี่ยนค่าใน Object State เท่านั้น แล้วปล่อยให้ React จัดการวาดหน้าจอใหม่ให้อัตโนมัติ ช่วยให้โค้ดสะอาด เป็นระเบียบ และบำรุงรักษาง่ายขึ้นมากครับ

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้: ใช้ระบบ AI Collaborator ในการช่วยตรวจสอบข้อผิดพลาดด้านตัวสะกดของเงื่อนไขฟิลเตอร์ และช่วยจัดโครงสร้างโค้ดตามกติกาของตัวตรวจแล็บให้ผ่านเกณฑ์
