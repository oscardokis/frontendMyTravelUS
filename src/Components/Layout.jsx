const Layout = ({children}) => {
  return(
    <div
    className='flex flex-col justify-center items-center mt-24 w-full text-white'>
      {children}
    </div>
  )
}
export default Layout