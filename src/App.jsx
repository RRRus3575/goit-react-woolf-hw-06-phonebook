import { Form } from "./Form/Form";
import { Input } from "./inputs/Input";
import { ContactRender } from "./ContactRender/ConstactRender";
import { useDispatch, useSelector } from "react-redux";

import { deleteContact } from "./store/Slice/contactsSlice";
import { getContacts, getFilter } from "./store/selectors";

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const handleDelete = (nameEl) => {
    dispatch(deleteContact(nameEl));
  };

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
