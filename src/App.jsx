import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Journeys from './Pages/Journeys'
import Adventure from './Pages/Adventure.jsx'
import Navbar from './Components/Navbar.jsx'
import SignUp from './Pages/SignUp.jsx'
import LogIn from './Pages/LogIn.jsx'
import MyTrips from './Pages/MyTrips.jsx'
import { GeneralProvider } from './Components/Context.jsx'
import Footer from './Components/Footer.jsx'

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
    <GeneralProvider>
      <BrowserRouter>
        <div className='flex min-h-screen flex-col '>
          <Navbar />
          <div className='flex-grow'> 
            <AppRouter />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </GeneralProvider>
  )
}

export default App
