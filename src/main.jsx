import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import Error from "./Error.jsx"
import "./index.css"
import Home from "./Home.jsx"
import CountryDetail from "./CountryDetail.jsx"
import { ThemeProvider } from "./contexs/themecontex.jsx";

// define routes
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ThemeProvider>
          <App />
        </ThemeProvider>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Contact",
          element: <h1>Contact</h1>,
        },
        {
          path: "/:country",
          element: <CountryDetail />,
        }
      ],
    }
  ],
  {
    basename: "/React-first-project-Countries-api"
  }
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)