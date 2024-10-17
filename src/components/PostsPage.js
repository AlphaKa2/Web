// PostsPage.js
import React, { useEffect, useState, useRef } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
<<<<<<< HEAD
import Header from './ProfileTags';
import Post from './EachPost';
import './PostsPage.css';
import './EachPost.css';
import './ProfileTags.css'

=======
import Profile_Tags from './Profile_Tags';
import Post from './EachPost';
import './PostsPage.css';
>>>>>>> b3117ad59ba673871b51b936681b8aee9f0d28db

const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('*'); // 필터 상태 추가
  const postsPerPage = 3;
  const postsRef = useRef(null);
  const isotopeInstance = useRef(null);

  const posts = [
    { id: 1, region: 'gyeonggi', title: 'Title 1', description: 'Content description 1', image: 'img/한강.jpg', tags: '#경기도 여행 #도시 #젊음' },
    { id: 2, region: 'gangwon', title: 'Title 2', description: 'Content description 2', image: 'img/속초.jpeg', tags: '#강원도 여행 #속초' },
    { id: 3, region: 'gyeonggi', title: 'Title 3', description: 'Content description 3', image: 'img/광교호수공원.jpg', tags: '#경기도 여행 #도시 #젊음' },
    { id: 4, region: 'jeju', title: 'Title 4', description: 'Content description 4', image: 'img/성산일출봉.jpg', tags: '#제주도 여행 #성산일출봉' },
    { id: 5, region: 'chungbuk', title: 'Title 5', description: 'Content description 5', image: 'img/단양팔경.jpg', tags: '#충청북도 여행 #단양' },
    { id: 6, region: 'chungnam', title: 'Title 6', description: 'Content description 6', image: 'img/천안삼거리공원.jpg', tags: '#충청남도 여행 #천안' },
  ];

  // 필터링된 포스트 목록
  const filteredPosts = posts.filter(post =>
    (filter === '*' || post.region === filter.replace('.', '')) && (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          transitionDuration: '0.5s',
        });

        // 초기 필터 적용
        isotopeInstance.current.arrange({ filter });
      });
    }

    // 필터가 변경될 때마다 Isotope 필터링 적용
    if (isotopeInstance.current) {
      isotopeInstance.current.arrange({ filter });
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
      <Profile_Tags onFilterChange={handleFilterChange} /> {/* handleFilterChange 전달 */}
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
          <Post key={post.id} region={post.region} title={post.title} description={post.description} image={post.image} tags={post.tags} />
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
