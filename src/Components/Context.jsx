import { createContext, useState } from "react";


export const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {
  const [isValidUser, setIsValidUser] = useState(false)
  const [isUser, setIsUser] = useState(null)
  const [isLogin, setIsLogin] = useState(true)
  const [token, setToken] = useState(null);


  return (
    <GeneralContext.Provider value={{
      isValidUser,
      setIsValidUser,
      token,
      setToken,
      isLogin,
      setIsLogin,
      isUser,
      setIsUser
    }}>
      {children}
    </GeneralContext.Provider>
  )
}