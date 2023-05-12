import actions from '../redux/phonebook-actions';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const fetchAllContacts = () => async dispatch => {
  dispatch(actions.fetchAllContactsRequest());

  try {
    const response = await axios.get('/contacts');
    dispatch(actions.fetchAllContactsSuccess(response.data));
  } catch (error) {
    dispatch(actions.fetchAllContactsError(error.message));
  }
};

const addContact = (name, number) => async dispatch => {
  dispatch(actions.addContactRequest());
  try {
    const response = await axios.post('/contacts', { name, number });
    dispatch(actions.addContactSuccess(response.data));
  } catch (error) {
    dispatch(actions.addContactError(error.message));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(actions.deleteContactRequest());

  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(actions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(actions.deleteContactError(error.message));
  }
};

// eslint-disable-next-line
export default { fetchAllContacts, addContact, deleteContact };
