import React, { useState, useEffect } from 'react';
import './CreatePlan.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaChevronDown } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const regions = {
  "서울특별시": [],
  "부산광역시": [],
  "대구광역시": [],
  "인천광역시": [],
  "광주광역시": [],
  "대전광역시": [],
  "울산광역시": [],
  "세종특별자치시": [],
  "제주특별자치도": ["제주시", "서귀포시"],
  "경기도": ["수원시", "성남시", "안양시", "부천시", "광명시", "평택시", "동두천시", "안산시", "고양시", "과천시", "의왕시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의정부시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "하남시", "이천시", "파주시", "안성시", "가평군", "양평군", "연천군"],
  "강원도": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군", "홍천군", "횡성군", "영월군", "평창군", "정선군"],
  "충청북도": ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군", "단양군", "증평군"],
  "충청남도": ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
  "전라북도": ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
  "전라남도": ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
  "경상북도": ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
  "경상남도": ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"]
};

const companionshipOptions = [
  '3인 이상 여행(가족 외)',
  '자녀 동반 여행',
  '2인 여행(가족 외)',
  '나홀로 여행',
  '2인 가족 여행',
  '3대 동반 여행(친척 포함)'
];

function CreatePlan() {
  const [location, setLocation] = useState('');
  const [subLocation, setSubLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [companionship, setCompanionship] = useState(''); // 동행 상태 초기값
  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [isSubLocationDropdownOpen, setSubLocationDropdownOpen] = useState(false);
  const [isCompanionshipDropdownOpen, setCompanionshipDropdownOpen] = useState(false);

  const navigate = useNavigate();


  const handleNext = () => {
    // 입력 데이터를 세션에 저장
    sessionStorage.setItem("location", location);
    sessionStorage.setItem("subLocation", subLocation);
    sessionStorage.setItem("startDate", startDate);
    sessionStorage.setItem("endDate", endDate);
    sessionStorage.setItem("companionship", companionship);

    // 페이지 이동
    navigate('/create-plan2');
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen((prev) => !prev);
    setSubLocationDropdownOpen(false); // 우측 드롭다운 초기화
  };

  const toggleCompanionshipDropdown = () => {
    setCompanionshipDropdownOpen((prev) => !prev); // 동행 상태 드롭다운 토글
  };

  const selectLocation = (loc) => {
    setLocation(loc);
    setSubLocation(''); // 시/군 선택 초기화
    if (loc.endsWith('도')) {
      setSubLocationDropdownOpen(true); // 시/군이 있는 경우 우측 드롭다운 활성화
    } else {
      setSubLocationDropdownOpen(false); // 특별시, 광역시는 우측 드롭다운 비활성화
    }
    setLocationDropdownOpen(false);
  };

  const selectSubLocation = (subLoc) => {
    setSubLocation(subLoc);
    setSubLocationDropdownOpen(false);
  };

  const selectCompanionship = (comp) => {
    setCompanionship(comp); // 선택한 동행 상태 설정
    setCompanionshipDropdownOpen(false);
  };

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
                  value={subLocation ? `${location} ${subLocation}` : location} // 도 + 시/군 표시
                  placeholder="지역 선택"
                  className="input styled-input1"
                  onClick={toggleLocationDropdown}
                  readOnly
                />
                <FaChevronDown className="dropdown-toggle1" onClick={toggleLocationDropdown} />
              </div>

              {/* 좌측 드롭다운 */}
              {isLocationDropdownOpen && (
                <div className="dropdown-menu1">
                  <ul className="dropdown-list1">
                    {Object.keys(regions).map((loc) => (
                      <li key={loc} onClick={() => selectLocation(loc)}>
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 우측 드롭다운 ('도' 선택 시만 표시) */}
              {isSubLocationDropdownOpen && regions[location] && (
                <div className="dropdown-menu1">
                  <ul className="dropdown-list1">
                    {regions[location].map((subLoc) => (
                      <li key={subLoc} onClick={() => selectSubLocation(subLoc)}>
                        {subLoc}
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
              <label htmlFor="companionship">동행 상태</label>
              <div className="input-container1">
                <FaUserFriends className="input-icon1" />
                <input
                  type="text"
                  id="companionship"
                  placeholder={companionship || "동행 상태 선택"}
                  readOnly
                  className="input styled-input1"
                  onClick={toggleCompanionshipDropdown}
                />
                <FaChevronDown className="dropdown-toggle1" onClick={toggleCompanionshipDropdown} />
              </div>

              {isCompanionshipDropdownOpen && (
                <div className="dropdown-menu1">
                  <ul className="dropdown-list1">
                    {companionshipOptions.map((comp) => (
                      <li key={comp} onClick={() => selectCompanionship(comp)}>
                        {comp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="button-container1">
            <button className="recommend-button1" onClick={handleNext}>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;
