import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext({
  name: '',
  nameHandler: () => {},
  roomId: '',
  roomIdHandler: () => {},
});

export function useUser() {
  return useContext(UserContext);
}
// use => const { name, nameHandler, roomId, roomIdHandler } = useUser();

export default function UserProvider({ children }) {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const roomIdHandler = (e) => {
    setRoomId(e.target.value);
  };

  const value = {
    name,
    nameHandler,
    roomId,
    roomIdHandler,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
