import { RouteProps } from "react-router-dom";
import { MainPage } from "../../pages/MainPage";
import { FavoritePage } from "../../pages/FavoritePage";
import { NotFoundPage } from "../../pages/NotFoundPage";

export enum AppRoutes {
  MAIN = "main",
  FAVORITE = "favorite",
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.FAVORITE]: "/favorite",
  [AppRoutes.NOT_FOUND]: "/*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.FAVORITE]: {
    path: RoutePath.favorite,
    element: <FavoritePage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
