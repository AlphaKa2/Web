
import { useNavigate } from "react-router-dom";
import "./home.css";
import TagSection from "./TagSection"; // TagSection 컴포넌트 추가
import React, { useState, useRef } from "react";

import JejuImage from '../assets/images/Jeju.jpeg';
import UlsanImage from '../assets/images/ulsan.jpg';
import TestImage from '../assets/images/mdv.jpg';
import AuthorImage from '../assets/images/default.png'; // 임시로 프로필 사진 경로 설정
import PAImage from '../assets/images/Pani_Aus.jpg';
import YoutubeImage from '../assets/images/youtubeB.png';

function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMBTIIndex, setCurrentMBTIIndex] = useState(0); // MBTI 리스트의 인덱스 관리
  const [currentYoutubeIndex, setCurrentYoutubeIndex] = useState(0); // 유튜브 리스트의 인덱스 관리
  
  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // 더미 데이터 (지금 뜨는 게시글)
  const trendingPosts = [
    { id: 1, title: '제주도의 숨은 명소', date: '2023-06-30', likes: 76, comments: 19, author: '제주 탐험가', authorProfilePic: AuthorImage, image: JejuImage, description: "한라산부터 우도까지, 제주의 아름다운 비경을 소개합니다." },
    { id: 2, title: '울산의 숨은 명소', date: '2023-06-30', likes: 56, comments: 25, author: '울산 탐험가', authorProfilePic: AuthorImage, image: UlsanImage, description: "울산의 보석 같은 해변과 공업 풍경을 소개합니다." },
    { id: 3, title: '탐라국의 숨은 명소', date: '2023-06-30', likes: 82, comments: 32, author: '탐라국 탐험가', authorProfilePic: AuthorImage, image: JejuImage, description: "탐라국의 신비로운 역사와 풍경을 따라가는 여행." },
    { id: 4, title: 'Jeju의 숨은 명소', date: '2023-06-30', likes: 64, comments: 12, author: 'Jeju 탐험가', authorProfilePic: AuthorImage, image: JejuImage, description: "관광객이 찾지 않는 제주도의 비밀스러운 장소들." },
    { id: 5, title: 'Ulsan의 숨은 명소', date: '2023-06-30', likes: 95, comments: 42, author: 'Ulsan 탐험가', authorProfilePic: AuthorImage, image: UlsanImage, description: "울산의 자연과 도시가 조화를 이루는 멋진 장소들." }
  ];

  // 더미 데이터 (MBTI 관련 게시글)
  const mbtiPosts = [
    { id: 6, title: '강원도 액티비티 여행', date: '2023-07-01', likes: 101, comments: 30, author: '빠니보틀', authorProfilePic: AuthorImage, image: TestImage, description: "강원도 구석구석 액티비티를 즐기며 2박3일 풀코스 여행" },
    { id: 7, title: '서울 구도심 투어', date: '2023-07-02', likes: 87, comments: 15, author: 'ENFJ 여행가', authorProfilePic: AuthorImage, image: UlsanImage, description: "옛 서울 감성 좋아하는 사람을 위한 투어" },
    { id: 8, title: '가천대 무당이 드라이브', date: '2023-07-03', likes: 93, comments: 22, author: '김가천', authorProfilePic: AuthorImage, image: JejuImage, description: "무당이 타고 가천대학교 한 바퀴를 돌아보자!" },
    { id: 9, title: '울릉도 탐험', date: '2023-07-02', likes: 87, comments: 15, author: 'ENFJ 여행가', authorProfilePic: AuthorImage, image: UlsanImage, description: "2박 3일 울릉도 구석구석 여행 스쿠버 다이빙 체험까지" }
  ];

  // 더미 데이터 (여행 유튜버 관련 게시글)
  const youtubePosts = [
    { id: 10, title: '빠니보틀 인도 기차 여행', date: '2023-07-01', likes: 101, comments: 30, author: '빠니보틀', authorProfilePic: AuthorImage, image: PAImage, description: "국내 구독자 1위 여행 유튜버 빠니보틀을 따라가자" },
    { id: 11, title: '일본 맛집 투어', date: '2023-07-02', likes: 87, comments: 15, author: '곽튜브', authorProfilePic: AuthorImage, image: PAImage, description: "-" },
    { id: 12, title: '미국 뉴욕 생존기', date: '2023-07-03', likes: 93, comments: 22, author: '원지의 하루', authorProfilePic: AuthorImage, image: PAImage, description: "지구마블 시즌1 우승자 원지를 따라 뉴욕 따라가자" },
    { id: 13, title: '스위스 알프스산 여행', date: '2023-07-02', likes: 87, comments: 15, author: '리랑 온에어', authorProfilePic: AuthorImage, image: PAImage, description: "배낭 여행 전문 144만 여행 유튜버 리랑 온에어를 따라가자" }
  ];

  const postsToShow = trendingPosts.slice(currentIndex, currentIndex + 3); // 인기 포스트
  const mbtiPostsToShow = mbtiPosts.slice(currentMBTIIndex, currentMBTIIndex + 3); // AI 추천 포스트
  const youtubePostsToShow = youtubePosts.slice(currentYoutubeIndex, currentYoutubeIndex + 3); // 여행 유튜버 포스트

  const nextSlide = () => {
    if (currentIndex < trendingPosts.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextMBTISlide = () => {
    if (currentMBTIIndex < mbtiPosts.length - 3) {
      setCurrentMBTIIndex(currentMBTIIndex + 1);
    }
  };

  const prevMBTISlide = () => {
    if (currentMBTIIndex > 0) {
      setCurrentMBTIIndex(currentMBTIIndex - 1);
    }
  };

  const nextYoutubeSlide = () => {
    if (currentYoutubeIndex < youtubePosts.length - 3) {
      setCurrentYoutubeIndex(currentYoutubeIndex + 1);
    }
  };

  const prevYoutubeSlide = () => {
    if (currentYoutubeIndex > 0) {
      setCurrentYoutubeIndex(currentYoutubeIndex - 1);
    }
  };

  return (
    <div>
      <main>

      <section ref={section1Ref} className="section first-section">
        <section className="banner">
          <h2>
            우리가 걸어<span className="highlight">온 길</span>, <br />
            우리가 지나<span className="highlight">갈 길</span>
          </h2>
          <p>
            당신의 취향에 맞는 맞춤형 여행을 만들어드립니다. <br />
            온길과 함께라면, 복잡한 계획은 잊고, 여행의 즐거움만 누리세요
          </p>
        </section>
        

        <TagSection />

        
      </section>

      <section ref={section2Ref} className="section second-destinations"></section>
        {/* 지금 뜨는 게시글 섹션 */}
        <section className="trending-posts">
          <h1>지금 뜨는 게시글</h1>
          <div className="posts-carousel-wrapper">
            <button className="carousel-btn prev-btn" onClick={prevSlide}>{"<"}</button>
            <div className="posts-carousel">
              {postsToShow.map((post) => (
                <article key={post.id} onClick={() => handleClick(post.id)} className="post-card">
                  <img src={post.image} alt={post.title} className="post-thumbnail" />
                  <div className="post-tag">#제주도</div>
                  <h4>{post.title}</h4>
                  <p className="post-description">{post.description}</p>
                  <div className="post-author-info">
                    <img src={post.authorProfilePic} alt="프로필" className="post-author-pic" />
                    <div>
                      <p>{post.author}</p>
                      <p className="post-date">{post.date}</p>
                    </div>
                  </div>
                  <div className="post-reactions">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </article>
              ))}
            </div>
            <button className="carousel-btn next-btn" onClick={nextSlide}>{">"}</button>
          </div>
        </section>

        {/* AI 추천 게시글 섹션 */}
        <section className="mbti-posts">
          <h1>AI가 추천한 여행지</h1>
          <div className="posts-carousel-wrapper">
            <button className="carousel-btn prev-btn" onClick={prevMBTISlide}>{"<"}</button>
            <div className="posts-carousel">
              {mbtiPostsToShow.map((post) => (
                <article key={post.id} onClick={() => handleClick(post.id)} className="post-card">
                  <img src={post.image} alt={post.title} className="post-thumbnail" />
                  <div className="post-tag">#서울</div>
                  <h4>{post.title}</h4>
                  <p className="post-description">{post.description}</p>
                  <div className="post-author-info">
                    <img src={post.authorProfilePic} alt="프로필" className="post-author-pic" />
                    <div>
                      <p>{post.author}</p>
                      <p className="post-date">{post.date}</p>
                    </div>
                  </div>
                  <div className="post-reactions">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </article>
              ))}
            </div>
            <button className="carousel-btn next-btn" onClick={nextMBTISlide}>{">"}</button>
          </div>
        
          
        </section>

      <section ref={section3Ref} className="section third-courses">
      <div class="main-container">

        {/* 유튭 배너 */}
        <section className="mid-banner">
          <h2>좋아하는 여행 유튜버의 <span className="highlight2">유튜브 링크</span>를 넣어보세요!</h2>
          <p>GPT가 여행 유튜브 영상을 분석해 여행 코스를 제공해드립니다</p>
    
          <input 
            type="text" placeholder="유튜브 링크를 입력하세요" className="youtube-link-input" 
          />
          <button 
            className="extract-course-btn" 
            onClick={() => navigate('/Itinerary')} // Navigate to Itinerary page on click
          >
      <img src={YoutubeImage} alt="YouTube Icon" className="button-icon" />
    </button>
        </section>

        {/* 인기 여행 유튜버 코스 섹션 */}
        <section className="youtube-posts">
          <h1>인기 여행 유튜버 여행코스</h1>
          <div className="posts-carousel-wrapper">
            <button className="carousel-btn prev-btn" onClick={prevYoutubeSlide}>{"<"}</button>
            <div className="posts-carousel">
              {youtubePostsToShow.map((post) => (
                <article key={post.id} onClick={() => handleClick(post.id)} className="post-card">
                  <img src={post.image} alt={post.title} className="post-thumbnail" />
                  <div className="post-tag">#유튜버</div>
                  <h4>{post.title}</h4>
                  <p className="post-description">{post.description}</p>
                  <div className="post-author-info">
                    <img src={post.authorProfilePic} alt="프로필" className="post-author-pic" />
                    <div>
                      <p>{post.author}</p>
                      <p className="post-date">{post.date}</p>
                    </div>
                  </div>
                  <div className="post-reactions">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </article>
              ))}
            </div>
            <button className="carousel-btn next-btn" onClick={nextYoutubeSlide}>{">"}</button>
          </div>
        </section>
        
        </div>
        
        </section>
      </main>
    </div>
  );
}

export default Home;
