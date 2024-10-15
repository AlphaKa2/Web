import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/images/사진.jpg";
import searchIcon from "../assets/images/search.png";
import bellIcon from "../assets/images/alarm.png";
import logoImage from "../assets/images/logo.png";
import "./Header.css"; // 헤더 스타일 포함

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // 알림 드롭다운 상태 추가
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // 클릭할 때마다 드롭다운 표시/숨김 토글
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar); // 검색 아이콘 클릭 시 검색바 표시/숨김 토글
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications); // 알림 아이콘 클릭 시 드롭다운 표시/숨김 토글
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setShowDropdown(false); // 메뉴 선택 후 드롭다운 닫기
  };

  const handleLogoClick = () => {
    navigate("/"); // 로고 클릭 시 홈으로 이동
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // 유저 정보를 로컬 스토리지에서 삭제
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <header>
      <div className="header-container">
        <img
          src={logoImage}
          alt="Logo"
          className="logo-img"
          onClick={handleLogoClick}
        />
        <nav className="nav-icons">
          <img
            src={searchIcon}
            alt="검색"
            className="icon"
            onClick={toggleSearchBar} // 검색 아이콘 클릭 이벤트
          />
          <div className="notification-container" onClick={toggleNotifications}>
            <img src={bellIcon} alt="알림" className="icon" />
            {showNotifications && (
              <ul className="notification-dropdown">
                <li>제주 탐험가님이 회원님의 게시글에 좋아요를 눌렀습니다.</li>
                <li>제주 탐험가님이 회원님을 팔로우합니다.</li>
              </ul>
            )}
          </div>
          <div className="profile-container" onClick={toggleDropdown}>
            <img
              src={profilePic}
              alt="Profile"
              className="profile-pic"
            />
            <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <li onClick={() => handleMenuClick("/profile")}>프로필</li>
              <li onClick={() => handleMenuClick("/posts-page")}>내 블로그</li>
              <li onClick={() => handleMenuClick("/balance-game")}>MBTI 검사</li>
              <li onClick={() => handleMenuClick("/mbti-travel")}>여행 계획 생성</li>
              <li onClick={() => handleMenuClick("/my-travel")}>내 여행</li>
              <li onClick={handleLogout}>로그아웃</li> {/* 로그아웃 기능 */}
            </ul>
          </div>
        </nav>
        {/* 검색바 표시 */}
        {showSearchBar && (
          <div className="search-bar">
            <input type="text" placeholder="검색어를 입력하세요..." />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;