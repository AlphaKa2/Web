import React, { useState } from 'react';
import './CreatePlan.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaChevronDown } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function CreatePlan() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleRecommendation = () => {
    console.log(`장소: ${location}, 날짜: ${startDate} ~ ${endDate}, 예산: ${budget}`);
    navigate('/create-plan2');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const selectLocation = (loc) => {
    setLocation(loc);
    setDropdownOpen(false);
  };

  const locationOptions = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
  ];

  return (
    <div className="container1">
      <div className="background1">
        <div className="form-box1">
          <div className="form-row1">
            <div className="form-group1">
              <label htmlFor="location">장소</label>
              <div className="input-container1">
                <FaMapMarkerAlt className="input-icon1" />
                <input
                  type="text"
                  id="location"
                  value={location}
                  placeholder="부산광역시"
                  className="input styled-input1"
                  onClick={toggleDropdown}
                />
                <FaChevronDown className="dropdown-toggle1" onClick={toggleDropdown} />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu1">
                  <ul>
                    {locationOptions.map((loc) => (
                      <li key={loc} onClick={() => selectLocation(loc)}>
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="form-group1">
              <label htmlFor="startDate">일정</label>
              <div className="input-container1">
                <FaCalendarAlt className="input-icon1" />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy/MM/dd"
                  className="input styled-input1"
                  placeholderText="출발 날짜"
                />
                <span className="date-separator1"> | </span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy/MM/dd"
                  className="input styled-input1"
                  placeholderText="도착 날짜"
                />
              </div>
            </div>

            <div className="form-group1">
              <label htmlFor="budget">예산</label>
              <div className="input-container1">
                <FaMoneyBillWave className="input-icon1" />
                <input
                  type="text"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="₩300,000"
                  className="input styled-input1"
                />
              </div>
            </div>
          </div>

          <div className="button-container1">
            <button onClick={handleRecommendation} className="recommend-button1">
              추천
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;
