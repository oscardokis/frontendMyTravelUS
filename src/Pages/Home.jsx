import Layout from '../Components/Layout.jsx'
import ImageSlider from '../Components/ImageSlider.jsx'
import imagesHome from '../assets/imagesHome.js'
export default function Home() { 
  return (
    <Layout>
      <p className='text-4xl p-6 font-semibold'>Discover where you&apos;re headed next</p>
      <div className='aspect-[20/9] max-w-screen-2xl m-auto w-full relative'>
        <ImageSlider images={imagesHome}/>
      </div>
      <br/>
    </Layout>
  )
}
