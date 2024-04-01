import { useContext, useRef, useState } from 'react'
import { GeneralContext } from './Context.jsx'
import { useNavigate } from 'react-router-dom'

export default function LogInForm({ setIsLogin, navigateTo }) {
  const navigate = useNavigate()
  const { setIsValidUser, setToken, setIsUser } = useContext(GeneralContext)
  const [isUserLogin, setIsUserLogin] = useState(
    {userName: false,
    password: false}
  )

  const form = useRef()

  const userFetch = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }) 
      if (!response.ok) throw new Error('Login failed');
      const res = await response.json()
      if(res === "username") return setIsUserLogin({userName: true, password: false})
      if(res === "password") return setIsUserLogin({userName: false, password: true})
      setIsUser(res.user.username)
      setToken(res.token)
      setIsValidUser(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogIn = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const SignUpInfo = {
      username: formData.get('username').trim(),
      password: formData.get('password').trim()
    }

    if(!SignUpInfo.username) return alert('Please enter a username')
    if(!SignUpInfo.password) return alert('Please enter a password')
    if(SignUpInfo.username.length < 3) return alert('Username must be at least 3 characters long')
    if(SignUpInfo.username.length > 20) return alert('Username must be less than 20 characters long')
    userFetch(SignUpInfo)
    navigate(navigateTo ?? '/')
  }
  return (
    <div className='border border-bluelight bg-bluelight/5 border-dashed rounded-lg p-6 lg:flex lg:flex-col lg:gap-2 lg:w-full max-w-7xl'>
        <form ref={form} className='flex gap-6 justify-center flex-wrap'>
          {/* <h1 className='text-3xl font-bold text-center w-1/4'>Log In</h1> */}
          <input
            type='text'
            placeholder='Username'
            name='username'
            autoComplete='current-username'
            className={`border ${isUserLogin.userName ?'border-red':'border-bluelight'} rounded-md p-3 bg-transparent w-2/6 flex-grow`}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='current-password'
            className={`border ${isUserLogin.password ?'border-red':'border-bluelight'} rounded-md p-3 bg-transparent w-2/6 flex-grow`}
          />
          <button 
            onClick={(e) => handleLogIn(e)} 
            className='bg-bluelight text-white font-semibold text-xl rounded-md p-3 hover:bg-bluelight/20 flex-grow'>
            Log In
          </button>
        </form>
        <div to='/sign-up' className='text-center text-sm hover:underline hover:underline-offset-4 cursor-pointer mt-3 md:mt-0' onClick={() => setIsLogin(false)}>
            No account yet? <span className=' font-semibold'>Create one here</span>.
        </div>
        {isUserLogin.userName && <p className='text-lg text-bluelight text-center font-bold'>Oops, we can&apos;t find that username.</p>}
        {isUserLogin.password && <p className='text-lg text-bluelight text-center font-bold'>Password incorrect</p>}

    </div>
  )
}
