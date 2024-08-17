// /src/index.tsx or main.tsx(vite)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

async function enableMocking() {
  // 일반적인 경우
  // if (process.env.NODE_ENV !== 'development') {

  // vite의 경우
  if (!import.meta.env.DEV) {
    return;
  }

  // MSW의 worker를 비동기로 import
  const { worker } = await import("./mocks/browser");

  // 서비스 워커 시작
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
