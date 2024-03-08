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

  const handleDelete = (nameEl) => {
    dispatch(deleteContact(nameEl));
  };

  // const handleSearch = ({ target: { value: filter } }) => {
  //   dispatch(filterContacts(filter));
  // };

  const contactFilter = () => {
    const cont = contacts.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
    return cont;
  };

  return (
    <div
      style={{
        margin: 50,
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <Form />
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
            // onChange={handleSearch}
            // value={filter}
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
