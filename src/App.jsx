
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import PresensiMenu from "./pages/PresensiMenu";
import History from "./pages/History";
import ErrorPage from "./pages/ErrorPages";
import ShowPhoto from "./components/riwayat_presensi/ShowPhoto";
import Register from "./pages/Register";

export default function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />
      },
      {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />
      },
      {
        path: "/staff",
        element:
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/staff/home",
            element:
              <ProtectedRoute>
                <PresensiMenu />
              </ProtectedRoute>
          },
          {
            path: "/staff/riwayat",
            element:
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
          }
        ]
      },
      {
        path: "/staff/showPhoto/*",
        element: <ShowPhoto />
      }

    ]
  );

  return (
    <RouterProvider router={router} />
  )
}


