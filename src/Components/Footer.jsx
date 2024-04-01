function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="flex flex-col items-center text-white p-3 text-xs w-full">
    <h2 className="mb-3">Design by Oscar Gonzalez © {year} </h2>
    </div>
  )
}

export default Footer