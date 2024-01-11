import React, { useState } from 'react'

const NewContact = ({setUiState, onCreateContact}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreateContact({name,email,phone})
        setUiState('contactlist')
    } 
  return (
    <div>
        <div className='container'>
            <h2>New Contact</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="phonenumber">Phone number</label>
                <input type="text" name='phonenumber' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <label htmlFor="email">email</label>
                <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type='submit'>Save</button>
                <button onClick={() => setUiState('contactlist')}>cancel</button>
            </form>
            

        </div>
    </div>
    
  )
}

export default NewContact