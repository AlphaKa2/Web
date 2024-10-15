import React, { useState } from "react";
import Card from "../components/mylist/Card";
import './MyTripList.css';

const registeredTrips = [
  {
    id: 1,
    title: "제주도의 숨은 맛집 탐방",
    description: "한라산부터 독특한 제주도의 아름다운 비경을 탐험합니다.",
    date: "2023-09-30",
    likes: 76,
    comments: 19,
  },
  {
    id: 2,
    title: "부산 해운대에서의 일출 감상",
    description: "부산의 해운대에서 멋진 일출을 감상하며 하루를 시작합니다.",
    date: "2023-10-05",
    likes: 54,
    comments: 12,
  }
];

const recommendedTrips = [
  {
    id: 1,
    title: "설악산 단풍 구경",
    description: "설악산에서 가을의 단풍을 만끽할 수 있는 완벽한 코스입니다.",
    date: "2023-10-15",
    likes: 83,
    comments: 24,
  },
  {
    id: 2,
    title: "남해의 아름다운 해안 드라이브",
    description: "남해에서 바다를 따라 달리는 드라이브 코스를 즐깁니다.",
    date: "2023-11-10",
    likes: 90,
    comments: 31,
  },
];

function MyTripList1({ nickname }) { 
  const [activeTab, setActiveTab] = useState('registered');

  const displayedTrips = activeTab === 'registered' ? registeredTrips : recommendedTrips;

  return (
    <div className="my-list-container1">
      <header className="header1">
        <img src={`${process.env.PUBLIC_URL}/ocean.png`} alt="Background" className="header-img1" />
        <div className="profile-img-container1">
          <img src={`${process.env.PUBLIC_URL}/default.png`} alt="Profile" className="profile-img1" />
          <p className="profile-nickname1">제주 탐험가</p>
        </div>
      </header>

      <div className="info-section1">
        <h2
          className={`registered-trips1 ${activeTab === 'registered' ? 'active' : ''}`}
          onClick={() => setActiveTab('registered')}
        >
          등록한 여행: {registeredTrips.length}
        </h2>
        <h2
          className={`recommended-trips1 ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          추천받은 여행: {recommendedTrips.length}
        </h2>
      </div>

      <div className="my-list1">
        {displayedTrips.map((plan) => (
          <Card key={plan.id} plan={plan} />
        ))}
        <button className="load-more1">더보기</button>
      </div>
    </div>
  );
}

export default MyTripList1;
