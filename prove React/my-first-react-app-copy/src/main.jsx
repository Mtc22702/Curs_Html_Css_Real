import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
const elem = <App />;
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(elem);
