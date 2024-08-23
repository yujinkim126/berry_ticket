import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "@components/Home";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );
});
