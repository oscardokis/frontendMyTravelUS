import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { GeneralContext } from '../Components/Context'
import { useContext } from 'react'
import { useFetchWithAuth } from '../hooks/useFetchWithAuth'

export default function SignUp({ setIsLogin, navigateTo }) {
  const navigate = useNavigate()
  const { setAuthUser, setStoredValue } = useContext(GeneralContext)
  const { fetchRequest, data, isLoading, error } = useFetchWithAuth();

  const form = useRef()
  useEffect(() => {
    if(data?.token) {
      setAuthUser({
        username: data.user.username,
        login: true,
        token: data.token,
        id: data.user.id
      })
      setStoredValue({
        username: data.user.username,
        login: true,
        token: data.token,
        id: data.user.id
      });
      navigate(navigateTo ?? '/')
    }
  }, [data, setAuthUser, navigate, navigateTo, setStoredValue]);


  const handleSingUp = async (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const signupInfo = {
      username: formData.get('username').trim(),
      email: formData.get('email').trim(),
      password: formData.get('password').trim()
    }

    if(!signupInfo.username) return alert('Please enter a username')
    if(!signupInfo.email) return alert('Please enter an email')
    if(!signupInfo.password) return alert('Please enter a password')
    if(signupInfo.username.length < 3) return alert('Username must be at least 3 characters long')
    if(signupInfo.password.length < 6) return alert('Password must be at least 6 characters long')
    if(!signupInfo.email.includes('@')) return alert('Please enter a valid email')
    if(!signupInfo.email.includes('.')) return alert('Please enter a valid email')
    if(signupInfo.username.length > 20) return alert('Username must be less than 20 characters long')
    if(signupInfo.password.length > 20) return alert('Password must be less than 20 characters long')
    if(signupInfo.email.length > 50) return alert('Email must be less than 50 characters long')
    await fetchRequest('http://localhost:3001/api/v1/user/signup', 'POST', signupInfo, null);

  }
  return (
    <div className='border bg-bluelight/5 border-bluelight border-dashed rounded-lg w-full p-6 max-w-7xl flex flex-col gap-3 mx-3'>
      <form 
        className='flex items-center gap-6 flex-wrap'
        ref={form}
        action='submit'
      >
        <input
          type='text'
          placeholder='Username'
          name='username'
          autoComplete='new-username'
          className={`border border-bluelight rounded-md p-3 bg-transparent flex-grow `}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          autoComplete='new-email'
          className={`border border-bluelight rounded-md p-3 bg-transparent autofill:bg-transparent flex-grow`}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          autoComplete='new-password'
          className='border border-bluelight rounded-md p-3 bg-transparent autofill:bg-transparent flex-grow min-w-64'
        />
      <button 
        className='bg-bluelight text-white rounded-md p-3 flex-grow hover:bg-bluelight/20 text-xl font-semibold min-w-64' 
        onClick={(e) => handleSingUp(e)}
        type='submit'
      >
          Sign Up
      </button>
      </form>
      <div className='text-center text-sm hover:underline hover:underline-offset-4 cursor-pointer' onClick={() => setIsLogin(true)}>
        Got an account yet?
      </div>
      {isLoading && <p className='text-lg text-bluelight text-center font-bold'>Loading...</p>}
      {error && <p className='text-lg text-bluelight text-center font-bold'>{error}</p>}
    </div>
  )
}
