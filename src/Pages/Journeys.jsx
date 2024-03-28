import Layout from '../Components/Layout.jsx'
import {travelExperiences} from '../../journeys.json'
import Dropdown from '../Components/Dropdown.jsx'
import { useContext, useRef } from 'react'
import { GeneralContext } from '../Components/Context.jsx'
import LogInForm from '../Components/LogInForm.jsx'
const activities = [
  "Beach",
  "Camping",
  "Skiing",
  "Climbing",
  "Hiking",
  "Surfing",
  "Fishing",
  "Kayaking",
  "Cycling",
  "Snorkeling",
  "Paragliding",
  "Sailing",
  "Any activity"
]

export default function Journeys() {
  const { isValidUser, selectedOption} = useContext(GeneralContext)

  const form = useRef()
  const handleJourney = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const journey = {
      name: formData.get('titleJourney').trim(),
      typeOfJourney: selectedOption,
      location: formData.get('locationJourney').trim(),
      description: formData.get('descriptionJourney').trim(),
      createdBy: 'User'
    }
    console.log(journey)
  }
  return (
    <Layout>
      <div className='flex p-6 justify-center items-start gap-6 flex-wrap sm:flex-nowrap max-w-7xl'>
      {isValidUser ? (
        <div className='flex justify-around min-w-96'>
        <div className='border border-bluelight border-dashed rounded-lg p-12 mt-6'>
          <form ref={form} className='flex flex-col gap-6'>
            <p className='text-center text-2xl'>Do you have any reflections on the journey?</p>
            <input
              type='text'
              placeholder='Title of the journey'
              name='titleJourney'
              className='border border-bluelight rounded-md p-3 bg-transparent'
            />
            <div>
              <Dropdown 
                options={activities} 
                placeholder='--Choose a activity--' 
                name='typeJourney'/>
            </div>
            <input
              type='text'
              placeholder='Location'
              name='locationJourney'
              className='border border-bluelight rounded-md p-3 bg-transparent'
            />
            <textarea
              type='text'
              placeholder='Description'
              name='descriptionJourney'
              className='border border-bluelight rounded-md p-3 bg-transparent'
            />        
            <button 
              className='rounded-md p-3 bg-bluelight'
              onClick={(e) => handleJourney(e)}>Share</button>          
          </form>
        </div>
        </div>
      ): (
        <LogInForm navigateTo = "/journeys" />
      )}
      <div className='flex flex-col w-full'>
        {travelExperiences.map((journey, index) => {
          return (
            <div key={index} className='border border-bluelight border-dashed rounded-lg w-full p-6 mt-6 relative'>
              <div className='flex item gap-6'>
                <h2 className='text-3xl'>{journey.name}</h2>
                <button className='bg-bluelight/50 rounded-full px-3'>Save Trip</button>
              </div>
              <p className='text-xl'>{journey.typeOfJourney}</p>
              <p>{journey.location}</p>
              <p>{journey.description}</p>
              <p className='absolute top-3 right-3'>{journey.createdBy}</p>
            </div>
          )
        })}
      </div>

      </div>
    </Layout>
  )
}
