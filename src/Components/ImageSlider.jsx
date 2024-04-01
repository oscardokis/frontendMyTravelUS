import { useEffect, useState } from "react";
import '../styles/ImageSlider.css'
import DotFill from '../assets/DotFill.svg'
import DotEmpty from '../assets/DotEmpty.svg'
import LeftArrow from '../assets/leftArrow.svg'
import RightArrow from '../assets/rightArrow.svg'
const ImageSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex( index => {
        if(index === images.length - 1){
          return 0
        }
        return index + 1
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [imageIndex, images.length])

  function showNextImage(){
    setImageIndex( index => {
      if(index === images.length - 1){
        return 0
      }
      return index + 1
    })
  }

  function showPreviousImage(){
    setImageIndex( index => {
      if(index === 0){
        return images.length - 1
      }
      return index - 1
    })
  
  }
  return(
    <div
    className='w-full h-full'>
      <div className="w-full h-full flex overflow-hidden">
        {images.map((image, index) => (
          <img 
            key={index} 
            className="block object-cover w-full h-full flex-shrink-0 flex-grow-0" 
            src = {image.url}
            alt={images.alt}
            style={{
              translate: `${-100 * imageIndex}%`,
              transition: 'translate 300ms ease-in-out'}} />
        ))}
      </div>
      <div>
        <p className="text-white text-md lg:text-4xl font-semibold p-3 absolute top-4 left-4 md:top-16 md:left-16 bg-black/50 rounded-3xl">
          {images[imageIndex].city}</p>
      </div>
      <div>
        <p className="text-white text-sm lg:text-2xl font-semibold p-3 absolute bottom-16 right-2/4 translate-x-1/2 bg-black/50 rounded-3xl">
          {images[imageIndex].description}</p>
      </div>
      <button 
        onClick={showNextImage} 
        className="img-slider-btn w-16 h-full block absolute top-1/2 right-0 border-none cursor-pointer p-6 -translate-y-1/2 hover:bg-black/50 transition-opacity"
        aria-label="View next Image">
        <img src={RightArrow} /></button>
      <button 
        onClick={showPreviousImage} 
        className="img-slider-btn w-16 h-full block absolute top-1/2 border-none cursor-pointer p-6 -translate-y-1/2 hover:bg-black/50"
        aria-label="View previews Image">
        <img src={LeftArrow}/></button>
      <div className="absolute bottom-3 left-2/4 -translate-x-2/4 flex gap-3 bg-black/50 p-3 rounded-3xl">
        {images.map((url, index) => (
          <button 
            key={index} 
            onClick={() => setImageIndex(index)}
            className="w-3 block cursor-pointer h-3 img-slider-dot-btn"
            >{index === imageIndex ?
              <img src= {DotFill}/>: <img src={DotEmpty}/>}</button>
        
        ))}
      </div>
    </div>
  )
}
export default ImageSlider