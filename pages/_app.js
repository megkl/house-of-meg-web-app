import "@/styles/globals.css";
import { StoreProvider } from "@/utils/store";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";

const clientSideEmotionCache = createCache({ key: "css" });

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <StoreProvider>
      <Component {...pageProps} />
      </StoreProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp;
