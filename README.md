# Kinabetes — Early Kidney & Diabetes Screening App

> ระบบคัดกรองโรคไตและเบาหวานเบื้องต้นผ่านสติกเกอร์เคมี + AI วิเคราะห์ผล + เภสัชกรทางไกล

---

## Background

โรค NCDs เป็นสาเหตุการเสียชีวิตของคนไทยถึง **74%** หรือกว่า 400,000 คน/ปี  
ประชากรไทย 1 ใน 11 คนป่วยเป็นเบาหวาน และ **43–50%** ยังไม่รู้ตัวว่าป่วย  
ไทยมีผู้ป่วยโรคไตเรื้อรังสูงเป็น **อันดับ 4 ของโลก** เมื่อเทียบต่อประชากร 1 ล้านคน  
ปัจจุบัน สปสช. ใช้งบประมาณสูงถึง **1.2 หมื่นล้านบาท/ปี** รักษาโรคไตเรื้อรังเพียงโรคเดียว

## **Kinabetes** มุ่งแก้ปัญหานี้ตั้งแต่ระยะเริ่มต้น ด้วยการคัดกรองแบบ Home-based ที่เข้าถึงได้ทุกคน

## How It Works

```
แปะสติกเกอร์ที่คอห่าน → ปัสสาวะเปลี่ยนสี → ถ่ายรูปผ่านแอป
→ AI วิเคราะห์ผล → เภสัชกรทางไกลให้คำแนะนำ
```

1. **Kinabetes Testing Sticker** — แผ่นสติกเกอร์เคลือบ Reagent Strip ตรวจ Glucose + Microalbumin
2. **AI Color Calibration** — อ่านค่าสีจากภาพถ่ายในทุกสภาพแสง ด้วยความแม่นยำระดับการแพทย์
3. **Pharma-Triage Network** — เชื่อมต่อเภสัชกรทางไกล (Tele-pharmacy) ประเมินความเสี่ยงทันที

---

## App Features

| หน้าจอ         | รายละเอียด                               |
| -------------- | ---------------------------------------- |
| Home           | ภาพรวมสถานะสุขภาพและปุ่มเริ่มตรวจ        |
| Camera         | ถ่ายภาพสติกเกอร์ผ่านกล้อง                |
| Analyzing      | AI ประมวลผลค่าสีแบบ Real-time            |
| Result         | แสดงผลสถานะ Normal / Albumin / High Risk |
| Chat           | แชทกับเภสัชกรทางไกล                      |
| History        | ประวัติการตรวจย้อนหลัง                   |
| Monthly Report | รายงานสุขภาพประจำเดือน                   |
| Notifications  | การแจ้งเตือนและนัดหมาย                   |

### ผลการตรวจ 3 ระดับ

| ระดับ         | ความหมาย              | การดำเนินการ    |
| ------------- | --------------------- | --------------- |
| **NORMAL**    | ไตทำงานปกติ           | ติดตามต่อเนื่อง |
| **ALBUMIN**   | พบ Albumin (+1)       | ปรึกษาเภสัชกร   |
| **HIGH RISK** | พบทั้งน้ำตาล + โปรตีน | พบแพทย์ด่วน     |

---

```bash
# Clone repository
git clone <repo-url>
cd kinabetes-testing-sticker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.example.com
ANTHROPIC_API_KEY=your_api_key_here
```

### Run Development Server

```bash
npm run dev
# เปิด http://localhost:3000
```

---

## Project Structure

```
kinabetes-testing-sticker
│
├── node_modules
│
├── src
│   ├── assets
│   │   └── logo.png
│   │
│   ├── components
│   │   ├── AppHeader.tsx
│   │   ├── AppLayout.tsx
│   │   ├── BottomNav.tsx
│   │   ├── NavLink.tsx
│   │   ├── SubPageLayout.tsx
│   │   │
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input.tsx
│   │       ├── input-otp.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle.tsx
│   │       ├── toggle-group.tsx
│   │       ├── tooltip.tsx
│   │       └── use-toast.ts
│   │
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-theme.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib
│   │   └── utils.ts
│   │
│   ├── pages
│   │   ├── ChangePasswordPage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotificationsPage.tsx
│   │   ├── PharmacistPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ReportPage.tsx
│   │   ├── ScanPage.tsx
│   │   ├── SecurityPage.tsx
│   │   └── NotFound.tsx
│   │
│   ├── test
│   │   ├── example.test.ts
│   │   └── setup.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .gitignore
├── bun.lock
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── playwright.config.ts
├── playwright-fixture.ts
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── README.md
├── package.json
└── package-lock.json

```

---

## Social Impact

- ตรวจพบ Undiagnosed Diabetes (43–50% ของผู้ป่วยไทย) ได้เร็วขึ้น
- Diabetic Nephropathy → ลดผู้ป่วยไตวายเรื้อรัง
- ลดภาระงบประมาณ สปสช. 1.2 หมื่นล้าน/ปี
- ลดความเหลื่อมล้ำ — ผู้สูงอายุและผู้มีรายได้น้อยเข้าถึงการตรวจได้
- วัสดุย่อยสลายได้ ลดขยะทางการแพทย์

สอดคล้องกับ **SDGs ข้อที่ 3** (Good Health and Well-Being)
