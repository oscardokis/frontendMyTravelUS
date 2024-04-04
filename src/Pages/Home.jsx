import Layout from '../Components/Layout.jsx'
import ImageSlider from '../Components/ImageSlider.jsx'
import imagesHome from '../assets/imagesHome.js'
import LogInForm from '../Components/LogInForm.jsx'
import { useContext } from 'react'
import { GeneralContext } from '../Components/Context.jsx'
import SignUp from './SignUp.jsx'
export default function Home() { 
  const { setIsLogin, isLogin, authUser } = useContext(GeneralContext)
  return (
    <Layout>
      <p className='text-4xl mb-6 font-semibold text-center'>Discover where you&apos;re headed next</p>
      {!authUser.login && 
        <div className='flex justify-center w-full mb-6'>
           {!isLogin ? <SignUp setIsLogin={(x) => setIsLogin(x)} />: (<LogInForm setIsLogin={(x) => setIsLogin(x)}/>)}
        </div>
      }
      <div className='aspect-[20/9] max-w-7xl m-auto w-full relative'>
        <ImageSlider images={imagesHome}/>
      </div>
      <br/>
    </Layout>
  )
}
