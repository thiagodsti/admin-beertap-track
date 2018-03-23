import axios from 'axios';

const api = 'https://rd-beertap.herokuapp.com';

const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf8',
  },
};

export class TrackAPI {
  static findUsers = () => axios.get(`${api}/users`, config);
  static findTracksByUser = email => axios.get(`${api}/users/${email}/tracks`, config);
}

export default TrackAPI;
