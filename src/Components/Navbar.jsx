import { NavLink } from "react-router-dom"
import { GeneralContext } from "./Context"
import { useContext, useState } from "react"
export default function Navbar () {
  const { isValidUser, setIsValidUser, isUser } = useContext(GeneralContext)
  const [burgerButton, setBurgerButton] = useState(false)
  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/logout', {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Logout failed');
      setIsValidUser(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <nav className="flex justify-between items-center backdrop-blur text-white fixed z-10 top-0 h-24 px-6 py-1 w-full">
      <div className="flex gap-3 items-center">
        <figure className="w-20">
          <img className="w-full" src="/TravelUS5.svg" alt="logo TravelUS" />
        </figure>
        <p className="font text-3xl">TRAVEL<span className="font-black">US</span></p>
      </div>
      <button className="w-10 lg:hidden relative" onClick={() => setBurgerButton(!burgerButton)}>
          <img className="w-full" src="/ButtonBurger.svg" alt="Burger Button" />
      </button>
      {burgerButton && (
        <ul className="flex flex-col gap-3 text-lg justify-center items-center absolute right-4 top-20 bg-bluelight/10 p-3 rounded-lg">
          {isValidUser && (<li className=" font-bold lg:mr-5 bg-bluelight p-2 rounded-lg flex justify-center items-center w-full">{isUser}</li>)}
          <li className="hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center" onClick={() => setBurgerButton(!burgerButton)}>
            <NavLink to="/" className="flex justify-center flex-grow">
              Home
            </NavLink>
          </li>
          <li className=" hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center" onClick={() => setBurgerButton(!burgerButton)}>
            <NavLink to="/journeys" className="flex justify-center flex-grow">
              Journeys
            </NavLink>
          </li>
          {isValidUser && (
            <li className=" hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center" onClick={() => setBurgerButton(!burgerButton)}>
              <NavLink to="/adventure" className="flex justify-center flex-grow">
                New Adventure
              </NavLink>
            </li>
          )}
          {isValidUser && (
            <li className=" hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center" onClick={() => setBurgerButton(!burgerButton)}>
              <NavLink to="/my-trips"className="flex justify-center flex-grow">
                My Trips
              </NavLink>
            </li>
          )}
          <li className=" hover:underline hover:underline-offset-3 p-2 rounded-lg text-center bg-bluelight w-full" onClick={() => setBurgerButton(!burgerButton)}>
            {isValidUser ? (
              <NavLink 
                to="/"
                onClick={ handleLogOut }
                className="flex justify-center flex-grow w-full text-center"
                >
                Log Out
              </NavLink>
            ) : (
              <NavLink to="/log-in" className="flex justify-center flex-grow w-full text-center">
                Log In
              </NavLink>
            )}
          </li>
        </ul>
      )}
      <ul className="hidden lg:flex lg:gap-6 text-xl lg:items-center">
        {isValidUser && (<li className=" font-bold mr-5">{isUser}</li>)}
        <li className="flex justify-center items-center p-3" onClick={() => setBurgerButton(!burgerButton)}>

        </li>
        <li className="hover:underline hover:underline-offset-3">
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li className=" hover:underline hover:underline-offset-3">
          <NavLink to="/journeys">
            Journeys
          </NavLink>
        </li>
        {isValidUser && (
          <li className=" hover:underline hover:underline-offset-3">
            <NavLink to="/adventure">
              New Adventure
            </NavLink>
          </li>
        )}
        {isValidUser && (
          <li className=" hover:underline hover:underline-offset-3">
            <NavLink to="/my-trips">
              My Trips
            </NavLink>
          </li>
        )}
        <li className=" hover:underline hover:underline-offset-3">
          {isValidUser ? (
            <NavLink 
              to="/"
              onClick={ handleLogOut }>
              Log Out
            </NavLink>
          ) : (
            <NavLink to="/log-in">
              Log In
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  )
}