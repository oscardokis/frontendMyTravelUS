import Layout from '../Components/Layout.jsx'
import LogInForm from '../Components/LogInForm.jsx'
import { useContext } from 'react'
import { GeneralContext } from '../Components/Context.jsx'
import SignUp from './SignUp.jsx'

export default function LogIn() {
  const { setIsLogin, isLogin, authUser } = useContext(GeneralContext)

  return (
    <Layout>
      {!authUser.login && 
        <div className='flex justify-center w-full mb-6'>
          {!isLogin ? <SignUp setIsLogin={(x) => setIsLogin(x)} />: (<LogInForm setIsLogin={(x) => setIsLogin(x)}/>)}
        </div>
      }
    </Layout>
  )
}
