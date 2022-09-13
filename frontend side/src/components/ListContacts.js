import {React ,useState} from 'react';
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';

const ListContacts = ({ contacts, onDeleteContact }) => {

    const [query, setQuery] = useState("");

    const handleInputChange = (query) => {
        setQuery(query.trim());
        console.log(query);
    }

    const showingContact = (query) === "" ? contacts : ( contacts.filter((c) => c.name.toLowerCase().startsWith(query.toLowerCase())) );

    return (
        <div className="list-contacts">
            <div className='list-contacts-top'>
                <input
                    className='search-contacts'
                    type="text"
                    placeholder='Search contacts'
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <Link to='/create' className='add-contact'>
                    add contact
                </Link>
            </div>
            <ol>
            {
                showingContact.map((contact) => {
                    return (
                        <li key={contact.id} className="contact-list-item">
                            <div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})`}}></div>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button className="contact-remove" onClick={() => onDeleteContact(contact)}> Remove</button>
                        </li>
                    )
                })
            }
            </ol>
        </div>
    )
};
ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};



export default ListContacts;