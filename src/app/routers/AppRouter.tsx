import { Route, Routes } from "react-router";
import { routeConfig } from "../../shared/routeConfig/routeConfig";
import { Suspense } from "react";

export default function AppRouter() {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          key={path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <div>{element}</div>
            </Suspense>
          }
          path={path}
        />
      ))}
    </Routes>
  );
}
