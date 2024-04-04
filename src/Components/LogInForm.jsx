import { useContext, useEffect, useRef } from 'react'
import { GeneralContext } from './Context.jsx'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './../hooks/useLocalStorage'
import { useFetchWithAuth } from './../hooks/useFetchWithAuth'

export default function LogInForm({ setIsLogin, navigateTo }) {
  const navigate = useNavigate()
  const { setAuthUser } = useContext(GeneralContext)
  const [, setStoredValue] = useLocalStorage('token', '');
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
      setStoredValue(data.token);
      navigate(navigateTo ?? '/')
    }
  }, [data, setAuthUser, navigate, navigateTo, setStoredValue]);

  const handleLogIn = async (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const loginInfo = {
      username: formData.get('username').trim(),
      password: formData.get('password').trim()
    }

    if(!loginInfo.username) return alert('Please enter a username')
    if(!loginInfo.password) return alert('Please enter a password')
    if(loginInfo.username.length < 3) return alert('Username must be at least 3 characters long')
    if(loginInfo.username.length > 20) return alert('Username must be less than 20 characters long')

    await fetchRequest('https://travelus-9ca2f8ce253e.herokuapp.com/api/v1/auth/login', 'POST', loginInfo, null)

  }
  return (
    <div className='border border-bluelight bg-bluelight/5 border-dashed rounded-lg p-6 lg:flex lg:flex-col lg:gap-2 lg:w-full max-w-7xl'>
        <form ref={form} className='flex gap-6 justify-center flex-wrap'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            autoComplete='current-username'
            className={`border border-bluelight rounded-md p-3 bg-transparent w-2/6 flex-grow`}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            autoComplete='current-password'
            className={`border border-bluelight rounded-md p-3 bg-transparent w-2/6 flex-grow`}
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
        {isLoading && <p className='text-lg text-bluelight text-center font-bold'>Loading...</p>}
        {error && <p className='text-lg text-bluelight text-center font-bold'>Oops, we can&apos;t find that username or password doesn&apos;t match</p>}
    </div>
  )
}
