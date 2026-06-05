# 🔥 Hageez Gas Tracker

A full-stack Progressive Web App (PWA) for managing daily gas plant operations — built for real-world use at a gas plant business in Nigeria. Tracks sales, cash remittances, stock deliveries, expenses, and generates financial reports with PDF export.

**Live:** [hggas.com.ng](https://hggas.com.ng)

---

## 📱 Features

### Entry
- Log daily opening and closing meter readings
- Opening meter **auto-fills** from the previous day's closing reading
- Price per kg **auto-fills** from the most recent price record
- Live preview shows kg sold, expected cash, and revenue as you type

### Records
- **Daily history** — full log of all meter entries with edit (admin) and delete (admin) controls
- **Weekly summary** — grouped weekly totals with a bar chart
- **Best/Worst week** — highlights your highest and lowest sales weeks with all-time stats

### Money
- **Cash & POS remittance** — log cash and POS payments separately; auto-compares total against expected revenue from the meter; flags shortfalls and surpluses
- **Expenses** — track daily running costs by category (fuel, maintenance, salary, transport, other); feeds into profit calculation

### Stock
- **Deliveries** — log every gas refill with supplier name, kg received, and cost price per kg; tracks total stock in vs sold to show remaining balance; low stock alert threshold
- **Prices** — log price changes with effective dates; Entry tab auto-fills current price

### Reports
- **Monthly summary** — kg sold, revenue, cash, POS, total payments, and variance per month; all-time totals at the bottom
- **Date range report** — select any custom date range with quick presets (Today, This Week, This Month, Last 7/30 days, Last Month); shows kg sold, revenue, payments, profit & loss, averages, and variance; **export to PDF**
- **Variance log** — auto-generated; flags every day with a cash shortfall, surplus, or missing remittance record

---

## 🔐 Role-Based Access Control

| Feature | Admin | Staff |
|---|---|---|
| View all data | ✅ | ✅ |
| Add entries | ✅ | ✅ |
| Edit records | ✅ | ❌ |
| Delete records | ✅ | ❌ |
| Clear all data | ✅ | ❌ |

- **Admin** is locked to a specific Firebase UID enforced at the Firestore rules level — not just the UI
- Staff can log in, input data, and view all reports but cannot modify or delete anything
- Role badge displayed in the header after login

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (zero frameworks) |
| Database | Firebase Firestore (real-time sync) |
| Auth | Firebase Authentication (Email/Password) |
| Hosting | Netlify (CI/CD via GitHub branches) |
| Charts | Chart.js |
| PDF Export | jsPDF + jsPDF-AutoTable |
| Excel Export | SheetJS (XLSX) |
| Icons | Tabler Icons |
| PWA | Web App Manifest + Service Worker |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────┐
│           Browser / PWA Shell           │
│  (Installable on Android & iOS)         │
└────────────────┬────────────────────────┘
                 │ HTTPS
┌────────────────▼────────────────────────┐
│           Netlify CDN                   │
│  main branch  →  hggas.com.ng           │
│  staging branch → gastrackerv2.netlify  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Firebase (Google Cloud)         │
│                                         │
│  ┌─────────────┐  ┌───────────────────┐ │
│  │ Firestore   │  │  Authentication   │ │
│  │             │  │                   │ │
│  │ dailyRecords│  │  Email/Password   │ │
│  │ cashRecords │  │  UID-based RBAC   │ │
│  │ stockRecords│  └───────────────────┘ │
│  │ expenseRecs │                        │
│  │ priceRecords│                        │
│  │ settings    │                        │
│  └─────────────┘                        │
└─────────────────────────────────────────┘
```

---

## 🔒 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dailyRecords/{docId} {
      allow read, create, update: if request.auth != null;
      allow delete: if request.auth.uid == "ADMIN_UID";
    }
    match /cashRecords/{docId} {
      allow read, create, update: if request.auth != null;
      allow delete: if request.auth.uid == "ADMIN_UID";
    }
    match /stockRecords/{docId} {
      allow read, create, update: if request.auth != null;
      allow delete: if request.auth.uid == "ADMIN_UID";
    }
    match /expenseRecords/{docId} {
      allow read, create, update: if request.auth != null;
      allow delete: if request.auth.uid == "ADMIN_UID";
    }
    match /priceRecords/{docId} {
      allow read, create, update: if request.auth != null;
      allow delete: if request.auth.uid == "ADMIN_UID";
    }
    match /settings/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🚀 Deployment

### Branching strategy
```
main     →  production (hggas.com.ng)
staging  →  staging environment (gastrackerv2.netlify.app)
```

### Deploy workflow
```bash
# 1. Work on staging
git checkout staging

# 2. Make changes, commit and push
git add .
git commit -m "feat: your feature description"
git push origin staging

# 3. Test on staging URL

# 4. Merge to production when confirmed
git checkout main
git merge staging
git push origin main
git checkout staging
```

---

## 📲 Installing as a Mobile App (PWA)

**Android (Chrome)**
1. Open [hggas.com.ng](https://hggas.com.ng) in Chrome
2. Tap the green **"Install Hageez Gas Tracker"** banner
3. Tap **Install** — icon appears on home screen

**iPhone (Safari)**
1. Open [hggas.com.ng](https://hggas.com.ng) in Safari
2. Tap the Share button → **Add to Home Screen**
3. Tap **Add**

Works fully offline after first load via service worker caching.

---

## 📁 Project Structure

```
├── index.html        # Full single-file PWA application
├── manifest.json     # PWA manifest (name, icons, theme)
├── sw.js             # Service worker (offline caching)
└── icons/
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

---

## 👤 Author

**Ajibola Sodiq (Musty)**
DevOps & Cloud Engineer

- GitHub: [@Musty2025x](https://github.com/Musty2025x)
- Docker Hub: [musty101](https://hub.docker.com/u/musty101)
- GitLab: [musty2025x](https://gitlab.com/musty2025x)

---

## 📄 License

Private — built for internal business use at Hageez Gas Plant.
