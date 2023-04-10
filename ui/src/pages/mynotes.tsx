import { useEffect } from "react"

const MyNotes = () => {
  useEffect(() => {
    document.title = "My Notes - Notedly"
  })

  return (
    <div>
      <p>This are my notes</p>
    </div>
  )
}

export default MyNotes