import React, { useState, useContext, useEffect } from "react"
import ContactContext from "../../context/contact/contactContext"
import AlertContext from "../../context/alert/alertContext"

const ContactForm = () => {
  const context = useContext(ContactContext)
  const { addContact, current, clearCurrent, updateContact } = context

  const alertContext = useContext(AlertContext)

  useEffect(() => {
    if (current !== null) {
      setContact(current)
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        address: "",
        type: "personal",
      })
    }
    // eslint-disable-next-line
  }, [ContactContext, current])

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "personal",
  })

  const { name, email, phone, address, type } = contact

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()

    if (current === null) {
      if (email !== "" || phone !== "") {
        addContact(contact)
      } else {
        alertContext.setAlert("Please Fill atleast Email", "danger")
      }
    } else {
      updateContact(contact)
    }
    setContact({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "personal",
    })
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current !== null ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        autoComplete="off"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        autoComplete="off"
        name="email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        autoComplete="off"
        value={phone}
        onChange={onChange}
      />
      <textarea
        placeholder="Address"
        name="address"
        autoComplete="off"
        value={address}
        onChange={onChange}
        required
      />
      <h5>Contact Type</h5>
      <label>
        <input
          type="radio"
          name="type"
          value="personal"
          onChange={onChange}
          checked={type === "personal"}
        />{" "}
        Personal{" "}
      </label>
      <label>
        <input
          type="radio"
          name="type"
          value="professional"
          onChange={onChange}
          checked={type === "professional"}
        />{" "}
        Professional{" "}
      </label>
      <div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value={current !== null ? "Update Contact" : "Add Contact"}
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  )
}

export default ContactForm
