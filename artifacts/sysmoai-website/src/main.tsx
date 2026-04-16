import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

const dispatchReady = () => {
  window.dispatchEvent(new CustomEvent('sysmoai-ready'));
};

if ('requestIdleCallback' in window) {
  (window as any).requestIdleCallback(dispatchReady, { timeout: 600 });
} else {
  setTimeout(dispatchReady, 80);
}
