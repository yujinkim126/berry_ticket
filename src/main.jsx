import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "@components/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReservationPage from "./Components/reservation/ReservationPage";

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
      {
        path: "/reservation",
        element: <ReservationPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
});
