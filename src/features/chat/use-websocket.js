import { useState, useEffect, useRef } from 'react';

export default function useWebsocket({ url, onConnected }) {
  const [messages, setMessages] = useState([]);
  const [reconnecting, setReconnecting] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(url);
    socket.current.onopen = () => {
      onConnected(socket.current);
    };

    socket.current.onclose = () => {
      if (socket.current) {
        if (reconnecting) return;
        setReconnecting(true);
        setTimeout(() => setReconnecting(false), 2000);
      }
    };

    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socket.current.close();
      socket.current = null;
    };
  }, [reconnecting, url]);

  function readyState() {
    switch (socket.current.readyState) {
      case 0:
        return 'CONNECTING';
      case 1:
        return 'OPEN';
      case 2:
        return 'CLOSING';
      case 3:
        return 'CLOSED';
      default:
        return;
    }
  }

  return {
    socket: socket.current,
    readyState: readyState,
    reconnecting,
    messages,
    setMessages,
  };
}