import React, { useState, useEffect } from 'react'

const UpdateContact = ({ contact, onUpdateContact }) => {
    console.log('contact', contact)
    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the input fields if needed

        // Update the contact with the new information
        const updatedContact = {
            _id: contact._id, // Assuming you have an ID for each contact
            name,
            email,
            phone,
        };

        // Call the onUpdateContact function passed as a prop
        onUpdateContact(updatedContact);

        // You may want to reset the form or close the modal/dialog after updating
    };

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </div>
            <button type="submit">Update Contact</button>
        </form>

    )
}

export default UpdateContact