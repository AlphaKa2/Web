// 여행 계획 상세 페이지.js
import React from 'react';

const ItineraryPage = () => {
  return (
    <div className="travel-details1">
      <div className="travel-info1">
        <h2>여행 정보</h2>
        <p><strong>여행 장소:</strong> 제주도</p>
        <p><strong>여행 기간:</strong> 2024-07-12 ~ 2024-07-13 (2일)</p>
      </div>
      <div className="schedule-details1">
        <h2>일정 상세</h2>
        <div className="day-schedule1">
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
          </div>
        </div>
        <div className="day-schedule">
          <div className="day-header">2일차</div>
        </div>
      </div>
      <div className="action-buttons">
        <button className="save-btn">저장</button>
        <button className="cancel-btn">취소</button>
      </div>
    </div>
  );
};

export default ItineraryPage;