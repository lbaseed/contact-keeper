import React, { useContext, useRef, useEffect } from "react"
import ContactContext from "../../context/contact/contactContext"

const ContactFilter = () => {
  const context = useContext(ContactContext)
  const { filterContacts, clearFilter, filtered } = context
  const text = useRef("")

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ""
    }
  })

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  )
}
export default ContactFilter
