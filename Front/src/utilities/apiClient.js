import axios from "axios";

const API_BASE_URL = "http://localhost:9000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  mode: 'cors',

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  headers: { "X-Requested-With": "XMLHttpRequest", 'Accept': 'application/json' }
});


export default client;
