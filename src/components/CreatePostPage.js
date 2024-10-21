import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import ProfileTags from './ProfileTags';
import './CreatePostPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // 고유 식별자 생성에 UUID 사용


const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']; // 허용된 파일 확장자
const CreatePostPage = () => {
  const editorRef = useRef();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/posts-page");
  };
  // 파일 확장자 및 크기 검증 함수
  const validateFile = (file) => {
    const fileType = file.type;
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      alert('jpg, jpeg, png, gif 형식의 파일만 업로드 가능합니다.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('파일 크기는 최대 10MB까지 허용됩니다.');
      return false;
    }
    return true;
  };
  // 이미지 업로드 함수
  const uploadImageToS3 = async (file) => {
    if (!validateFile(file)) {
      return null; // 파일이 유효하지 않으면 업로드 중단
    }
    const uniqueIdentifier = uuidv4(); // 고유 식별자 생성
    const fileExtension = file.name.split('.').pop(); // 파일 확장자 추출
    const fileName = `${uniqueIdentifier}.${fileExtension}`; // 고유 식별자를 포함한 파일 이름
    // 이미지 업로드를 위해 presigned URL을 요청
    const { data: presignedData } = await axios.post('/api/s3/presigned-url', {
      fileName,
      contentType: file.type,
    });
    const { url: presignedUrl, imageUrl } = presignedData; // 서명된 URL과 S3에 저장될 이미지 URL
    try {
      // S3에 파일 업로드 (PUT 요청)
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      return imageUrl; // 업로드된 이미지의 S3 URL 반환
    } catch (error) {
      console.error('S3 업로드 오류:', error);
      return null;
    }
  };
  const handleSave = async () => {
    const editorInstance = editorRef.current.getInstance();
    let content = editorInstance.getMarkdown(); // 에디터의 본문 내용
    const postData = {
      nickname: '호준', // API 요구에 맞게 nickname 필드를 추가
      title: title,
      content: content, // 에디터 내용
      visible: true, // 고정 값으로 설정 (필요에 따라 변경 가능)
      commentable: true, // 고정 값으로 설정 (필요에 따라 변경 가능)
      tagNames: tags.split(',').map(tag => tag.trim()), // 태그들을 배열로 변환
    };
    try {
      const response = await axios.post('/api/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('게시글 저장 성공');
        navigate('/posts-page');
      } else {
        console.error('게시글 저장 실패');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };
  return (
    <div className="new-page-with-editor">
      <aside className="sidebar">
        <ProfileTags buttonText="게시글 둘러보기" showTags={false} onButtonClick={handleNavigation} />
      </aside>
      <main className="input-content">
        {/* Title Input */}
        <input
          type="text"
          className="title-input"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Tags Input */}
        <input
          type="text"
          className="tag-input"
          placeholder="# Hash Tag"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {/* Toast UI Editor */}
        <Editor
          ref={editorRef}
          initialValue="내용을 입력하세요."
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              try {
                const imageUrl = await uploadImageToS3(blob);
                if (imageUrl) {
                  callback(imageUrl, '이미지 설명');
                  console.log('이미지 업로드 성공:', imageUrl);
                } else {
                  console.error('이미지 업로드 실패');
                }
              } catch (error) {
                console.error('이미지 업로드 중 오류 발생:', error);
              }
            },
          }}
        />
        {/* Save Button */}
        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave}>저장</button>
        </div>
      </main>
    </div>
  );
};
export default CreatePostPage;