import { NavLink } from "react-router-dom"
export default function Navbar () {
  return (
    <nav className="flex justify-between items-center backdrop-blur text-white fixed z-10 top-0 h-24 px-6 py-1 w-full">
      <div className="flex gap-3 items-center">
        <figure className="w-20">
          <img className="w-full" src="././TravelUS5.svg" alt="logo TravelUS" />
        </figure>
        <p className="font text-3xl">TRAVEL<span className="font-black">US</span></p>
      </div>
      <ul className="flex gap-6 text-xl">
        <li>
          <NavLink to="./">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="./journeys">
            Journeys
          </NavLink>
        </li>
        <li>
          <NavLink to="./adventure">
            Plan Adventure
          </NavLink>
        </li>
        <li>
          <NavLink to="./my-trips">
          My Trips
          </NavLink>
        </li>
        <li>
          <NavLink to="./sign-up">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}