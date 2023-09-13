import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./router";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      }
    }
  });

export function Providers() {
    return (
    <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover
        />
    </QueryClientProvider>
    )
}