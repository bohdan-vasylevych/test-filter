const API = 'http://localhost:3000';

export default {
  fetchUsers: () => fetch(`${API}/users.json`).then(users => users.json()),
};