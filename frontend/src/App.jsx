import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages import
import HomeLayout from "./pages/HomeLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";

import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";

//action function imports
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
          errorElement: <ErrorPage />,
          children: [
            // relative to Dasboard
            {
              path: "productPage",
              element: <ProductPage />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
