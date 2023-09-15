import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "./router";
import { ToastContainer } from "react-toastify";
import store from "./store";
import { Provider } from "react-redux";

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
    <Provider store={store}>
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
    </Provider>
    )
}