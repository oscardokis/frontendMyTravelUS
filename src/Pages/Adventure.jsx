import { useContext, useEffect, useRef, useState } from 'react'
import Dropdown from '../Components/Dropdown.jsx'
import Layout from '../Components/Layout.jsx'
import { GeneralContext } from '../Components/Context.jsx'
import SignUp from './SignUp.jsx'
import LogInForm from '../Components/LogInForm.jsx'
import { useFetchWithAuth } from '../hooks/useFetchWithAuth'
export default function Adventure() {
  const form = useRef()
  const { setIsLogin, isLogin, authUser } = useContext(GeneralContext)
  const [adventures, setAdventures] = useState({status: false, data: []})
  const { fetchRequest, data, isLoading, error } = useFetchWithAuth();

  const [dropdownValue, setDropdownValue] = useState({
    state: '',
    month: '',
    activity: ''
  })
  useEffect(() => {
    if(data?.thingsToDo) {
      setAdventures({status: true, data: data.thingsToDo})
    }
  }, [data])
  
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
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
  const handleAdventure = async (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const adventure = {
      city: formData.get('city'),
      state: dropdownValue.state,
      month: dropdownValue.month,
      activity: dropdownValue.activity
    }
    setAdventures({status: false, data: []})
    await fetchRequest('https://travelus-9ca2f8ce253e.herokuapp.com/api/v1/adventure', 'POST', adventure, authUser.token)

  }
  return (
    <Layout>
      {!authUser.login && 
        <div className='flex justify-center w-full mb-6'>
           {!isLogin ? <SignUp setIsLogin={(x) => setIsLogin(x)} />: (<LogInForm setIsLogin={(x) => setIsLogin(x)}/>)}
        </div>
      }
      <div className='flex justify-between w-full gap-6 flex-wrap max-w-7xl'>
      <div className='border border-bluelight bg-bluelight/5 border-dashed rounded-lg w-full p-6 min-w-96'>
        <form ref={form} className='flex flex-col gap-6'>
          <p className='text-center text-xl md:text-2xl'>Got a destination in mind?</p>
          <div className='flex gap-6 flex-wrap'>
            <input
              type='text'
              placeholder='City or Location'
              name='city'
              className='border border-dashed border-bluelight rounded-md p-3 bg-transparent flex-grow'
            />
            <div className='border border-dashed border-bluelight rounded-md bg-transparent flex-grow'>
              <Dropdown
              options={states} 
              placeholder='--Choose a state--'
              setDropdownValue={(state) => setDropdownValue({...dropdownValue, state})}
              />
            </div>
            <div className='border border-dashed border-bluelight rounded-md bg-transparent flex-grow'>
              <Dropdown options={months}
              placeholder='--Choose a month--' 
              setDropdownValue={(month) => setDropdownValue({...dropdownValue, month})}
              />
            </div>
            <div className='border border-dashed border-bluelight rounded-md bg-transparent flex-grow'>
              <Dropdown options={activities} 
              placeholder='--Choose a activity--' 
              setDropdownValue={(activity) => setDropdownValue({...dropdownValue, activity})}
              />
            </div>
          </div>
          <button 
          className='rounded-md p-3 bg-bluelight hover:bg-bluelight/20 text-xl md:text-2xl'
          onClick={(e) => handleAdventure(e)}
          >Find Your Adventure</button>          
        </form>
      </div>
      <div className='border border-bluelight bg-bluelight/5 border-dashed rounded-lg p-6 w-full flex justify-center items-center'>
        {adventures.status ? (
          <div className='flex flex-col gap-6 w-full'>
            {adventures.data.map((adventure, index) => (
              <div key={index} className='flex flex-col gap-3 border border-bluelight border-dashed rounded-lg p-6'>
                <p className='text-2xl rounded-md p-3 bg-bluelight/70'>{adventure.activity}</p>
                <p className='text-xl'>{adventure.description}</p>
                <p className='text-xl flex flex-col'>
                  <span className='font-semibold'>Fun Fact: </span>
                  {adventure.funFact}</p>
                <p className='text-xl flex flex-col'>
                  <span className='font-semibold'>Accesories: </span>
                  {adventure.accessories}</p>
              </div>
            ))}
          </div>
        ): (
          <div>
            {isLoading ? <p className='md:text-5xl text-xl'>Loading...</p>: <p className='md:text-5xl text-xl'>Your discoveries are on the horizon...</p>}
            {
              error && <p className='text-xl'>Error: {error}</p>
            }
          </div>
        )}
      </div>
      </div>
    </Layout>
  )
}
