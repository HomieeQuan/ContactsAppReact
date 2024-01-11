import { useState, useEffect } from 'react';
import ContactList from './Components/ContactList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import NewContact from './Components/NewContact';
import Login from './Components/Login';
import Register from './Components/Register';
import UpdateContact from './Components/UpdateContact';

function App() {
  const [uiState, setUiState] = useState('contactlist');
  const [authToken, setAuthToken] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [contactList, setContactList] = useState([])
  const [loading, setLoading] = useState(true);
  console.log(contactList)

  /* 
  The authtoken is used to prove that the user is who they say they are. The server signs the authtoken and sends it back to React. 
  Whenever React wants to do something with the server it send that authtoken to the server.
  Then the server checks that signature against that secret variable in the server
  If it fails you can't use the server
  But if it succeeds then you can use the server
  */

  useEffect(() => {
    if(authToken === null){
      console.log('no authtoken cant fetch contacts')
      return
    }
    console.log('we have a authtoken fetching contacts')
    const fetchData = async () => {
      try {
        const fetchOptions = {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
        
        const response = await fetch('http://localhost:8000/api/contacts',fetchOptions);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const contacts = await response.json();
        console.log('contacts from the server',contacts)
        setContactList(contacts);
        setLoading(false);
      } catch (error) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchData(); // Call the async function when the component mounts

    // Optionally, you can return a cleanup function to perform actions when the component unmounts
    return () => {
      // Cleanup code if needed
    };
  }, [authToken]); // Empty dependency array ensures the effect runs only once on mount
                  //  If it's not empty it runs when ever the authtoken changes

  
  
  const onCreateContact = (contact) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    };

    fetch('http://localhost:8000/api/contacts', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(dbContact => {
        console.log('Post request successful:', dbContact);
        const newContacts = []
        newContacts.push(...contactList)
        newContacts.push(dbContact)
        setContactList(newContacts)
        // Handle the response data here
      })
      .catch(error => {
        console.error('Error during POST request:', error);
        // Handle errors here
      });
  };
  // make a onDeleteContact instead of PUT use Delete 
  const onUpdateContact = (contact) => {
    console.log('should send this contact to the server', contact);

    const requestOptions = {
      method: 'PUT', 
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    };

    fetch('http://localhost:8000/api/contacts/' + contact._id, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(dbContact => {
        console.log('Put request successful:', dbContact);
        setUiState('contactlist')
        const newContacts = []
        contactList.forEach(contact => {
          if(contact._id === dbContact._id){
            newContacts.push(dbContact)
          }else{
            newContacts.push(contact)
          }
        })
        setContactList(newContacts)
        // Handle the response data here
      })
      .catch(error => {
        console.error('Error during PUT request:', error);
        // Handle errors here
      });
  };
  const onDeleteContact = (deletedContact) => {
    

    const requestOptions = {
      method: 'DELETE', 
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deletedContact),
    };

    fetch('http://localhost:8000/api/contacts/' + deletedContact._id, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(dbContact => {
        console.log('Put request successful:', dbContact);

        /*
          Give React a new array when the data changes to re render the page. If you give React the old array it doesn't change anything
        */
        const newContacts = []
        contactList.forEach(contact => {
          if(contact._id != deletedContact._id){
            newContacts.push(contact)
            
          }
        })
        setContactList(newContacts)
        // Handle the response data here
      })
      .catch(error => {
        console.error('Error during PUT request:', error);
        // Handle errors here
      });
  };

  const editContact = (contact) => {
    setEditingContact(contact);
    setUiState('updatecontact');
  };

  let components = (
    <ContactList setUiState={setUiState} authToken={authToken} editContact={editContact} onDeleteContact={onDeleteContact} contactList={contactList} />
  );
  if(uiState === 'register'){
    components = <Register setUiState={setUiState} />
  }else if (!authToken || uiState === 'login') {
    components = <Login setAuthToken={setAuthToken} setUiState={setUiState} />;
  } else if (uiState === 'newcontact') {
    components = <NewContact setUiState={setUiState} onCreateContact={onCreateContact} />;
  } else if (uiState === 'updatecontact') {
    components = (
      <UpdateContact setUiState={setUiState} contact={editingContact} onUpdateContact={onUpdateContact} />
    );
  }

  console.log(uiState);

  return <>{components}</>;
}

export default App;

