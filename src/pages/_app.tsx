import type {AppProps} from "next/app";
import "styles/globals.css";
import Template from "template";

export default function App({Component, pageProps}: AppProps) {
  return (
    <Template>
      <Component {...pageProps} />
    </Template>
  );
}
