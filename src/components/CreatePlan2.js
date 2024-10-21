import React, { useState } from 'react';
import './CreatePlan2.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import natureIcon from "../assets/images/natureicon.png"; // Nature preference icon
import cityIcon from "../assets/images/cityicon.png"; // City preference icon

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
  const styleMapping = ["VERY_NATURE", "MODERATE_NATURE", "NEUTRAL", "MODERATE_CITY", "VERY_CITY"];

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

    const requestData = {
      TRAVEL_PURPOSE: purpose,
      MVMN_NM: transport,
      TRAVEL_STYL_1: styleMapping[style],
      TRAVEL_MOTIVE_1: motive,
      TRAVEL_STATUS_ACCOMPANY: sessionStorage.getItem('companionship'),
      TRAVEL_STATUS_DAYS: travelDays,
      ROAD_ADDR: location,
      recommendation_type: 'AI-GENERATED',
      start_date: startDate,
      end_date: endDate
    };

    try {
      // 서버로 보낼 데이터 확인 (콘솔 로그)
      console.log('서버로 보낼 데이터:', requestData);

      // 백엔드 요청
      const response = await axios.post('/plan-service/recommendations', requestData);
      console.log('AI 추천 결과:', response.data);

      // 요청이 성공하면 페이지 이동
      navigate('/itinerary');

    } catch (error) {
      console.error('AI 추천 오류:', error);
      alert('여행 계획을 생성하는 데 오류가 발생했습니다.');
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
          <option value="CULTURAL_EDUCATION">문화 체험</option>
          <option value="SPECIAL_PURPOSE">특별한 목적</option>
        </select>

        <h3>여행 목적</h3>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="dropdown2">
          <option value="SHOPPING">쇼핑</option>
          <option value="THEME_PARK">테마파크</option>
          <option value="HISTORIC_SITE">역사 유적지</option>
          <option value="CITY_TOUR">시티 투어</option>
          <option value="OUTDOOR_SPORTS">야외 스포츠</option>
          <option value="CULTURAL_EVENT">문화 행사</option>
          <option value="NIGHTLIFE">유흥/오락</option>
          <option value="CAMPING">캠핑</option>
          <option value="LOCAL_FESTIVAL">지역 축제</option>
          <option value="SPA">스파</option>
          <option value="EDUCATION">교육</option>
          <option value="FILM_LOCATION">영화 촬영지</option>
          <option value="PILGRIMAGE">순례 여행</option>
          <option value="WELLNESS">웰니스</option>
          <option value="SNS_SHOT">SNS 핫플</option>
          <option value="HOTEL_STAYCATION">호캉스</option>
          <option value="NEW_TRAVEL_DESTINATION">새로운 여행지</option>
          <option value="PET_FRIENDLY">반려동물 친화</option>
          <option value="INFLUENCER_FOLLOW">인플루언서 따라잡기</option>
          <option value="ECO_TRAVEL">친환경 여행</option>
          <option value="HIKING">하이킹</option>
        </select>

        <h3>여행 스타일</h3>
        <div className="circle-slider2">
          <img src={natureIcon} alt="Nature" className="slider-icon2 left-icon2" />
          <div className="line2"></div>
          {styleMapping.map((label, index) => (
            <button
              key={index}
              className={`circle2 ${style === index ? 'active' : ''}`}
              onClick={() => setStyle(index)}
              aria-label={label}
            ></button>
          ))}
          <img src={cityIcon} alt="City" className="slider-icon2 right-icon2" />
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
