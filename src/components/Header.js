//Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/images/사진.jpg";
import searchIcon from "../assets/images/search.png";
import bellIcon from "../assets/images/alarm.png";
import logoImage from "../assets/images/logo.png";
import "./Header.css";

function Header({ isLoggedIn, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleMenuClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogoClick = () => navigate("/");

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
          {/* 검색 아이콘은 로그인 여부와 상관없이 항상 표시 */}
          <img
            src={searchIcon}
            alt="검색"
            className="icon"
            onClick={toggleSearchBar}
          />
          {isLoggedIn ? (
            <>
              {/* 로그인 후 알림 및 프로필 사진 표시 */}
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
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <ul className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                  <li onClick={() => handleMenuClick("/profile-page")}>프로필</li>
                  <li onClick={() => handleMenuClick("/posts-page")}>내 블로그</li>
                  <li onClick={() => handleMenuClick("/balance-game")}>MBTI 검사</li>
                  <li onClick={() => handleMenuClick("/create-plan")}>여행 계획 생성</li>
                  <li onClick={() => handleMenuClick("/my-trip-list")}>내 여행</li>
                  <li onClick={onLogout}>로그아웃</li>
                </ul>
              </div>
            </>
          ) : (
            // 로그인 전일 때 로그인 버튼 표시
            <div className="login-text" onClick={() => navigate("/login")}>
              로그인
            </div>
          )}
        </nav>

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
