import React,{useState,useEffect} from 'react'
import {uuid} from 'uuidv4'
import './App.css';
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
function App() {

  const LOCAL_STORAGE_KEY = 'contacts'
  const [contacts,setContacts] = useState([])

  const addContactHandler = (x) => {
    console.log(x)
    setContacts([...contacts,{id : uuid(), ...x}])
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((x) => {
      return x.id !== id;
    })
    setContacts(newContactList)
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(retriveContacts) setContacts(retriveContacts)
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(contacts))
  },[contacts])
  return (
    <div>
      <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
