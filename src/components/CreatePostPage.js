// NewPageWithEditor.js
import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Header from './ProfileTags';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const editorRef = useRef();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState();

  const handleSave = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    console.log('Title:', title);
    console.log('Tags:', tags);
    console.log('Content:', content);
  };

  return (
    <div className="new-page-with-editor">
      <aside className="sidebar">
        <Header buttonText="게시글 둘러보기" showTags={false} />
      </aside>

      <main className="content">
        <input
          type="text"
          className="title-input"
          placeholder="제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="tag-input"
          placeholder="# Hash Tag"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        
        <Editor
          ref={editorRef}
          initialValue="내용을 입력하세요."
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave}>저장</button>
        </div>
      </main>
    </div>
  );
};

export default CreatePostPage;
