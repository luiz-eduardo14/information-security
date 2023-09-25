import { createContext, useCallback, useEffect, useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs'

const url = import.meta.env.VITE_API_URL || '';

const SocketContext = createContext({} as Stomp.Client | null);

export function SocketProvider({ children }: { children: React.ReactNode }) {

  const {
    token,
    authenticated,
    ready,
  } = useAuthentication();

  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  const generateSocket = useCallback(() => {    
    const socket = new SockJS(`${url}/chat?jwt=${token}`);
    return Stomp.over(socket);
    }, [token]);

  useEffect(() => {
    if (authenticated && ready) {
      try {
        const StompClientInstance = !stompClient?.connected ? generateSocket() : stompClient;
        setStompClient(StompClientInstance);
        if (!StompClientInstance.connected) {
          const headers = {
              Authorization: `Bearer ${token}`,
          };
          StompClientInstance.connect(headers, () => alert('connected'), e => alert(e));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return () => {
      stompClient?.disconnect(() => alert('disconnected'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
}