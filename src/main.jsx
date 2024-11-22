import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "../public/css/custom_skeleton.css";
import App from "./App";
import Home from "@Components/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReservationPage from "./Components/reservation/ReservationPage";
import ConcertDetail from "./Components/concertList/ConcertDetail";
import CurrentReservationPage from "./Components/reservation/CurrentReservationPage";
import ProtectedRoute from "./route/ProtectedRoute";

async function enableMocking() {
  // VITE_USE_MSW 환경 변수가 true인 경우에만 MSW 활성화
  if (
    import.meta.env.VITE_USE_MSW !== "true" &&
    process.env.NODE_ENV !== "development"
  ) {
    return;
  }

  const { worker } = await import("./mocks/browser");
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
        element: <ProtectedRoute />, // 보호된 라우트를 위한 최상위 ProtectedRoute
        children: [
          {
            path: "/concert/:concertId",
            element: <ConcertDetail />,
          },
          {
            path: "/reservation",
            element: <ReservationPage />,
          },
          {
            path: "/user/reservation",
            element: <CurrentReservationPage />,
          },
        ],
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
