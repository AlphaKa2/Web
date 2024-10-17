import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import "./CreatePlan2.css";

import natureIcon from "../assets/images/natureicon.png"; // Nature preference icon
import cityIcon from "../assets/images/cityicon.png"; // City preference icon

function CreatePlan2() {
  const navigate = useNavigate(); // Initialize navigate for page transitions
  const [transport, setTransport] = useState("");
  const [season, setSeason] = useState("");
  const [purpose, setPurpose] = useState("");
  const [style, setStyle] = useState(2); // Initial style value

  // Style mapping
  const styleMapping = ["매우 자연 선호", "자연 선호", "중립", "도시 선호", "매우 도시 선호"];

  // Function to submit data
  const handleSubmit = async () => {
    const data = {
      transport,
      season,
      purpose,
      style: styleMapping[style], // Only send style text to backend
    };

    try {
      const response = await axios.post("http://backend-server-url/api/recommendation", data);
      console.log("Response from server:", response.data);
      navigate("/ItineraryPage"); // Navigate to ItineraryPage on success
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  return (
    <div className="travel-plan-container2">
      <div className="travel-plan-box2">
        <button className="back-button2" onClick={() => navigate("/create-plan")}>이전</button>
        <h3>이동 수단</h3>
        <select value={transport} onChange={(e) => setTransport(e.target.value)} className="dropdown2">
          <option value="" disabled></option>
          <option value="CAR">자가용</option>
          <option value="PUBLIC_TRANSPORTATION">대중교통</option>
        </select>

        <h3>여행 동기</h3>
        <select value={season} onChange={(e) => setSeason(e.target.value)} className="dropdown2">
          <option value="" disabled></option>
          <option value="ESCAPE">일상 탈출</option>
          <option value="REST">휴식</option>
          <option value="COMPANION_BONDING">커플 여행</option>
          <option value="SELF_REFLECTION">자기 반성</option>
          <option value="SOCIAL_MEDIA">SNS 통해</option>
          <option value="EXERCISE">운동</option>
          <option value="NEW_EXPERIENCE">새로운 경험</option>
          <option value="CULTURAL_EDUCATION">문화 체험</option>
          <option value="SPECIAL_PURPOSE">특별한 목적</option>
        </select>

        <h3>여행 목적</h3>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="dropdown2">
          <option value="" disabled></option>
          <option value="SHOPPING">쇼핑</option>
          <option value="THEME_PARK">테마파크</option>
          <option value="HISTORIC_SITE">역사 유적지</option>
          <option value="CITY_TOUR">시티 투어</option>
          <option value="OUTDOOR_SPORTS">야외 스포츠</option>
          <option value="CULTURAL_EVENT">문화 행사</option>
          <option value="NIGHTLIFE">나이트라이프</option>
          <option value="CAMPING">캠핑</option>
          <option value="LOCAL_FESTIVAL">지역 축제</option>
          <option value="SPA">스파</option>
          <option value="EDUCATION">교육</option>
          <option value="FILM_LOCATION">영화 촬영지</option>
          <option value="PILGRIMAGE">순례 여행</option>
          <option value="WELLNESS">웰니스</option>
          <option value="SNS_SHOT">SNS 촬영지</option>
          <option value="HOTEL_STAYCATION">호텔 스테이케이션</option>
          <option value="NEW_TRAVEL_DESTINATION">새로운 여행지</option>
          <option value="PET_FRIENDLY">반려동물 친화</option>
          <option value="INFLUENCER_FOLLOW">인플루언서 따라잡기</option>
          <option value="ECO_TRAVEL">에코 여행</option>
          <option value="HIKING">하이킹</option>
        </select>

        <h3>여행 스타일</h3>
        <div className="circle-slider2">
          <img src={natureIcon} alt="Nature" className="slider-icon2 left-icon2" />
          <div className="line2"></div>
          {styleMapping.map((label, index) => (
            <button
              key={index}
              className={`circle2 ${style === index ? "active" : ""}`}
              onClick={() => setStyle(index)}
              aria-label={label}
            ></button>
          ))}
          <img src={cityIcon} alt="City" className="slider-icon2 right-icon2" />
        </div>
        <div className="style-label2">{styleMapping[style]}</div>

        <button className="submit-button2" onClick={() => navigate("/itinerary")}>결과 보러가기</button>
      </div>
    </div>
  );
}

export default CreatePlan2;
