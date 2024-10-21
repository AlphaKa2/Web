import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/images/사진.jpg";
import searchIcon from "../assets/images/search.png";
import bellIcon from "../assets/images/alarm.png";
import logoImage from "../assets/images/logo.png";
import PropTypes from "prop-types";
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

  // 외부 클릭 시 열려 있는 메뉴를 닫는 함수
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".profile-container") && // 프로필 드롭다운 외부 클릭 감지
        showDropdown
      ) {
        setShowDropdown(false); // 드롭다운 닫기
      }
      if (
        !event.target.closest(".notification-container") && // 알림 드롭다운 외부 클릭 감지
        showNotifications
      ) {
        setShowNotifications(false); // 알림 닫기
      }
      if (!event.target.closest(".search-bar") && showSearchBar) {
        setShowSearchBar(false); // 검색 바 닫기
      }
    };

    // 이벤트 리스너 추가
    window.addEventListener("click", handleOutsideClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown, showNotifications, showSearchBar]);

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

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,  // isLoggedIn은 boolean 값으로 필수
  onLogout: PropTypes.func.isRequired,    // onLogout은 함수로 필수
};

export default Header;
