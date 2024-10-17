<<<<<<< HEAD
// TravelDetails.js
import React from 'react';
import './ItineraryPage.css'; // 스타일 파일을 추가합니다.
=======
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './ItineraryPage.css';
>>>>>>> b3117ad59ba673871b51b936681b8aee9f0d28db

const ItineraryPage = () => {
  const [schedule, setSchedule] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [newStartHour, setNewStartHour] = useState('00');
  const [newStartMinute, setNewStartMinute] = useState('00');
  const [newEndHour, setNewEndHour] = useState('00');
  const [newEndMinute, setNewEndMinute] = useState('00');
  const [center, setCenter] = useState({ lat: 36, lng: 128 }); // Adjusted center to include both Koreas
  const mapRef = useRef(null); // Reference for GoogleMap instance

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

  const handleAddSchedule = async () => {
    if (newLocation) {
      try {
        const coords = await geocodeLocation(newLocation); // Get coordinates for the location
        const newScheduleItem = {
          startTime: `${newStartHour}:${newStartMinute}`,
          endTime: `${newEndHour}:${newEndMinute}`,
          location: newLocation,
          lat: coords.lat, // Use fetched latitude
          lng: coords.lng  // Use fetched longitude
        };
        setSchedule([...schedule, newScheduleItem]);

        // Pan to the newly added marker and zoom in
        if (mapRef.current) {
          mapRef.current.panTo({ lat: coords.lat, lng: coords.lng });
          mapRef.current.setZoom(14); // Zoom into the location
        }

        // Update center state (in case map needs to rerender)
        setCenter({ lat: coords.lat, lng: coords.lng });

        // Clear input fields
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

  const handleDelete = (index) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(updatedSchedule);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
<<<<<<< HEAD
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
          <div className="time-location">
            <span>10:00 - 12:00 : 광안리</span>
            <button className="delete-btn">🗑️</button>
          </div>
          <div className="time-location">
            <span>14:00 - 16:00 : 서면</span>
            <button className="delete-btn">🗑️</button>
          </div>
          <div className="time-location">
            <span>18:08 - 19:19 : 부산 랜덤</span>
            <button className="delete-btn">🗑️</button>
          </div>
          <div className="new-schedule">
            <input type="text" placeholder="새로운 장소" />
            <input type="time" />
            <input type="time" />
            <button className="add-btn">추가</button>
=======
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
                :
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
                :
                <select value={newEndMinute} onChange={(e) => setNewEndMinute(e.target.value)}>
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </div>
              <button className="add-btn" onClick={handleAddSchedule}>추가</button>
            </div>
>>>>>>> b3117ad59ba673871b51b936681b8aee9f0d28db
          </div>
        </div>
        <div className="action-buttons">
          <button className="save-btn">저장</button>
          <button className="cancel-btn">취소</button>
        </div>
      </div>

      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyD379m_qluKwVTRNMpf2yjywwGTGDsHgos">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}  // Use dynamic center state (adjusted for both Koreas)
            zoom={7.5}          // Adjusted zoom to show the entire peninsula and surrounding areas
            onLoad={map => mapRef.current = map}  // Store the map instance reference
          >
            {schedule.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                label={location.location}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default ItineraryPage;
