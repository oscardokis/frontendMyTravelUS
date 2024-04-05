/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {
  const [isUser, setIsUser] = useState(null)
  const [isLogin, setIsLogin] = useState(true)
  const [storedValue, setStoredValue] = useLocalStorage('token', '');
  const [authUser, setAuthUser] = useState({
    username: '',
    login: false,
    token: '',
    id: ''
  });
  useEffect(() => {
    const checkToken = async () => {
      if(storedValue !== '') {
        const response = await fetch('https://travelus-9ca2f8ce253e.herokuapp.com/api/v1/auth/validate', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${storedValue}` }
        })
        if(response.ok) {
          const dataFetch = await response.json()
          setAuthUser({
            username: dataFetch.user.username,
            login: true,
            token: storedValue,
            id: dataFetch.user.id
          }); // Save data in local storage
        }
      }
    }
    checkToken();
  }, []);


  return (
    <GeneralContext.Provider value={{
      isLogin,
      setIsLogin,
      isUser,
      setIsUser,
      authUser,
      setAuthUser,
      setStoredValue
    }}>
      {children}
    </GeneralContext.Provider>
  )
}