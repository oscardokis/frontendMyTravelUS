import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Journeys from './Pages/Journeys'
import Adventure from './Pages/Adventure.jsx'
import Navbar from './Components/Navbar.jsx'
import SignUp from './Pages/SignUp.jsx'
import LogIn from './Pages/LogIn.jsx'
import MyTrips from './Pages/MyTrips.jsx'

const AppRouter = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/journeys', element: <Journeys /> },
    { path: '/adventure', element: <Adventure /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/log-in', element: <LogIn /> },
    { path: '/my-trips', element: <MyTrips /> },

  ])
  return routes
}

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
      <Navbar />
    </BrowserRouter>
  )
}

export default App
