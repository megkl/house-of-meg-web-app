import "@/styles/globals.css";
import { StoreProvider } from "@/utils/store";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const clientSideEmotionCache = createCache({ key: "css" });

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider>
      <Component {...pageProps} />
      </StoreProvider>
    </CacheProvider>
  );
}

export default MyApp;
