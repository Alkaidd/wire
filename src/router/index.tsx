import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";

// 路由组件
const RouterView = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          加载中...
        </div>
      }
    >
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default RouterView;
