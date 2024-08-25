import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorBgContainerDisabled: "black",
        colorTextDisabled: "white",
      },
      components: {
        Collapse: {
          headerBg: "black",
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
