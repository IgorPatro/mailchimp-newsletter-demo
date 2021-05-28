import * as React from "react"
import { ToastsContainer, ToastsStore } from "react-toasts"
import axios from "axios"

const Home = () => {
  const [newSubscriberEmail, setNewSubscriberEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await axios
      .post("/api/newsletter-signup", {
        email: newSubscriberEmail,
      })
      .then((res) => ToastsStore.success(res.data.message))
      .catch((err) =>
        ToastsStore.error("Wystąpił jakiś problem, spróbuj ponownie później")
      )

    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newSubscriberEmail}
          onChange={(e) => setNewSubscriberEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Zapisz się!
        </button>
      </form>
      <ToastsContainer store={ToastsStore} />
    </>
  )
}

export default Home
