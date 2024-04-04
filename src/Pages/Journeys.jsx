import Layout from '../Components/Layout.jsx'
import Dropdown from '../Components/Dropdown.jsx'
import { useContext, useEffect, useRef, useState } from 'react'
import { GeneralContext } from '../Components/Context.jsx'
import LogInForm from '../Components/LogInForm.jsx'
import SignUp from './SignUp.jsx'
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
  const { authUser, setAuthUser, isLogin, setIsLogin} = useContext(GeneralContext)
  const form = useRef()
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://travelus-9ca2f8ce253e.herokuapp.com/api/v1/comments/all', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${authUser.token}` }
        })
        if (!response.ok){
          throw new Error('Comments failed')
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [authUser, setComments, comments])
  const commentFetch = async (data) => {
    try {
      const response = await fetch('https://travelus-9ca2f8ce253e.herokuapp.com/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`
        },
        body: JSON.stringify(data),
      })
      if (!response.ok){
        if(response.status === 401) setAuthUser({username: null, login: false, token: null, id: null})
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
      <div className='flex px-6 justify-center items-start gap-6 flex-wrap max-w-7xl w-full lg:flex-col'>
      {authUser.login ? (
        <div className='border border-bluelight bg-bluelight/5 border-dashed rounded-lg p-6 mt-6 md:w-full'>
          <p className='text-center tex-xl md:text-2xl mb-3'>Do you have any reflections on the journey?</p>
          <form ref={form} className='flex flex-col gap-3 w-full'>
            <div className='flex gap-6 flex-wrap'>
              <input
                type='text'
                placeholder='Title of the journey'
                name='titleJourney'
                className='border border-bluelight border-dashed rounded-md p-3 bg-transparent flex-grow'
              />
              <div className='border border-bluelight border-dashed rounded-md bg-transparent flex-grow'>
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
                className='border border-bluelight border-dashed rounded-md p-3 bg-transparent flex-grow'
              />
            </div>
            <div className='flex gap-6'>
              <textarea
                type='text'
                placeholder='Description'
                name='descriptionJourney'
                className='border border-bluelight border-dashed rounded-md p-3 bg-transparent w-3/4'
              />        
              <button 
                className='rounded-md p-3 bg-bluelight flex-grow text-2xl hover:bg-bluelight/20'
                onClick={(e) => handleJourney(e)}>Share</button>   
            </div> 
          </form>
        </div>
      ): (
          <div className='flex w-full'>
            {!isLogin ? <SignUp setIsLogin={(x) => setIsLogin(x)} />: (<LogInForm setIsLogin={(x) => setIsLogin(x)} navigateTo="/journeys"/>)}
          </div>
      )}
      <div className='flex flex-col w-full gap-6'>
        {comments?.map((journey, index) => {
          return (
            <div key={index} className='border border-bluelight bg-bluelight/5 border-dashed rounded-lg w-full p-6 relative'>
              <div className='flex item gap-6'>
                <h2 className='text-xl md:text-3xl '>{journey.titleJourney}</h2>
              </div>
              <p className='text-xl'>{journey.typeJourney}</p>
              <p>{journey.locationJourney}</p>
              <p>{journey.descriptionJourney}</p>
              <p className='absolute top-3 text-sm right-3 bg-bluelight/20 p-3 rounded-lg'>{journey.user.username}</p>
            </div>
          )
        })}
      </div>
      </div>
    </Layout>
  )
}
