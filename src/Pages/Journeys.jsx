import Layout from '../Components/Layout.jsx'
import Dropdown from '../Components/Dropdown.jsx'
import { useContext, useEffect, useRef, useState } from 'react'
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
  const [comments, setComments] = useState([])
  const [dropdownValue, setDropdownValue] = useState()
  const { isValidUser, setIsValidUser, token} = useContext(GeneralContext)
  const form = useRef()
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/comments/all', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!response.ok){
          if(response.status === 401) setIsValidUser(false)
          throw new Error('Comments failed')
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [token, setIsValidUser, setComments, comments])
  const commentFetch = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      if (!response.ok){
        if(response.status === 401) setIsValidUser(false)
        throw new Error('Comment failed') 
      }
    } catch (error) {
      console.error(error)
    }
  } 

  const handleJourney = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const journey = {
      titleJourney: formData.get('titleJourney').trim(),
      typeJourney: dropdownValue,
      locationJourney: formData.get('locationJourney').trim(),
      descriptionJourney: formData.get('descriptionJourney').trim()
    }
    commentFetch(journey)
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
                setDropdownValue={setDropdownValue}
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
        {comments?.map((journey, index) => {
          return (
            <div key={index} className='border border-bluelight border-dashed rounded-lg w-full p-6 mt-6 relative'>
              <div className='flex item gap-6'>
                <h2 className='text-3xl'>{journey.titleJourney}</h2>
                <button className='bg-bluelight/50 rounded-full px-3'>Save Trip</button>
              </div>
              <p className='text-xl'>{journey.typeJourney}</p>
              <p>{journey.locationJourney}</p>
              <p>{journey.descriptionJourney}</p>
              <p className='absolute top-3 right-3'>{journey.user.username}</p>
            </div>
          )
        })}
      </div>

      </div>
    </Layout>
  )
}
