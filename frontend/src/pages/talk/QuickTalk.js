import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuickTalkData } from 'services/index';

const QuickTalk = () => {
  const [answerState, setAnswerState] = useState('hide');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [animate, setAnimate] = useState(false);
  const [quickTalkData, setQuickTalkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleQuestionClick = (e) => {
    const question = e.target.innerText;
    const answer = quickTalkData.find(data => data.question === question).answer;

    setAnswerState('show');
    setSelectedAnswer(answer);
    setAnimate(true);
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000); // 애니메이션 지속 시간에 맞게 설정
      return () => clearTimeout(timer);
    }
  }, [animate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQuickTalkData();
        setQuickTalkData(response.data);
      } catch (error) {
        setError('fetch error');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='talk-wrap'>
      <div className='talk-body'>
        <h5>궁금하신 질문을 선택해주세요.</h5>

        <ul className='question'>
          {quickTalkData.map((data, index) => (
            <li key={data.id}>
              <button onClick={handleQuestionClick}>{data.question}</button>
            </li>
          ))}
        </ul>

        <div className={`answer ${answerState} ${animate ? 'fadeInUp' : ''}`}>
          {selectedAnswer}
        </div>
      </div>

      {/* 자유작성으로 이동하기 위한 링크 */}
      <div className='move'>
        <Link to="/Talk/FreeTalk" className='right-double-arrow'>자유 작성으로 이동하기</Link>
      </div>
    </div>
  );
};

export default QuickTalk;