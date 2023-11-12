import { createContext, useEffect, useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { Client } from '@stomp/stompjs';
import socketEvents from '../socket';

const url = import.meta.env.VITE_SOCKET_URL || '';

export const SocketContext = createContext(null as Client | null);

export function SocketProvider({ children }: { children: React.ReactNode }) {

  const {
    authenticated,
    ready,
    token,
  } = useAuthentication();

  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    if (authenticated && ready) {
      try {
        const stompClient = new Client({
          brokerURL: `${url}/socket?jwt=${token}`,
          connectHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'X-Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          onConnect: () => {
            setStompClient(stompClient);
          },
          onDisconnect: () => {
            setStompClient(null);
          },
          onUnhandledMessage: () => {
            
          }
        });
        stompClient.activate();
      } catch (e) {
        console.error(e);
      }
    }
    return () => {
      stompClient?.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]);    

  useEffect(() => {
    if (stompClient && stompClient?.connected) {
      socketEvents.forEach((event) => stompClient.subscribe(event.eventSubscribeMapping, event.callback));
    }

    return () => {
      if (stompClient && stompClient?.connected) {
        socketEvents.forEach((event) => stompClient.unsubscribe(event.eventSubscribeMapping));
      }
    }
  }, [stompClient]);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
}