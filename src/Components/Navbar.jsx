import { NavLink } from "react-router-dom"
import { GeneralContext } from "./Context"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Navbar () {
  const navigate = useNavigate()
  const { authUser, setAuthUser } = useContext(GeneralContext)
  const [burgerButton, setBurgerButton] = useState(false)
  const handleLogOut = async () => {
    window.localStorage.removeItem('token')
    setAuthUser({
      username: '',
      login: false,
      token: null,
      id: null
    })
  }
  return (
    <nav className="flex justify-between items-center backdrop-blur text-white fixed z-10 top-0 h-24 px-6 py-1 w-full">
      <div className="flex gap-3 items-center" onClick={()=> navigate('/')}>
        <figure className="w-20" >
          <img className="w-full" src="/TravelUS5.svg" alt="logo TravelUS" />
        </figure>
        <div className="flex items-center rounded-lg p-2 gap-3">
          <p className="font text-3xl">TRAVEL<span className="font-black">US</span></p>
            {authUser.login && (<div className="hidden text-pretty rounded-lg md:flex justify-center items-center text-2xl font-bold p-3">{authUser?.username}</div>)}
        </div>

      </div>
      <button className="w-10 lg:hidden relative" onClick={() => setBurgerButton(!burgerButton)}>
          <img className="w-full" src="/ButtonBurger.svg" alt="Burger Button" />
      </button>
      {burgerButton && (
        <ul className="flex flex-col gap-3 text-lg justify-center items-center absolute right-4 top-20 bg-[#0f172a] p-3 rounded-lg min-w-36">
          {authUser.login && (<li className=" font-bold bg-bluelight/45 p-2 rounded-lg flex justify-center items-center w-full">{authUser?.username}</li>)}
          <li className="hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center"
           onClick={() => setBurgerButton(!burgerButton)}>
            <NavLink to="/" className="flex justify-center flex-grow">
              Home
            </NavLink>
          </li>
          <li className=" hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center" onClick={() => setBurgerButton(!burgerButton)}>
            <NavLink to="/journeys" className="flex justify-center flex-grow">
              Journeys
            </NavLink>
          </li>
          {authUser.login && (
            <li className=" hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center" onClick={() => setBurgerButton(!burgerButton)}>
              <NavLink to="/adventure" className="flex justify-center flex-grow">
                New Adventure
              </NavLink>
            </li>
          )}
          {authUser.login && (
            <li className=" hover:underline hover:underline-offset-3 bg-bluelight p-2 rounded-lg w-full text-center" onClick={() => setBurgerButton(!burgerButton)}>
              <NavLink to="/my-trips"className="flex justify-center flex-grow">
                My Trips
              </NavLink>
            </li>
          )}
          <li className=" hover:underline hover:underline-offset-3 p-2 rounded-lg text-center bg-bluelight w-full" onClick={() => setBurgerButton(!burgerButton)}>
            {authUser.login ? (
              <NavLink 
                to="/"
                onClick={ () => handleLogOut() }
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
        {authUser.login && (
          <li className=" hover:underline hover:underline-offset-3">
            <NavLink to="/adventure">
              New Adventure
            </NavLink>
          </li>
        )}
        {authUser.login && (
          <li className=" hover:underline hover:underline-offset-3">
            <NavLink to="/my-trips">
              My Trips
            </NavLink>
          </li>
        )}
        <li className=" hover:underline hover:underline-offset-3">
          {authUser.login ? (
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