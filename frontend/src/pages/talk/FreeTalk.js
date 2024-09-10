import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

// API
import { fetchFreeTalkData, postFreeTalkData } from 'services/index';

const QuickTalk = () => {
  const [textareaHeight, setTextareaHeight] = useState('2rem');

  const [content, setContent] = useState('');
  const [freeNickname, setFreeNickname] = useState('Guest');
  const [freePassword, setFreePassword] = useState('1234');
  
  // interaction states
  const [isSpaceBetwween, setIsSpaceBetween] = useState(false);

  // mount 시 fetchFreeTalkData
  useEffect(() => {
    fetchFreeTalkData().then((response) => {
      console.log('Free talk data:', response.data);
      
      const timer = setTimeout(() => {
        toggleChat();  
      }, 1000);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    });
  }, []);

  const toggleChat = () => {
    setIsSpaceBetween(!isSpaceBetwween);
  };

  // state 초기화
  const resetState = () => {
    setContent('');
    setTextareaHeight('2rem');
  };

  // 저장 기능
  const handleSaveContent = async () => {
    try {
      if (!content.trim()) {
        throw new Error('Content is empty.');
      }

      await postFreeTalkData({
        content,
        free_nickname: freeNickname,
        free_password: freePassword,
      }).then((response) => {
        console.log('Message saved:', response.data);
      }).catch((error) => {
        console.error('Failed to save message:', error);
      });
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  // 전송기능
  const handleSendContent = () => {
    if (content.trim()) {
      console.log('Content sent:', content);
      
      handleSaveContent().then(() => {
        console.log('Content saved successfully.');
        resetState();
      });
    }
  };

  const handleTextareaChange = (e) => {
    setContent(e.target.value);
    setTextareaHeight(`${e.target.scrollHeight}px`); // 입력창 높이 조절
  };

  const handleTextarea = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendContent();
    } else {
      handleTextareaChange(e);
    }
  };

  return (
    <div className='talk-wrap'>
      <div className={`talk-body free ${isSpaceBetwween ? 'active' : ''}`} >
        <div className='talk-body-title'>
          <h5>자유롭게 작성할 수 있는 공간입니다.</h5>
          <p className='info-subtle pd40'>⚠️ 아이디와 비밀번호는 글 수정/삭제에 필요하니 꼭 기억해주세요.</p>
        </div>

        <div className={`talk-body-chat`}>

        </div>

        <div className='talk-body-message'>
          <div className='message-info'>
            {/* id 입력란 */}
            <input
              className='message-id'
              type='text'
              placeholder='Guest'
              onChange={(e) => setFreeNickname(e.target.value)}
            />
            {/* pw 입력란 */}
            <input
              className='message-password'
              type='password'
              placeholder='1234'
              onChange={(e) => setFreePassword(e.target.value)}
            />
          </div>

          <div className='message-text'>
            <textarea
              className='message-input'
              value={content}
              onChange={handleTextareaChange}
              onKeyDown={handleTextarea}
              placeholder='메시지를 입력하세요...'
              style={{ height: textareaHeight }}
            />
              
            <button className='send-button' onClick={handleSendContent}><SendIcon /></button>
          </div>
        </div>
      </div>

      {/* 자유작성으로 이동하기 위한 링크 */}
      <div className='move'>
        <Link to="/Talk/QuickTalk" className='right-double-arrow'>빠른 문답으로 이동하기</Link>
      </div>
    </div>
  );
}

export default QuickTalk;