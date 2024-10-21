// src/axios.js
import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://172.16.210.60:8000', // API 기본 URL
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
});

// 응답 또는 에러 처리 인터셉터 (선택 사항)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 호출 중 오류 발생:', error);
    return Promise.reject(error);
  }
);

export default instance;