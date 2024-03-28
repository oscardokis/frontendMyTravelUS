import { createContext, useState } from "react";


export const GeneralContext = createContext()

export const GeneralProvider = ({children}) => {
  const [isValidUser, setIsValidUser] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);


  return (
    <GeneralContext.Provider value={{
      isValidUser,
      setIsValidUser,
      selectedOption,
      setSelectedOption
    }}>
      {children}
    </GeneralContext.Provider>
  )
}