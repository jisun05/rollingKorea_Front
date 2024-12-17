import axios from 'axios';

// create Axios 
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Spring Boot API URL
});

// request 
apiClient.interceptors.request.use(logRequest => {
    console.log('Starting Request', logRequest);
    return logRequest;
});

// response
apiClient.interceptors.response.use(logResponse => {
    console.log('Response:', logResponse);
    return logResponse;
});

export default apiClient;
