import { useEffect, useState } from "react";
import { Form } from "./Form/Form";
import { Input } from "./inputs/Input";
import { ContactRender } from "./ContactRender/ConstactRender";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "./store/Slice/contactsSlice";
import { deleteContact } from "./store/Slice/contactsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { filterContacts } from "./store/Slice/filterSlice";
import { localStorageContacts } from "./store/Slice/contactsSlice";

export const App = () => {
  const { contacts } = useSelector((state) => state.contacts);
  const { filter } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  console.log(contacts, filter);

  // useEffect(() => {
  //   dispatch();
  // });

  // const [contacts, setContacts] = useState(() => {
  //   const contacts = localStorage.getItem("contacts");

  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     return parsedContacts;
  //   }
  //   return [];
  // });

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");

    const parsedContacts = JSON.parse(contacts);
    console.log("parse", parsedContacts, parsedContacts.length);

    if (parsedContacts && parsedContacts.length > 0) {
      dispatch(localStorageContacts(parsedContacts));
      return;
    }
  }, []);

  const handleDelete = (nameEl) => {
    dispatch(deleteContact(nameEl));
  };
  const handleSubmit = (name, number) => {
    console.log(name);
    if (contacts.find((el) => el.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is alredy in contacts`);
      return;
    }
    dispatch(
      createContact({
        name: name,
        number: number,
        id: nanoid(),
      })
    );
  };

  const handleSearch = ({ target: { value: filter } }) => {
    dispatch(filterContacts(filter));
  };

  const contactFilter = () => {
    const cont = contacts.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
    return cont;
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        margin: 50,
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={handleSubmit} />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2>Contacts</h2>
          <Input
            onChange={handleSearch}
            value={filter}
            type={"text"}
            name={"filter"}
            label={"Find contacts by name"}
          />
          <ul>
            <ContactRender contacts={contactFilter()} onClick={handleDelete} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
