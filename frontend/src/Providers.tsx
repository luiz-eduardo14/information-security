import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import store from "./store";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";

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

export function Providers({
  children
}: PropsWithChildren<object> ) {
    return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <QueryClientProvider client={queryClient}>
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
                {children}
            </QueryClientProvider>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
    )
}