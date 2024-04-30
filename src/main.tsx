import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Context, { FirebaseContext } from "./store/Conrext.tsx";
import { app } from "./firebase/Setup";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FirebaseContext.Provider value={{ app }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
