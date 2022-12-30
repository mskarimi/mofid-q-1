import {ReactNode} from "react";
import {ConfigProvider} from "antd";

interface ITemplate {
  children: ReactNode;
}

function Template({children}: ITemplate) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#01a796",
          colorText: "#F3F4F6",
          colorBgBase: "#1F2937",
          colorTextBase: "#F3F4F6",
          colorBorder: "#F3F4F6",
          colorTextPlaceholder: "rgba(243, 244, 246, .5)",
        },
      }}
    >
      <div className="template min-h-screen antialiased bg-mainBg text-textColor">{children}</div>
    </ConfigProvider>
  );
}

export default Template;
