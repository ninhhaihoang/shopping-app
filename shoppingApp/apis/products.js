import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:5000/api/'
    baseURL: 'http://192.168.1.3:5000/api/'
    // baseURL: 'http://10.0.1.1:5000/api/'
})