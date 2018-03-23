import axios from 'axios';

const api = 'http://api.insurance.diniz.tech';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf8',
  },
};

export class InsuranceAPI {
  static findModules = () => axios.get(`${api}/modules`, config);
  static saveModule = module => axios.post(`${api}/modules`, module, config);

  static findUsers = () => axios.get(`${api}/users`, config);
  static saveUser = user => axios.post(`${api}/users`, user, config);
  static editUser = user => axios.put(`${api}/users/${user.id}`, user, config);
  static findUserById = id => axios.get(`${api}/users/${id}`, config);
  static findUserByLocation = location => axios.get(`${location}`, config);
}

export default InsuranceAPI;
