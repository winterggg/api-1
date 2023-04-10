import { useEffect } from "react"

const MyNotes = () => {
  useEffect(() => {
    document.title = "My Notes - Notedly"
  })

  return (
    <div>
      <h1>Notedly</h1>
      <p>This are my notes</p>
    </div>
  )
}

export default MyNotes