# 💰 Money Tracking App

> แอพบันทึกรายรับ-รายจ่ายส่วนตัว พร้อมแดชบอร์ดสรุปยอดเงินคงเหลือแบบเรียลไทม์

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white" />
</p>

---

## 🎬 Demo

https://github.com/user-attachments/assets/4cda38fc-cc3c-45da-b163-4fbf198e68b7

---

## 📱 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/a0b98886-20cd-4ad7-acdc-db0c2be6ae54" width="22%" alt="Splash Screen" />
  <img src="https://github.com/user-attachments/assets/d706e179-f129-4b3e-afce-406811a6567d" width="22%" alt="Welcome Screen" />
  <img src="https://github.com/user-attachments/assets/ddec8f32-3980-42b4-ae7b-4cf31e04b533" width="22%" alt="Home Screen" />
  <img src="https://github.com/user-attachments/assets/7bbf1977-709a-402d-bf5a-1db2f81a5bec" width="22%" alt="Income Screen" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/85928f62-3e40-48d1-9d98-751b2cd79993" width="22%" alt="Expenses Screen" />
</p>

---

## ✨ Features

- 🏠 **Dashboard** — แสดงยอดเงินคงเหลือ พร้อมสรุปเงินเข้า/ออกรวม
- ⬇️ **บันทึกเงินเข้า** — กรอกรายการรายรับ พร้อม validate UI
- ⬆️ **บันทึกเงินออก** — กรอกรายการรายจ่าย พร้อม validate UI
- 📋 **ประวัติธุรกรรม** — แสดงรายการทั้งหมดเรียงจากล่าสุด
- 👁️ **ซ่อน/แสดงยอดเงิน** — ความเป็นส่วนตัวเมื่อใช้ในที่สาธารณะ
- 🔄 **Pull-to-refresh** — ดึงข้อมูลล่าสุดจาก Supabase
- 🎨 **Empty State** — UI สวยงามตอนยังไม่มีข้อมูล พร้อม CTA
- 💡 **Tip Card** — เกร็ดความรู้การเงินส่วนบุคคล

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React Native + Expo SDK 54 |
| **Language** | TypeScript |
| **Routing** | Expo Router (file-based) |
| **Backend** | Supabase (PostgreSQL + RLS) |
| **State** | React Hooks + AsyncStorage |
| **UI** | Linear Gradient + Ionicons |

---

## 📂 Project Structure

```
money-tracking-app/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Splash screen
│   ├── welcome.tsx              # Welcome screen
│   └── (tabs)/
│       ├── _layout.tsx          # Tab bar
│       ├── home.tsx             # Dashboard
│       ├── income.tsx           # Add income
│       └── expenses.tsx         # Add expense
├── components/
│   ├── BalanceCard.tsx          # Gradient balance card
│   ├── TransactionItem.tsx      # Transaction list item
│   ├── AddTransactionForm.tsx   # Reusable form
│   └── EmptyState.tsx           # Empty state with CTA
├── hooks/
│   ├── useTransactions.ts       # Fetch + create transactions
│   └── useBalance.ts            # Calculate balance
├── services/
│   └── supabase.ts              # Supabase client
├── types/
│   └── index.ts                 # TypeScript types
├── constants/
│   └── colors.ts                # Theme colors (BBL blue)
└── utils/
    ├── formatCurrency.ts
    └── formatDate.ts            # Thai date format
```

---

## 🗄️ Database Schema

```sql
create table transactions (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('income', 'expense')),
  amount      numeric(12, 2) not null check (amount > 0),
  description text not null,
  date        date not null default current_date,
  created_at  timestamptz not null default now()
);

create index idx_transactions_date on transactions(date desc);
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app (iOS/Android) หรือ emulator
- Supabase account

### 1. Clone & Install

```bash
git clone https://github.com/chanathip66/money-tracking-app.git
cd money-tracking-app
npm install
```

### 2. Setup Supabase

สร้างไฟล์ `.env` ที่ root ของโปรเจค:

```env
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

แล้วรัน SQL schema ด้านบนใน Supabase SQL Editor

### 3. Run

```bash
npx expo start
```

สแกน QR code ด้วย Expo Go app

---

## 🎨 Design System

ธีมสีน้ำเงินกรุงเทพ (BBL inspired):

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#003F7F` | ปุ่มหลัก, gradient |
| Primary Light | `#1E5BA8` | gradient end |
| Income | `#16A34A` | รายรับ |
| Expense | `#DC2626` | รายจ่าย |
| Background | `#F4F7FB` | พื้นหลัง |

---

## 👨‍💻 Author

**Chanathip Chueycherm**
Student ID: `6852D10005`
South-East Asia University (SAU)

---

<p align="center">
  Made with ❤️ using React Native & Expo
</p>
