import Layout from '../Components/Layout.jsx'
import LogInForm from '../Components/LogInForm.jsx'
import { useContext } from 'react'
import { GeneralContext } from '../Components/Context.jsx'

export default function LogIn() {
  const { setIsValidUser } = useContext(GeneralContext)
  return (
    <Layout>
      <LogInForm setIsLogin = {setIsValidUser}/>
    </Layout>
  )
}
