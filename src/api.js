// const API = 'http://localhost:3000';
const API = '../public';

export default {
  fetchUsers: () => fetch(`${API}/users.json`).then(users => users.json()),
  fetchCurrentVacancy: (id) =>
    fetch(`${API}/users.json`)
      .then(users => users.json())
      .then(response => response.data.find(({ name }) => name.toLowerCase() === id.toLowerCase())),
};