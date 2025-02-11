import { FrappeProvider } from "frappe-react-sdk";
import "chatnext-ui/dist/index";
import "formiojs/dist/formio.full.min.css";
import "chatnext-ui/dist/index.css";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <FrappeProvider>
        <AppRouter />
        {/* @ts-ignore */}
        <chatnext-app></chatnext-app>
      </FrappeProvider>
    </div>
  );
}

export default App;
