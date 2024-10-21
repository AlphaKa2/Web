import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './ItineraryPage.css';
import axios from 'axios';

const ItineraryPage = () => {
  const [schedule, setSchedule] = useState([]);  // 일정 저장 배열
  const [newLocation, setNewLocation] = useState('');  // 새로운 장소 입력 필드
  const [newStartHour, setNewStartHour] = useState('00');
  const [newStartMinute, setNewStartMinute] = useState('00');
  const [newEndHour, setNewEndHour] = useState('00');
  const [newEndMinute, setNewEndMinute] = useState('00');
  const [center, setCenter] = useState({ lat: 36, lng: 128 });  // 지도의 초기 중심 좌표
  const mapRef = useRef(null);  // 구글맵 인스턴스 참조

  // AI로부터 받은 장소 추천 데이터를 불러오는 함수
  useEffect(() => {
    const fetchAIRecommendation = async () => {
      try {
        const response = await axios.get('http://backend-url/recommendation-data');  // API 호출
        const aiData = response.data.days.map(day => 
          day.schedule.map(location => ({
            location: location.place,
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude)
          }))
        ).flat();  // 데이터를 평탄화(flatten)하여 일정에 추가

        setSchedule(aiData);  // 추천된 장소를 일정에 설정
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
      }
    };

    fetchAIRecommendation();  // AI 추천 일정 가져오기
  }, []);

  // 지오코딩: 입력한 장소를 좌표로 변환하는 함수
  const geocodeLocation = async (location) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          resolve({ lat, lng });
        } else {
          reject(new Error('Geocode was not successful for the following reason: ' + status));
        }
      });
    });
  };

  // 새로운 장소를 일정에 추가하는 함수
  const handleAddSchedule = async () => {
    if (newLocation) {
      try {
        const coords = await geocodeLocation(newLocation);  // 장소 좌표 가져오기
        const newScheduleItem = {
          startTime: `${newStartHour}:${newStartMinute}`,
          endTime: `${newEndHour}:${newEndMinute}`,
          location: newLocation,
          lat: coords.lat,  // 변환된 좌표
          lng: coords.lng
        };
        setSchedule([...schedule, newScheduleItem]);  // 기존 일정에 새로운 장소 추가

        // 추가된 위치로 지도 이동 및 확대
        if (mapRef.current) {
          mapRef.current.panTo({ lat: coords.lat, lng: coords.lng });
          mapRef.current.setZoom(14);  // 확대
        }

        // 상태 초기화
        setNewLocation('');
        setNewStartHour('00');
        setNewStartMinute('00');
        setNewEndHour('00');
        setNewEndMinute('00');
      } catch (error) {
        console.error('Error fetching location:', error);
        alert('Failed to get the location coordinates. Please try again.');
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  // 일정에서 특정 장소를 삭제하는 함수
  const handleDelete = (index) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);  // 선택한 장소 제거
    setSchedule(updatedSchedule);  // 제거 후 일정 업데이트
  };


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
          <h2>여행 정보</h2>
          <p><strong>여행 장소:</strong> 제주도</p>
          <p><strong>여행 기간:</strong> 2024-07-12 ~ 2024-07-13 (2일)</p>
        </div>
        <div className="schedule-details">
          <h2>일정 상세</h2>
          <div className="day-schedule">
            <div className="day-header">1일차</div>
            {schedule.map((item, index) => (
              <div key={index} className="time-location">
                <span>{item.startTime} - {item.endTime} : {item.location}</span>
                <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️</button>
              </div>
            ))}
            <div className="new-schedule">
              <input
                type="text"
                placeholder="새로운 장소"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <div className="time-selectors">
                <label>Start Time:</label>
                <select value={newStartHour} onChange={(e) => setNewStartHour(e.target.value)}>
                  {[...Array(24).keys()].map(hour => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select value={newStartMinute} onChange={(e) => setNewStartMinute(e.target.value)}>
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </div>
              <div className="time-selectors">
                <label>End Time:</label>
                <select value={newEndHour} onChange={(e) => setNewEndHour(e.target.value)}>
                  {[...Array(24).keys()].map(hour => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select value={newEndMinute} onChange={(e) => setNewEndMinute(e.target.value)}>
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </div>
              <button className="add-btn" onClick={handleAddSchedule}>추가</button>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button className="save-btn">저장</button>
          <button className="cancel-btn">취소</button>
        </div>
      </div>

      <div className="map-container">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}  // 현재 지도 중심 좌표
            zoom={7.5}        // 줌 레벨 설정
            onLoad={map => mapRef.current = map}  // 지도 인스턴스 참조 저장
          >
            {schedule.map((location, index) => (
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
