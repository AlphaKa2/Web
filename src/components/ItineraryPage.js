import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './ItineraryPage.css';

const ItineraryPage = () => {
  const [schedule, setSchedule] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [newStartHour, setNewStartHour] = useState('00');
  const [newStartMinute, setNewStartMinute] = useState('00');
  const [newEndHour, setNewEndHour] = useState('00');
  const [newEndMinute, setNewEndMinute] = useState('00');
  const [center, setCenter] = useState({ lat: 36, lng: 128 }); // Set a default center
  const mapRef = useRef(null); // Map instance reference
  const isMapInitialized = useRef(false); // To track if the map is already initialized

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD379m_qluKwVTRNMpf2yjywwGTGDsHgos',
    version: '3.47', // Specify version to avoid unexpected issues
  });
   // Clean up the map instance when the component unmounts
   useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current = null; // Clean up map reference
        isMapInitialized.current = false; // Reset initialization state
      }
    };
  }, []);


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
        const coords = await geocodeLocation(newLocation);
        const newScheduleItem = {
          startTime: `${newStartHour}:${newStartMinute}`,
          endTime: `${newEndHour}:${newEndMinute}`,
          location: newLocation,
          lat: coords.lat,
          lng: coords.lng
        };
        setSchedule([...schedule, newScheduleItem]);

        if (mapRef.current) {
          mapRef.current.panTo({ lat: coords.lat, lng: coords.lng });
          mapRef.current.setZoom(14);
        }

        setCenter({ lat: coords.lat, lng: coords.lng });
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
            center={center}
            zoom={7.5}
            onLoad={map => {
              if (!mapRef.current && !isMapInitialized.current) {
                mapRef.current = map;
                isMapInitialized.current = true;  // Prevent further reinitializations
              }
            }}
          >
            {schedule.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                label={location.location}
              />
            ))}
          </GoogleMap>
      </div>
    </div>
  );
};

export default ItineraryPage;
