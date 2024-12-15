import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080', // Spring Boot API URL
});

// 요청 인터셉터
api.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

// 응답 인터셉터
api.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

export default api;
