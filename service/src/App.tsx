import { FrappeProvider } from "frappe-react-sdk";
import "chatnext-ui/dist/index";
import "chatnext-ui/dist/index.css";
import Dashboard from "./components/Page/Dashboard";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <FrappeProvider>
        <Dashboard />
        <AppRouter />
        {/* @ts-ignore */}
        <chatnext-app></chatnext-app>
      </FrappeProvider>
    </div>
  );
}

export default App;
