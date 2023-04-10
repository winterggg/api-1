import { useEffect } from "react"

const Favorites = () => {
  useEffect(() => {
    document.title = "Favorites - Notedly"
  })

  return (
    <div>
      <h1>Notedly</h1>
      <p>This are my favorite notes</p>
    </div>
  )
}

export default Favorites