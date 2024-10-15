import React from "react";
import './Footer.css'; // 푸터 스타일 가져오기

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          © 2024 Alphaka All Right Reserved
        </div>
        <div className="footer-center">
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">About</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
