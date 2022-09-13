import React, { useState , useEffect } from 'react';
import "../css/App.css";
import * as ContactsAPI from '../utils/ContactsAPI';
import { Route ,Routes ,useNavigate}  from  'react-router-dom';
import CreateContact from './CreateContact';
import ListContacts from './ListContacts' ;




const App = () => {
  let navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  //const [screen,setScreen] = useState("list");
  useEffect(() => {
    //in callback function we can make up our API call
    // here our goal in to get all contacts and set contacts in out state 
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, [])

  const removeContact = (contact) => {
    ContactsAPI.remove(contact);
    setContacts(contacts.filter(cont => cont.id !== contact.id))
    //console.log(contacts);
  };

  const createContact = (contact) => { 
    const create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat(res));
    };
    //console.log(contacts);
    create();
    navigate("/")
  }
  //contains call back function and depenecies in array
 

  
  return (
    <Routes>
      <Route exact path='/' element={<ListContacts contacts={contacts} onDeleteContact={removeContact} /> } />
      <Route exact path='/create' element={<CreateContact onCreateContact={ (contact) =>{ createContact(contact)}} />} />
    </Routes>
  );

};


export default App;
