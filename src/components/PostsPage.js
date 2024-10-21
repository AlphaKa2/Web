// PostsPage.js
import React, { useEffect, useState, useRef } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import ProfileTags from './ProfileTags';
import EachPost from './EachPost';
import './PostsPage.css';
import './EachPost.css';
import './ProfileTags.css'
import { useNavigate } from 'react-router-dom'; 

const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('*'); // 필터 상태 추가
  const postsPerPage = 3;
  const postsRef = useRef(null);
  const isotopeInstance = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/create-post"); // Define the navigation logic here
  };

  const handlePostNavigation = () => {
    // Navigate dynamically based on the postId or other parameters
    navigate("/posts/${postId}");
  };


  const posts = [
    { postId: 1, region: 'gyeonggi', title: 'Title 1', content: 'Content description 1', image: '../img/한강.jpg', tags: '#경기도 여행 #도시 #젊음' },
    { postId: 2, region: 'gyeonggi', title: 'Title 2', content: 'Content description 2', image: '../img/광교호수공원.jpg', tags: '#경기도 여행 #도시 #젊음' },
    { postId: 3, region: 'gangwon', title: 'Title 3', content: 'Content description 3', image: '../img/속초.jpeg', tags: '#강원도 여행 #속초' },
    { postId: 4, region: 'jeju', title: 'Title 4', content: 'Content description 4', image: '../img/성산일출봉.jpg', tags: '#제주도 여행 #성산일출봉' },
    { postId: 5, region: 'chungbuk', title: 'Title 5', content: 'Content description 5', image: '../img/단양팔경.jpg', tags: '#충청북도 여행 #단양' },
    { postId: 6, region: 'chungnam', title: 'Title 6', content: 'Content description 6', image: '../img/천안삼거리공원.jpg', tags: '#충청남도 여행 #천안' },
  ];

  // 필터링된 포스트 목록
  const filteredPosts = posts.filter(post =>
    (filter === '*' || post.region === filter.replace('.', '')) && (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (region) => {
    const filterValue = region === 'all' ? '*' : `.${region}`;
    setFilter(filterValue);
    setCurrentPage(1); // 필터를 변경할 때 첫 페이지로 이동
  };

  useEffect(() => {
    if (postsRef.current) {
      // 이미지 로딩 후 Isotope 초기화
      imagesLoaded(postsRef.current, () => {
        isotopeInstance.current = new Isotope(postsRef.current, {
          itemSelector: '.post-item',
          layoutMode: 'fitRows',
          percentPosition: true,
          transitionDuration: '0.5s',
        });
         // 초기 필터 적용
      isotopeInstance.current.arrange({ filter });

      // 이미지가 로드된 후에 레이아웃 재정리
      setTimeout(() => {
        isotopeInstance.current.layout();
      }, 100);  // 짧은 대기 후 레이아웃 재정리
    });
  }
  
    // 필터가 변경될 때마다 Isotope 필터링 적용
    if (isotopeInstance.current) {
      isotopeInstance.current.arrange({ filter });
  
      // 필터링 후 강제 레이아웃 재정리
      setTimeout(() => {
        isotopeInstance.current.layout();
      }, 500);  // 잠시 대기 후 레이아웃 재정리 (이미지가 로드되는 동안)
    }
  
    // 클린업 함수
    return () => {
      if (isotopeInstance.current) {
        isotopeInstance.current.destroy();
      }
    };
  }, [filter, currentPosts]); // filter와 currentPosts 의존성 추가
  
  return (
    <div className="posts-page">
      <ProfileTags onFilterChange={handleFilterChange} onButtonClick={handleNavigation} />
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <main className="posts" ref={postsRef}>
        {currentPosts.map(post => (
          <EachPost key={post.postId} region={post.region} title={post.title} description={post.content} image={post.image} tags={post.tags} handlePostClick={handlePostNavigation} />
        ))}
      </main>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
            style={{ display: filteredPosts.length > index * postsPerPage ? 'inline-block' : 'none' }} // 조건부 렌더링
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
