import {ReactNode} from "react";

interface ITemplate {
  children: ReactNode;
}

function Template({children}: ITemplate) {
  return <div className="template min-h-screen antialiased bg-mainBg text-textColor">{children}</div>;
}

export default Template;
