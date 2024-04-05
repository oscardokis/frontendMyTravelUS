function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="flex flex-col items-center text-white p-3 text-xs w-full">
      <hr className="h-[2px] w-full min-w-[18rem] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-bluelight to-transparent bg-center md:my-3" />
      <h2 className="mb-3 text-bluelight">Design by Oscar Gonzalez © {year} </h2>
    </div>
  )
}

export default Footer
