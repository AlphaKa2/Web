// NewPageWithEditor.js
import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import ProfileTags from './ProfileTags';
import './CreatePostPage.css';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const editorRef = useRef();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState(''); // Initialize with an empty string
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/posts-page"); // Define the navigation logic here
  };

  const handleSave = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    
    // Save logic can be added here (e.g., sending data to a server)
    console.log('Title:', title);
    console.log('Tags:', tags);
    console.log('Content:', content);
    
    // You can trigger navigation after saving if needed
    // navigate('/some-other-page');
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
          initialEditType="markdown"
          useCommandShortcut={true}
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
