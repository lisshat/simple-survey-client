# Simple Survey Client (React + TypeScript)

This is the frontend for the Simple Survey App. It allows users to fill out a multi-step survey form and view previously submitted responses.

## 🛠 Technologies Used
- React
- TypeScript
- Axios
- React Router DOM

## 📁 Folder Structure
```
simple-survey-client/
├── public/
├── src/
│   ├── pages/
│   │   ├── SurveyForm.tsx
│   │   └── SurveyResponses.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── api.ts
│   ├── types.ts
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Running the App

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

Make sure your backend API is running at `http://localhost:5000`.

## ✨ Features
- Step-by-step survey form
- File uploads (.pdf)
- Live form validation
- Submission preview
- Response filtering and pagination
