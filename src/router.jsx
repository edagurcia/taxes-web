import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateLayout, PublicLayout } from "./layouts";
import { useTheme } from "./hooks/useTheme";

/* Public Pages */
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((module) => {
    return { default: module.LoginPage };
  })
);

const RegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((module) => {
    return { default: module.RegisterPage };
  })
);

/* Private Pages */
const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((module) => {
    return { default: module.DashboardPage };
  })
);

export const TaxesRouter = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <main className="flex min-h-screen dark:bg-gray-800 text-gray-500 dark:text-gray-100">
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="*" element={<Navigate to="/" />} />

          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>

        <Route path="/app" element={<PrivateLayout />}>
          <Route path="/app/*" element={<Navigate to="/app" />} />
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </main>
  );
};
