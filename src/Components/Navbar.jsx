import { NavLink } from "react-router-dom"
import { GeneralContext } from "./Context"
import { useContext } from "react"
export default function Navbar () {
  const { isValidUser, setIsValidUser } = useContext(GeneralContext)

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
      <ul className="flex gap-6 text-xl">
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/journeys">
            Journeys
          </NavLink>
        </li>
        <li>
          <NavLink to="/adventure">
            Plan Adventure
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-trips">
          My Trips
          </NavLink>
        </li>
        <li>
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