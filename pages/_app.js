import "../styles/globals.css";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import {useState} from 'react'

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
