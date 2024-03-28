import Layout from '../Components/Layout.jsx'
import {travelExperiences} from '../../journeys.json'

export default function Journeys() {
  return (
    <Layout>
      <div>
      {travelExperiences.map((journey, index) => {
        return (
          <div key={index} className='border border-bluelight border-dashed rounded-lg w-full p-6 mt-12 relative'>
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
    </Layout>
  )
}
