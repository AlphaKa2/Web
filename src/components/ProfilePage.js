import React, { useState } from 'react';
import './ProfilePage.css'; // 스타일을 위한 CSS 파일
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaRegEdit } from 'react-icons/fa'; // 아이콘 추가
import Card from '../components/mylist/Card'; // Card 컴포넌트 import

const ProfilePage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '홍길동',
    introduction: '안녕하세요! 저는 여행을 사랑하는 탐험가입니다.',
    email: 'honggildong@example.com', // 초기 회원가입 정보
    phone: '010-1234-5678', // 초기 회원가입 정보
    birthDate: '1990-01-01', // 초기 회원가입 정보
  });

  const [travelPlans, setTravelPlans] = useState([
    { title: "여행지 1", description: "3일 여행", date: "2024-10-15", likes: 10, comments: 5 },
    { title: "여행지 2", description: "5일 여행", date: "2024-11-01", likes: 8, comments: 2 },
    { title: "여행지 3", description: "2일 여행", date: "2024-11-10", likes: 5, comments: 3 },
  ]);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page1">

      <div className="profile-content1">
        {/* 왼쪽 프로필 섹션 */}
        <aside className="profile-sidebar1">
          <div className="profile-image1">
            <img src={`${process.env.PUBLIC_URL}/default.png`} alt="Profile" />
          </div>
          <div className="profile-info1">
            <h2 style={{ color: 'black' }}>{userInfo.name}</h2>
            <div className="profile-stats1">
              <p>
                <span style={{ color: '#007bff' }}>131</span>
                팔로워
              </p>
              <p>
                <span style={{ color: '#007bff' }}>97</span>
                팔로잉
              </p>
              <p>
                <span style={{ color: '#007bff' }}>26</span>
                생성한 계획
              </p>
            </div>
            <div className="mbti-section1">
              <h3 style={{ textAlign: 'center' }}>ABLP</h3>
              <p style={{ textAlign: 'center', color: 'gray' }}>즉흥적 탐험가</p>
              <p style={{ marginTop: '15px' }}>활동적이고, 밖을 선호하며, 다양한 경험을 추구합니다.</p>
              <button className="btn-retest1">재검사</button>
            </div>

            <div className="divider1"></div> {/* 재테스트 버튼과 아래 섹션 사이에 디바이더 추가 */}

            {/* 알림 설정 섹션 */}
            <div className="notification-preference1">
              <span>알림 수신 여부</span>
              <label className="switch1">
                <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} />
                <span className="slider1"></span>
              </label>
            </div>

            <div className="divider1"></div> {/* 알림 설정 섹션과 비밀번호 변경 섹션 사이에 디바이더 추가 */}

            {/* 비밀번호 변경 및 회원 탈퇴 */}
            <div className="password-change1">
              <span>비밀번호 변경</span>
              <button className="btn-change1">변경</button>
            </div>

            <div className="divider1"></div> {/* 비밀번호 변경 섹션과 회원 탈퇴 섹션 사이에 디바이더 추가 */}

            <div className="account-deletion1">
              <span>회원탈퇴</span>
              <button className="btn-delete1">회원탈퇴</button>
            </div>
            <span style={{ fontSize: '12px', color: 'red', marginTop: '5px' }}>
              탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
            </span>
          </div>
        </aside>

        {/* 오른쪽 정보 수정 및 여행 계획 섹션 */}
        <main className="profile-info-section1">
          <div className="info-field1">
            <FaUser />
            {isEditing ? (
              <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
            ) : (
              <span>{userInfo.name}</span>
            )}
          </div>
          <div className="info-field1">
            <FaRegEdit />
            {isEditing ? (
              <textarea
                name="introduction"
                value={userInfo.introduction}
                onChange={handleChange}
                rows="3"
              />
            ) : (
              <span>{userInfo.introduction}</span>
            )}
          </div>
          <button className="btn-edit1" onClick={handleEditClick}>
            {isEditing ? '저장' : '내 정보 수정'}
          </button>
          <div className="info-field1">
            <FaEnvelope />
            <span>{userInfo.email}</span> {/* 수정 불가능 */}
          </div>
          <div className="info-field1">
            <FaPhone />
            <span>{userInfo.phone}</span> {/* 수정 불가능 */}
          </div>
          <div className="info-field1">
            <FaBirthdayCake />
            <span>{userInfo.birthDate}</span> {/* 수정 불가능 */}
          </div>

          {/* 여행 계획 목록 추가 */}
          <section className="travel-plans1">
            <h2 style={ {textAlign:'center'}}>생성된 여행 계획 목록</h2>
            <div className="travel-card-container1">
              {travelPlans.map((plan, index) => (
                <Card key={index} plan={plan} />
              ))}
              <button className="load-more1">더보기</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;