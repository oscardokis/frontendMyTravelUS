import { Link, useNavigate } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { GeneralContext } from './Context.jsx'

export default function LogInForm({ navigateTo }) {
  const { setIsValidUser } = useContext(GeneralContext)
  const navigate = useNavigate()
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
      setIsValidUser(true)
      navigate(`${navigateTo}`);
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
  }
  return (
    <div className='border border-bluelight border-dashed rounded-lg w-96 p-6 mt-6'>
        <h1 className='text-3xl font-bold text-center'>Log In</h1>
        <form ref={form} className='flex flex-col gap-3 space-y-4 mt-4'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            autoComplete='current-username'
            className={`border ${isUserLogin.userName ?'border-red':'border-bluelight'} rounded-md p-3 bg-transparent `}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='current-password'
            className={`border ${isUserLogin.password ?'border-red':'border-bluelight'} rounded-md p-3 bg-transparent `}
          />
          <button onClick={(e) => handleLogIn(e)} className='bg-bluelight text-white rounded-md p-3'>
            Log In
          </button>
          <Link to='/sign-up' className='text-center text-sm hover:underline hover:underline-offset-4'>
            No account yet? <span className=' font-semibold'>Create one here</span>.
          </Link>
        </form>
        {isUserLogin.userName && <p className='text-lg text-bluelight text-center font-bold'>Oops, we can&apos;t find that username.</p>}
        {isUserLogin.password && <p className='text-lg text-bluelight text-center font-bold'>Password incorrect</p>}

    </div>
  )
}
