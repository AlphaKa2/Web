import React from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams(); // URL에서 id 파라미터를 받아옵니다.

  // 임시 블로그 포스트 데이터 (나중에 실제 데이터를 넣을 수 있음)
  const posts = {
    1: {
      title: "제주도의 숨은 명소",
      content: "이곳은 제주도의 숨은 명소입니다...",
      image: "/path/to/image1.jpg"
    },
    2: {
      title: "부산의 인기 해변",
      content: "이곳은 부산의 인기 해변입니다...",
      image: "/path/to/image2.jpg"
    },
    3: {
      title: "강원도의 명소",
      content: "이곳은 강원도의 명소입니다...",
      image: "/path/to/image3.jpg"
    }
  };

  const post = posts[id]; // 해당 id에 맞는 포스트 데이터 가져오기

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.content}</p>
        </>
      ) : (
        <p>포스트를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default BlogPost;
