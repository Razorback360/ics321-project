import "@app/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="flex flex-col h-screen">
      <Component {...pageProps} />
    </div>
  );
}
