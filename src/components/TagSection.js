import React, { useState } from 'react';
import './Tag.css'; // Tag 관련 CSS 파일 import

import jejuImage from '../assets/images/Jeju1.jpeg';
import natureImage from '../assets/images/nature.jpg';
import oceanImage from '../assets/images/ocean.jpeg';
import seoulImage from '../assets/images/seoul.jpg';
import cultureImage from '../assets/images/culture.jpg';
import histroyImage from '../assets/images/history.jpg';

function TagSection() {
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 상태 관리

  const tags = [
    { image: jejuImage, text: '#제주도' },
    { image: natureImage, text: '#자연' },
    { image: oceanImage, text: '#바다' },
    { image: seoulImage, text: '#서울 근교' },
    { image: cultureImage, text: '#문화' },
    { image: histroyImage, text: '#역사' },
    { image: 'image7.jpg', text: '#문화' },
    { image: 'image8.jpg', text: '#레저' },
    { image: 'image9.jpg', text: '#힐링' },
    { image: 'image10.jpg', text: '#트레킹' },
    { image: 'image11.jpg', text: '#섬 여행' },
    { image: 'image12.jpg', text: '#자전거' },
    { image: 'image13.jpg', text: '#캠핑' },
    { image: 'image14.jpg', text: '#등산' },
    { image: 'image15.jpg', text: '#맛집' },
    { image: 'image16.jpg', text: '#쇼핑' },
    { image: 'image17.jpg', text: '#전통 마을' },
    { image: 'image18.jpg', text: '#온천' }
  ];

  // 슬라이드를 6개씩 나누어 배열로 구성
  const slides = [
    tags.slice(0, 6), // 첫 번째 슬라이드 (6개 태그)
    tags.slice(6, 12), // 두 번째 슬라이드
    tags.slice(12, 18), // 세 번째 슬라이드
  ];

  const handleDotClick = (index) => {
    setCurrentSlide(index); // 슬라이드를 변경
  };

  return (
    <section className="tag-section">
      
      <div className="tags-carousel">
        {slides[currentSlide].map((tag, index) => (
          <div key={index} className="tag-item">
            <img src={tag.image} alt={tag.text} />
            <span>{tag.text}</span>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default TagSection;
