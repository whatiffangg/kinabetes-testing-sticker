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
git clone https://github.com/your-org/kinabetes.git
cd kinabetes

# Install dependencies
pnpm install

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
pnpm dev
# เปิด http://localhost:3000
```

---

## Project Structure

```
src/
├── components/
│   └── kinabetes/
│       ├── HomeScreen.tsx
│       ├── CameraScreen.tsx
│       ├── AnalyzingScreen.tsx
│       ├── ResultScreen.tsx
│       ├── ChatScreen.tsx
│       ├── HistoryScreen.tsx
│       ├── MonthlyReportScreen.tsx
│       ├── PharmacistHistoryScreen.tsx
│       ├── NotificationsScreen.tsx
│       ├── AccountScreen.tsx
│       ├── BottomNav.tsx
│       └── AppHeader.tsx
├── types/
│   └── kinabetes.ts          # AppState, AnalysisResult, ResultData
└── app/
    └── page.tsx              # Main app entry point
```

---

## Social Impact

- ตรวจพบ Undiagnosed Diabetes (43–50% ของผู้ป่วยไทย) ได้เร็วขึ้น
- Diabetic Nephropathy → ลดผู้ป่วยไตวายเรื้อรัง
- ลดภาระงบประมาณ สปสช. 1.2 หมื่นล้าน/ปี
- ลดความเหลื่อมล้ำ — ผู้สูงอายุและผู้มีรายได้น้อยเข้าถึงการตรวจได้
- วัสดุย่อยสลายได้ ลดขยะทางการแพทย์

สอดคล้องกับ **SDGs ข้อที่ 3** (Good Health and Well-Being)
