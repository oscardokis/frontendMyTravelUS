import Layout from '../Components/Layout.jsx'
import LogInForm from '../Components/LogInForm.jsx'

export default function LogIn() {
  return (
    <Layout>
      <LogInForm navigateTo = {"/"}/>
    </Layout>
  )
}
