import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

// Components
import SimpleSnackbar from 'components/utils/SimpleSnackbar';
// menu > freeTalk > FreeTalkMessage component
import FreeTalkMessage from 'components/menu/freeTalk/FreeTalkMessage';

// API
import { getFreeTalkTotalCnt, fetchFreeTalkData, postFreeTalkData } from 'services/index';

const generateRandomPassword = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const QuickTalk = () => {
  const isFetching = useRef(false);

  const [textareaHeight, setTextareaHeight] = useState('2rem');

  const [content, setContent] = useState('');
  const [freeNickname, setFreeNickname] = useState('Guest');
  const [freePassword, setFreePassword] = useState(generateRandomPassword());
  
  // interaction states
  const [isSpaceBetween, setIsSpaceBetween] = useState(false);

  // talk data
  const [talkData, setTalkData] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const [totalPage, setTotalPage] = useState(0);
  
  // simpleSnackbar
  const [simpleSnackbar, setSimpleSnackbar] = useState({
    state: false,
    message: '마지막 페이지입니다.',
    duration: 2000,
  });


  
  // 데이터 가져오는 API
  const fetchFreeTalkDataAPI = async (page) => {
    return await fetchFreeTalkData(page);
  };


  // 초기 데이터 가져오기
  useEffect(() => {
    const initializeData = async () => {
      if (!isFetching.current) {
        isFetching.current = true;

        try {
          const res = await getFreeTalkTotalCnt();
          setTotalPage(res.data.totalPage);
          setIsSpaceBetween(true);
        } catch (error) {
          console.error('Failed to fetch initial data:', error);
        } finally {
          isFetching.current = false;
        }
      }
    };

    initializeData();
  }, []);

  // page 변경 시 데이터 가져오기
  useEffect(() => {
    // 데이터 세팅
    const settingFreeTalkData = async () => {
      const response = await fetchFreeTalkDataAPI(page);
      setTalkData((prevData) => [...prevData, ...response.data]);
    };

    console.log(`page: ${page}, totalPage: ${totalPage}`);
    if(totalPage){
      if(page <= totalPage) settingFreeTalkData();
    }
  }, [page, totalPage]);

  const showSnackbarWithTimeout = (message, duration = 2500) => {
    setSimpleSnackbar((prev) => ({
      ...prev,
      state: true,
      message: message,
    }));

    const timer = setTimeout(() => {
      setSimpleSnackbar((prev) => ({
        ...prev,
        state: false,
      }));
    }, duration);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  };

  useEffect(() => {
    if (totalPage && page >= totalPage) {
      const cleanup = showSnackbarWithTimeout('마지막 페이지입니다.');
      return cleanup;
    }
  }, [page, totalPage]);

  // 무한 스크롤을 위한 IntersectionObserver 설정
  const lastTalkElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => {
          if (prevPage < totalPage) {
            return prevPage + 1;
          } else {
            showSnackbarWithTimeout('마지막 페이지입니다.');
            return prevPage;
          }
        });
      }
    });
    if (node) observer.current.observe(node);
  }, [totalPage]);


  // state 초기화
  const resetState = () => {
    setContent('');
    setTextareaHeight('2rem');
  };

  const handleSaveContent = useCallback(async () => {
    try {
      console.log('handleSaveContent 접속');

      if (!content.trim()) {
        throw new Error('Content is empty.');
      }
  
      const response = await postFreeTalkData({
        content,
        free_nickname: freeNickname,
        free_password: freePassword,
      });
      console.log('Message saved:', response.data);
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  }, [content, freeNickname, freePassword]);

  // 전송 기능
  const handleSendContent = async () => {
    if (content.trim()) {
      console.log('Content sent:', content);

      try {
        await handleSaveContent(); // 게시글 저장
        console.log('Content saved successfully.');
        resetState(); // 상태 초기화 (예: 입력 필드 리셋)
        
        // 게시글 저장 후 페이지와 데이터 업데이트
        const totalCntResponse = await getFreeTalkTotalCnt();
        setTotalPage(totalCntResponse.data.totalPage);

        const talkDataResponse = await fetchFreeTalkDataAPI(1);
        setTalkData(talkDataResponse.data);
        
      } catch (error) {
        console.error('Error saving content or updating data:', error);
      }
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

  const handleEditMessage = (id) => {
    console.log('Edit message:', id);
  };

  const handleDeleteMessage = (id) => {
    console.log('Delete message:', id);
  };  

  return (
    <div className='talk-wrap'>
      {simpleSnackbar.state && <SimpleSnackbar param={simpleSnackbar} />}
      <div className={`talk-body free ${isSpaceBetween ? 'active' : ''}`} >
        <div className='talk-body-title'>
          <h5>자유롭게 작성할 수 있는 공간입니다.</h5>
          <p className='info-subtle pd40'>⚠️ 비밀번호는 글 수정/삭제에 필요하니 꼭 기억해주세요.</p>
        </div>

        <ul id='talkArea' className={`talk-body-chat ${isSpaceBetween ? 'show' : ''}`}>
          {talkData.map((talk, index) => (
            <FreeTalkMessage
              key={index}
              talkData={talk}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
              lastTalkElementRef={index === talkData.length - 1 ? lastTalkElementRef : null}
            />
          ))}
        </ul>

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
              placeholder={freePassword}
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