// NewPage.js
import React from 'react';
import Slider from 'react-slick';
import ProfileTags from './ProfileTags';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PostDetailPage.css';

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="slick-arrow slick-next"
      onClick={onClick}
    >
      &gt;
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="slick-arrow slick-prev"
      onClick={onClick}
    >
      &lt;
    </button>
  );
};

const PostDetailPage = () => {

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        arrows: true, // 화살표가 항상 보이도록 설정
        adaptiveHeight: true, // 슬라이더 높이 자동 조정
    };
  
  

  return (
    <div className="new-page">
      <aside className="sidebar">
        <ProfileTags buttonText="+팔로우" showTags={false} />
      </aside>

      <div className="content">
        <article className="blog-post">
          <h1>‘낭만바다’ 만나는 곳 ‘양양’</h1>

          <div className="post-meta-info">
            <span className="category-buttons">
              <button className="category-btn">#강원도</button>
              <button className="category-btn">#서핑</button>
            </span>
            <span className="author-name"><i className="fas fa-user-circle"></i> 김가천</span>
          </div>

          <hr className="divider" />

          <p className="post-info">경기 | 2024.08.06</p>
          <p className="contents">
            서해 쪽, 양양으로 향하는 길. 가시거리의 해운대가 보일 만큼, 꽤나 운치 있습니다. 
            사실 여름의 끝자락이긴 하지만 여전히 푸른 바다와 드넓은 해변이 여행객의 눈길을 사로잡는 매력이 있습니다.
          </p>
          <img src="../img/양양.jpg" alt="서피비치" className="post-image" />
          <p className="contents">
            파란 바다가 드넓은 해변. 여느 해수욕장과는 다른 특별함이 느껴지는 곳. 양양의 명소인 서피비치.
            즐기기 위해 떠난 이들은 한적한 바다와 모래사장을 만끽하며 여유로운 시간을 보낼 수 있습니다.
          </p>
        </article>
        <hr className="divider" />

        <article className="blog-comment"> 

          {/* 좋아요 및 신고하기 섹션 */}
          <div className="like-report-section">
            <button className="like-btn">좋아요</button>
            <button className="report-btn">신고하기</button>
            <span className="post-date">2024.08.06</span>
          </div>

          {/* 댓글 작성 섹션 */}
          <div className="comment-section">
            <div className="comment-header">
              <div className="comment-user-info">
                <span className="comment-user-icon">👤</span>
                <span className="comment-username">상대방 이름</span>
                <span className="comment-date">2024.10.10</span>
              </div>
            </div>
            <textarea
              className="comment-textarea"
              placeholder="댓글 작성하기"
            />
            <div className="comment-actions">
              <button className="submit-btn">등록하기</button>
            </div>
          </div>

        </article>


        <section className="related-posts">
          <h2>이 블로그의 다른 글</h2>
          <Slider {...sliderSettings} className="related-posts-slider">
            <div className="related-post-item">
              <img src="../img/jeju1.jpg" alt="제주도의 숨은 명소" />
              <p>제주도의 숨은 명소</p>
              <p className="post-date">2023.09.30</p>
            </div>
            <div className="related-post-item">
              <img src="../img/jeju2.jpg" alt="제주도의 숨은 명소" />
              <p>제주도의 숨은 명소</p>
              <p className="post-date">2023.09.30</p>
            </div>
            <div className="related-post-item">
              <img src="../img/jeju3.jpg" alt="제주도의 숨은 명소" />
              <p>제주도의 숨은 명소</p>
              <p className="post-date">2023.09.30</p>
            </div>
          </Slider>
        </section>
      </div>
    </div>
  );
};

export default PostDetailPage
