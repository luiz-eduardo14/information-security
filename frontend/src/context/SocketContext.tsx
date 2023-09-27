import { createContext, useEffect, useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { Client } from '@stomp/stompjs';

const url = import.meta.env.VITE_SOCKET_URL || '';

const SocketContext = createContext(null as Client | null);

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
            alert('Connected');
          },
          onDisconnect: () => {
            alert('Disconnected');
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

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
}