import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

// API
import { fetchFreeTalkData, postFreeTalkData } from 'services/index';

const QuickTalk = () => {
  const [message, setMessage] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('2rem');
  const [postData, setPostData] = useState({});



  // mount 시 fetchFreeTalkData
  useEffect(() => {
    fetchFreeTalkData().then((response) => {
      console.log('Free talk data:', response.data);
    });
  }, []);


  // 저장 기능
  const handleSaveMessage = async () => {
    try {
      const postData = {
        "content": message,
      };

      // if(userId) postData.userId = userId;

      const response = await postFreeTalkData(postData);
      console.log('Message saved:', response.data);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  // 전송기능
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage(''); // 메시지 전송 후 입력창 초기화
      setTextareaHeight('2rem'); // 입력창 높이 초기화

      handleSaveMessage().then(() => {
        console.log('Message saved successfully.');
      });
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    setTextareaHeight(`${e.target.scrollHeight}px`); // 입력창 높이 조절
  };

  const handleTextarea = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else {
      handleTextareaChange(e);
    }
  };

  return (
    <div className='talk-wrap'>
      <div className='talk-body free'>
        <h5>자유롭게 작성할 수 있는 공간입니다.</h5>
        <p className='info-subtle pd40'>⚠️ 비회원일 경우에는 작성한 글을 편집할 수 없어요</p>

        <div className='message'>
          <textarea
            className='message-input'
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleTextarea}
            placeholder='메시지를 입력하세요...'
            style={{ height: textareaHeight }}
          />
          
          <button className='send-button' onClick={handleSendMessage}><SendIcon /></button>
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