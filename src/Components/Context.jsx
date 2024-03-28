import { createContext, useState } from "react";


export const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {
  const [isValidUser, setIsValidUser] = useState(false)

  return (
    <GeneralContext.Provider value={{
      isValidUser,
      setIsValidUser
    }}>
      {children}
    </GeneralContext.Provider>
  )
}