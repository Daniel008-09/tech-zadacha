import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, updateContact, removeContact } from './reducer';

function ContactManager() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const handleSave = () => {
    if (!inputValue.trim()) return;
    if (editId) {
      dispatch(updateContact({ id: editId, name: inputValue }));
      setEditId(null);
    } else {
      dispatch(addContact({ id: Date.now(), name: inputValue }));
    }
    setInputValue('');
  };

  const handleEdit = (contact) => {
    setEditId(contact.id);
    setInputValue(contact.name);
  };

  const toggleHighlight = (contactId) => {
    setHighlightedId(contactId === highlightedId ? null : contactId);
  };

  return (
    <div className="contact-manager">
      <div className="input-form">
        <h1 className="header">список задач</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="введите задачу"
        />
        <button onClick={handleSave}>
          {editId ? 'Update' : 'добав'}
        </button>
      </div>

      <ul className="contact-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`contact-item ${contact.id === highlightedId ? 'highlighted' : ''}`}
          >
            <span className="contact-name">{contact.name}</span>
            <div className="contact-actions">
              <button onClick={() => handleEdit(contact)}>Edit</button>
              <button onClick={() => dispatch(removeContact(contact.id))}>Delete</button>
              <button onClick={() => toggleHighlight(contact.id)}>
                {contact.id === highlightedId ? 'Unhighlight' : 'Highlight'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactManager;
