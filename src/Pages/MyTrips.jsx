import Layout from '../Components/Layout'
import { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../Components/Context'
export default function MyTrips() {
  const {authUser} = useContext(GeneralContext)
  const [myTrips, setMyTrips] = useState([])
  useEffect(() => {
    const fetchMyTrips = async () => {
      try {
        const response = await fetch('https://travelus-9ca2f8ce253e.herokuapp.com/api/v1/my-trips', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${authUser.token}` }
        })
        if (!response.ok){
          throw new Error('My trips failed')
        }
        const data = await response.json()
        setMyTrips(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMyTrips()
  }, [authUser, setMyTrips])
  return (
    <Layout>
      <h1 className='p-3 text-4xl font-extrabold'>MY TRIPS</h1>
      <div className='flex flex-col gap-6 w-full max-w-7xl '>
        {myTrips?.map((trip, index) => (
          <div key={index} className='p-3 border border-bluelight border-dashed rounded mb-6 '>
            <div className='border border-bluelight border-dashed bg-bluelight/5 flex flex-wrap gap-3 md:gap-0 p-3 rounded-lg justify-around mb-3'>
              <h2 className='text-xl font-medium bg-bluelight/10 rounded-lg p-3'>{trip.city}, {trip.state}</h2>
              <p className='text-xl bg-bluelight/10 rounded-lg p-3'><span className='text-xl font-medium'>Accessories: </span> {trip.activity}</p>
              <p className='text-xl bg-bluelight/10 rounded-lg p-3'><span className='text-xl font-medium'>Month: </span>  {trip.month}</p>
            </div>
            <ul className='border border-bluelight border-dashed bg-bluelight/5 rounded-lg p-6 flex flex-col gap-3'>
              {trip.thingsToDo.map((thing, index) => (
                <li key={index} className=' bg-bluelight/10 rounded-lg p-6'>
                  <p className='text-center font-bold text-2xl mb-3 p-3 bg-bluelight/70 rounded'>{thing.activity}</p>
                  <p className='text-lg'>{thing.description}</p>
                  <p className='text-lg'><span className='text-xl font-medium'>Accessories: </span> {thing.accessories}</p>
                  <p className='text-lg'><span className='text-xl font-medium'>Fun Fact: </span> {thing.funFact}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </Layout>
  )
}