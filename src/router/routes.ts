import { lazy } from "react";

// 使用 lazy 进行动态导入
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<any>;
  children?: RouteConfig[];
  meta?: {
    title?: string;
    icon?: string;
    [key: string]: any;
  };
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about",
    component: About,
    meta: {
      title: "关于",
    },
  },
];
