# 🌌 Word Counter Pro - Premium Text Analytics

A sleek, cosmic-themed high-performance text analysis tool built with **Node.js 🟢**, **Express 🚂**, and **TypeScript 📘**. This application provides real-time statistics for word counts, character counts, and more, all wrapped in a stunning cosmic-themed glassmorphism interface.

## ✨ Features

- **⚡ Real-time Analysis**: Get instant feedback as you type, powered by an efficient debounced API.
- **🎨 Premium Aesthetics**: 
  - **💎 Glassmorphism**: Elegant transparent cards with backdrop blur.
  - **🌌 Dynamic Background**: Moving cosmic blobs and a three-layer animated galaxy star field.
  - **✨ Smooth Transitions**: Micro-animations for a fluid user experience.
- **📊 Deep Insights**:
  - 📝 Word Count
  - 🔤 Character Count (with spaces)
  - ✂️ Character Count (without spaces)

## 🚀 Tech Stack

- **⚛️ Frontend**: HTML5, Vanilla CSS3 (Custom Design System), TypeScript.
- **🖥️ Backend**: Node.js, Express.js.
- **🛠️ Tooling**: TypeScript Compiler (tsc), npm, Vercel CLI.

## 🛠️ Project Structure

```text
├── public/                 # Static assets (HTML, CSS, compiled JS)
│   ├── index.html          # Main entry point
│   ├── style.css           # Custom design system & animations
│   └── client/             # Compiled client-side TypeScript
├── src/                    # Source code
│   ├── client/             # Client-side TypeScript source
│   │   └── script.ts       # Main UI logic & API interaction
│   ├── controllers/        # Backend logic
│   │   └── analysis.controller.js
│   └── routes/             # API route definitions
│       └── analysis.routes.js
├── server.js               # Express server configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies & scripts
```

## 🏃 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. Clone or download the repository.
2. Open your terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. **Build the Client**: Compile the TypeScript files:
   ```bash
   npm run build
   ```
2. **Start the Server**:
   ```bash
   npm start
   ```
3. **Open in Browser**: Navigate to `http://localhost:5001`.

## 🔧 Technical Notes

- **Debouncing**: The client uses a custom type-safe `debounce` implementation to ensure we don't overwhelm the server with requests while the user is typing.
- **Modern CSS**: Uses `@supports` blocks for experimental properties like `backdrop-filter` and `background-clip`, ensuring both IDE clarity and browser compatibility.
- **Strict Typing**: TypeScript is configured with `strict: true` to ensure high code quality.
- **Accessibility**: All form elements (file input, textarea) include `aria-label` attributes.

## 🌩️ Vercel Deployment

To deploy this project to Vercel, use the Vercel CLI:

1. **Production Deploy**:
   ```powershell
   npx vercel --prod
   ```
2. **Configuration**: The project uses a custom `vercel.json` to handle static files from `public/` automatically and route `/api` to the Node.js server.
3. **Troubleshooting**: If you see a `500` error, ensure you are using the stable version of Express (`^4.19.2`) as specified in the `package.json`.
