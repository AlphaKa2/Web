import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './ItineraryPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItineraryPage = () => {
  const { recommendation_trip_id } = useParams(); // URL에서 recommendation_trip_id 가져오기
  const [days, setDays] = useState([]);  // 일정 저장 배열
  const [title, setTitle] = useState('');  // 여행 제목
  const [center, setCenter] = useState({ lat: 36, lng: 128 });  // 지도의 초기 중심 좌표
  const mapRef = useRef(null);  // 구글맵 인스턴스 참조

  // 추천 여행 상세 정보를 가져오는 함수
  useEffect(() => {
    const fetchRecommendationDetails = async () => {
      try {
        const response = await axios.get(`https://marqsmkncnqawjyf.tunnel-pt.elice.io/recommendations/${recommendation_trip_id}`);
        const data = response.data[0];  // 응답 데이터 구조에 맞게 사용

        // 여행 제목 설정
        setTitle(data.title);

        // 일정 데이터를 설정
        const daysData = data.days.map(day => ({
          day: day.day,
          schedule: day.schedule.map(location => ({
            location: location.place,
            lat: parseFloat(location.latitude),  // 좌표를 숫자로 변환
            lng: parseFloat(location.longitude), // 좌표를 숫자로 변환
            address: location.address
          }))
        }));

        setDays(daysData);

        // 지도 중심 좌표를 첫 번째 장소로 설정
        if (daysData.length > 0 && daysData[0].schedule.length > 0) {
          setCenter({ lat: daysData[0].schedule[0].lat, lng: daysData[0].schedule[0].lng });
        }
      } catch (error) {
        console.error('Error fetching recommendation details:', error);
      }
    };

    fetchRecommendationDetails();  // 상세 조회 API 호출
  }, [recommendation_trip_id]);


  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading indicator until map is loaded
  }

  const mapContainerStyle = {
    width: '99%',
    height: '100%'
  };

  return (
    <div className="schedule-and-map">
      <div className="travel-details">
        <div className="travel-info">
          <h2>{title}</h2> {/* 여행 제목 표시 */}
          {/* 여행 장소와 일정의 더미 데이터가 있던 곳 */}
        </div>
        <div className="schedule-details">
          <h2>일정 상세</h2>
          {days.map((day, dayIndex) => (
            <div key={dayIndex}>
              <div className="day-header">{day.day}일차</div>
              {day.schedule.map((item, index) => (
                <div key={index} className="time-location">
                  <span>{item.location} ({item.address})</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="map-container">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}  // 현재 지도 중심 좌표
            zoom={10}        // 줌 레벨 설정
            onLoad={map => mapRef.current = map}  // 지도 인스턴스 참조 저장
          >
            {days.flatMap(day => day.schedule).map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}  // 장소의 좌표
                label={location.location}  // 장소 이름
              />
            ))}
          </GoogleMap>
      </div>
    </div>
  );
};

export default ItineraryPage;
