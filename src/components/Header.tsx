import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import { openWindow } from "../helpers/windowHelper/windowHelper";

export default function Header() {
  const handleLinkClick = async (
    e: React.MouseEvent,
    path: string,
    title: string
  ) => {
    e.preventDefault();
    try {
      const windowOptions =
        path === "/config"
          ? {
              title: title,
              width: 400,
              height: 300,
              resizable: false,
              center: true,
            }
          : {
              title: title,
              width: 800,
              height: 600,
              resizable: true,
              center: true,
            };

      await openWindow(path.slice(1), path, windowOptions);
    } catch (error) {
      console.error("Failed to open window:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                onClick={(e) =>
                  handleLinkClick(e, route.path, route.meta?.title || "新窗口")
                }
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                {route.meta?.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
