Folder Structure

```bash
datatable-app/
├── app/
│   ├── globals.css          ← Tailwind + shadcn CSS variables
│   ├── layout.tsx           ← Root layout
│   └── page.tsx             ← Main page (wire up the table here)
├── components/
│   ├── ui/                  ← shadcn primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── select.tsx
│   └── data-table/          ← Your feature components
│       ├── columns.tsx      ← Column definitions
│       ├── toolbar.tsx      ← Search + Filter (left) + Export (right)
│       ├── export-button.tsx ← CSV / XLSX / JSON / PDF dropdown
│       └── data-table.tsx   ← The table itself (TanStack Table)
├── lib/
│   ├── utils.ts             ← cn() helper
│   ├── data.ts              ← Mock data (20 rows)
│   └── export.ts            ← All export logic
├── types/
│   └── index.ts             ← Shared types (Payment, Status)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs

```

```bash
# 1. Copy the project files
cd datatable-app

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

```

| **Feature**           | **Details**                                                                         |
|-----------------------|-------------------------------------------------------------------------------------|
| **Search**            | Filters across name, email, ID in real-time                                         |
| **Filter**            | Dropdown to filter by status (active / pending / inactive / cancelled)             |
| **Export CSV**        | Pure JS, no extra dependencies                                                     |
| **Export JSON**       | Instant download                                                                   |
| **Export XLSX**       | Via xlsx library (dynamic import)                                                  |
| **Export PDF**        | Via jsPDF + jsPDF-autotable with styled table                                      |
| **Sorting**           | Click column headers to sort                                                       |
| **Pagination**        | Previous / Next with row count                                                     |
| **Status Badges**     | Color-coded per status                                                             |




Install the dependencies using the following command:

```bash
npm install tailwindcss@latest postcss@latest autoprefixer@latest
npm install @tanstack/react-table
npm install xlsx
npm install jspdf jspdf-autotable
npm install clsx class-variance-authority

```