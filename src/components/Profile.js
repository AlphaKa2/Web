import React from "react";

function Profile() {
  return (
    <div>
      <h2>프로필</h2>
      <p>여행 계획, 블로그 게시물, MBTI 추천 여행 등을 관리할 수 있습니다.</p>
      <nav>
        <a href="/travel-plan">여행 계획</a>
        <a href="/mbti-travel">여행 MBTI</a>
        <a href="/blog-posts">블로그 게시글</a>
      </nav>
    </div>
  );
}

export default Profile;
