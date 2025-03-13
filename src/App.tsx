import { Link } from "react-router-dom";
import RouterView from "./router";
import { routes } from "./router/routes";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
                >
                  {route.meta?.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <RouterView />
      </main>
    </div>
  );
}

export default App;
