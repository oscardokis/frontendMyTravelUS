import Dropdown from '../Components/Dropdown.jsx'
import Layout from '../Components/Layout.jsx'
export default function Adventure() {
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
  return (
    <Layout>
      <div className='flex justify-around w-full'>
      <div className='border border-bluelight border-dashed rounded-lg w-3/12 p-12 mt-12'>
        <div className='flex flex-col gap-6'>
          <p className='text-center text-2xl'>Got a destination in mind?</p>
          <input
            type='text'
            placeholder='City or Location'
            className='border border-bluelight rounded-md p-3 bg-transparent'
          />
          <div>
            <Dropdown options={states} placeholder='--Choose a state--' />
          </div>
          <div>
            <Dropdown options={months} placeholder='--Choose a month--' />
          </div>
          <div>
            <Dropdown options={activities} placeholder='--Choose a activity--' />
          </div>
          <button className='rounded-md p-3 bg-bluelight'>Find Your Adventure</button>          
        </div>
      </div>
      <div className='border border-bluelight border-dashed rounded-lg p-12 mt-12 flex justify-center items-center'>
        <p className='text-5xl '>Your discoveries are on the horizon...</p>
      </div>
      </div>
    </Layout>
  )
}
