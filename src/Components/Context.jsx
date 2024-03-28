import { createContext, useState } from "react";


export const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {
  const [activeUser, setActiveUser] = useState(null)

  return (
    <GeneralContext.Provider value={{
      activeUser,
      setActiveUser
    }}>
      {children}
    </GeneralContext.Provider>
  )
}