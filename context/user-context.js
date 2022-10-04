import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext({
  name: '',
  nameHandler: () => {},
  displayName: '',
  displayNameHandler: () => {},
  roomId: '',
  roomIdHandler: () => {},
});

export function useUser() {
  return useContext(UserContext);
}
// use => const { name, nameHandler, roomId, roomIdHandler } = useUser();

export default function UserProvider({ children }) {
  const [name, setName] = useState('');
  // to use the final display name after submission
  const [displayName, setDisplayName] = useState('');
  const [roomId, setRoomId] = useState('');

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const displayNameHandler = () => {
    setDisplayName(name);
    setName('');
    setRoomId('');
    //TODO: Also need setSelectedRoomId
    //to set once the request to  join the
    //room has been submitted and validated
  };

  const roomIdHandler = (e) => {
    setRoomId(e.target.value);
  };

  const value = {
    name,
    nameHandler,
    displayName,
    displayNameHandler,
    roomId,
    roomIdHandler,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
