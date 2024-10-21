import React, { useState, useEffect } from 'react';
import './CreatePlan2.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePlan2() {
  const [transport, setTransport] = useState('');
  const [motive, setMotive] = useState('');
  const [purpose, setPurpose] = useState('');
  const [style, setStyle] = useState(2); // 여행 스타일
  const [startDate, setStartDate] = useState(sessionStorage.getItem("startDate"));
  const [endDate, setEndDate] = useState(sessionStorage.getItem("endDate"));
  const [location, setLocation] = useState(sessionStorage.getItem("location") + ' ' + sessionStorage.getItem("subLocation"));

  const navigate = useNavigate();

  // 여행 스타일 리스트
  const styleMapping = ["매우 자연 선호", "자연 선호", "중립", "도시 선호", "매우 도시 선호"];


  // 여행 기간 계산
  const calculateTravelDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24)); // ms를 일수로 변환
    return days;
  };

  const handleSubmit = async () => {
    const travelDays = calculateTravelDays(startDate, endDate);
    const ageGroup = calculateAgeGroup(age);

    const requestData = {
      TRAVEL_PURPOSE: purpose, // 여행 목적
      MVMN_NM: transport, // 이동 수단
      TRAVEL_STYL_1: styleMapping[style], // 여행 스타일
      TRAVEL_MOTIVE_1: motive, // 여행 동기
      TRAVEL_STATUS_ACCOMPANY: sessionStorage.getItem('companionship'), // 동행 상태
      TRAVEL_STATUS_DAYS: travelDays, // 여행 일수
      ROAD_ADDR: location, // 지역 주소
      recommendation_type: 'AI-GENERATED', // 추천 타입
      start_date: startDate, // 여행 시작일
      end_date: endDate // 여행 끝일
    };

    try {
      const response = await axios.post('http://backend-server-url/api/recommendation', requestData);
      console.log('AI 추천 결과:', response.data);
      navigate('/itinerary'); // 추천 결과 페이지로 이동
    } catch (error) {
      console.error('AI 추천 오류:', error);
    }
  };

  return (
    <div className="travel-plan-container2">
      <div className="travel-plan-box2">
        <button className="back-button2" onClick={() => navigate('/create-plan')}>이전</button>
        <h3>이동 수단</h3>
        <select value={transport} onChange={(e) => setTransport(e.target.value)} className="dropdown2">
          <option value="" disabled></option>
          <option value="CAR">자가용</option>
          <option value="PUBLIC_TRANSPORTATION">대중교통</option>
        </select>

        <h3>여행 동기</h3>
        <select value={motive} onChange={(e) => setMotive(e.target.value)} className="dropdown2">
          <option value="" disabled></option>
          <option value="ESCAPE">일탈</option>
          <option value="REST">휴식</option>
          <option value="COMPANION_BONDING">우정 여행</option>
          <option value="SELF_REFLECTION">자아 성찰</option>
          <option value="SOCIAL_MEDIA">SNS 통해</option>
          <option value="EXERCISE">운동</option>
          <option value="NEW_EXPERIENCE">새로운 경험</option>
        </select>

        <h3>여행 목적</h3>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="dropdown2">
          <option value="" disabled></option>
          <option value="SHOPPING">쇼핑</option>
          <option value="THEME_PARK">테마파크</option>
          <option value="HISTORIC_SITE">역사 유적지</option>
          <option value="CITY_TOUR">시티 투어</option>
        </select>

        <h3>여행 스타일</h3>
        <div className="circle-slider2">
          <div className="line2"></div>
          {styleMapping.map((label, index) => (
            <button
              key={index}
              className={`circle2 ${style === index ? 'active' : ''}`}
              onClick={() => setStyle(index)}
              aria-label={label}
            ></button>
          ))}
        </div>
        <div className="style-label2">{styleMapping[style]}</div>

        <button className="submit-button2" onClick={handleSubmit}>
          결과 보러가기
        </button>
      </div>
    </div>
  );
}

export default CreatePlan2;
