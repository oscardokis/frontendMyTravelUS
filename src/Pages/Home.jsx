import Layout from '../Components/Layout.jsx'
import ImageSlider from '../Components/ImageSlider.jsx'

import Chicago from '../assets/Chicago.jpg'
import NewYork from '../assets/NewYork.jpg'
import SanFrancisco from '../assets/SanFrancisco.jpg'
import LosAngeles from '../assets/LosAngeles.jpg'
import Miami from '../assets/Miami.jpg'

const IMAGES = [
  {url:Chicago, alt:"Bean of chicago"},
  {url:NewYork, alt:"Statue of Liberty"},
  {url:SanFrancisco, alt:"Golden Gate Bridge"},
  {url:LosAngeles, alt:"Hollywood Sign"},
  {url:Miami, alt:"Miami Beach"}
]
export default function Home() { 
  return (
    <Layout>
      <p className='text-4xl p-3 font-semibold'>Explore the United States</p>
      <div className='aspect-[20/9] max-w-screen-2xl m-auto w-full relative'>
        <ImageSlider images={IMAGES}/>
      </div>
    </Layout>
  )
}
