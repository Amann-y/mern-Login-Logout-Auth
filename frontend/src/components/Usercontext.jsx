import React, { useState } from "react";
import { createContext } from "react";

export const Authcontext = createContext("");

const Usercontext = ({ children }) => {
  const [userauth, setUserAuth] = useState(false);
  return (
    <Authcontext.Provider value={{ userauth, setUserAuth }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Usercontext;
