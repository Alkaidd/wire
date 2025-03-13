import { useLocation } from "react-router-dom";
import RouterView from "./router";
import { useEffect } from "react";
import { initConfig } from "./helpers/configHelper/configHelper";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const isConfigPage = location.pathname === "/config";

  useEffect(() => {
    initConfig();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isConfigPage && <Header />}
      <main className={!isConfigPage ? "pt-16" : ""}>
        <RouterView />
      </main>
    </div>
  );
}

export default App;
