import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

export default function SignUp({ setIsLogin }) {
  const navigate = useNavigate()
  const [isUser, setIsUser] = useState(
    {userName: false,
    email: false}
  )
  const form = useRef()

  const userFetch = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }) 
      if (!response.ok) throw new Error('Login failed');
      const res = await response.json()
      console.log(res)
      if(res === "username") return setIsUser({userName: true, email: false})
      if(res === "email") return setIsUser({userName: false, email: true})
      navigate("/");
    } catch (error) {
      console.error(error)
    }
  }

  const handleSingUp = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const SignUpInfo = {
      username: formData.get('username').trim(),
      email: formData.get('email').trim(),
      password: formData.get('password').trim()
    }

    if(!SignUpInfo.username) return alert('Please enter a username')
    if(!SignUpInfo.email) return alert('Please enter an email')
    if(!SignUpInfo.password) return alert('Please enter a password')
    if(SignUpInfo.username.length < 3) return alert('Username must be at least 3 characters long')
    if(SignUpInfo.password.length < 6) return alert('Password must be at least 6 characters long')
    if(!SignUpInfo.email.includes('@')) return alert('Please enter a valid email')
    if(!SignUpInfo.email.includes('.')) return alert('Please enter a valid email')
    if(SignUpInfo.username.length > 20) return alert('Username must be less than 20 characters long')
    if(SignUpInfo.password.length > 20) return alert('Password must be less than 20 characters long')
    if(SignUpInfo.email.length > 50) return alert('Email must be less than 50 characters long')
    userFetch(SignUpInfo)
  }
  return (
    <div className='border bg-bluelight/5 border-bluelight border-dashed rounded-lg w-full p-6 max-w-7xl flex flex-col gap-3'>
      <form 
        className='flex items-center gap-6'
        ref={form}
        action='submit'
      >
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={() => setIsUser({...isUser, userName: false})}
          autoComplete='new-username'
          className={`border ${isUser.userName ?'border-red':'border-bluelight'} rounded-md p-3 bg-transparent flex-grow `}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={() => setIsUser({...isUser, email: false})}
          autoComplete='new-email'
          className={`border ${isUser.email ?'border-red':'border-bluelight'} rounded-md p-3 bg-transparent autofill:bg-transparent flex-grow`}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          autoComplete='new-password'
          className='border border-bluelight rounded-md p-3 bg-transparent autofill:bg-transparent flex-grow'
        />
      <button 
        className='bg-bluelight text-white rounded-md p-3 flex-grow hover:bg-bluelight/20 text-xl font-semibold' 
        onClick={(e) => handleSingUp(e)}
        type='submit'
      >
          Sign Up
      </button>
      </form>
      <div className='text-center text-sm hover:underline hover:underline-offset-4 cursor-pointer' onClick={() => setIsLogin(true)}>
        Got an account already?
      </div>
      {isUser.userName && <p className='text-lg text-bluelight text-center font-bold'>User already exist</p>}
      {isUser.email && <p className='text-lg text-bluelight text-center font-bold'>Email already exist</p>}
    </div>
  )
}
