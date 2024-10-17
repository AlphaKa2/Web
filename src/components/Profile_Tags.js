// Header.js
import React from 'react';
import PropTypes from 'prop-types';

const Profile_Tags = ({ buttonText = "글쓰기", showTags = true, onFilterChange }) => (
  <header>
    <section className="member">
      <article className="profile">
        <img src="img/잔망루피.png" alt="프로필 이미지" />
        <p id="name">자신의 이름</p>
        <p id="mbti" style={{ color: 'blue' }}>ACLJ(여유로운 탐험가)</p>
        <p id="status" style={{ color: 'grey' }}>안녕하세요.</p>
        <br />
        <p>팔로잉: <span id="following">32&emsp;</span>팔로워: <span id="follower">42</span></p>
        <button className="custom-btn btn-3"><span>{buttonText}</span></button>
      </article>
    </section>
    {/* showTags가 true일 때만 태그 목록을 표시 */}
    {showTags && (
      <section className="tagList">
        <article className="tag-list tagList2">
          <h4>태그 목록</h4>
          <hr />
          <p onClick={() => onFilterChange('all')}><a className="left_tag" href="#">전체보기</a></p>
          <p onClick={() => onFilterChange('gyeonggi')}><a className="left_tag" href="#">경기</a></p>
          <p onClick={() => onFilterChange('gangwon')}><a className="left_tag" href="#">강원</a></p>
          <p onClick={() => onFilterChange('chungbuk')}><a className="left_tag" href="#">충북</a></p>
          <p onClick={() => onFilterChange('chungnam')}><a className="left_tag" href="#">충남</a></p>
          <p onClick={() => onFilterChange('jeju')}><a className="left_tag" href="#">제주</a></p>
        </article>
      </section>
    )}
  </header>
);

Profile_Tags.propTypes = {
  buttonText: PropTypes.string,
  showTags: PropTypes.bool,
  onFilterChange: PropTypes.func.isRequired,
};

export default Profile_Tags;
