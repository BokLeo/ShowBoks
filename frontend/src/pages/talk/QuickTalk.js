import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const quickTalkData = [
  {
    id: 1,
    question: '누구세요?',
    answer: '안녕하세요. 저는 프론트엔드 개발자입니다.'
  },
  {
    id: 2,
    question: '어디세요?',
    answer: '저는 대한민국 경기도 의왕에 살고 있습니다.'
  },
  {
    id: 3,
    question: '이 사이트는 무엇을 위한 것입니까?',
    answer: '이 사이트는 제 소개와 제가 만든 프로젝트를 소개하기 위한 사이트입니다.'
  },
  {
    id: 4,
    question: '사용할 수 있는 기술은 무엇입니까?',
    answer: '저는 React, Vue, Angular 등을 사용하여 개발을 합니다.'
  },
  {
    id: 5,
    question: '어떻게 연락할 수 있습니까?',
    answer: '이 사이트의 하단에 있는 Contact 메뉴를 통해 연락할 수 있습니다.'
  }
];

const QuickTalk = () => {
  const [answerState, setAnswerState] = React.useState('hide');

  const [selectedAnswer, setSelectedAnswer] = React.useState('');
  const [animate, setAnimate] = React.useState(false);
  

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

  return (
    <div className='talk-wrap'>
      <div className='talk-body'>
        <h5>궁금하신 질문을 선택해주세요.</h5>

        <ul className='question'>
          {quickTalkData.map((data, index) => (
            <li key={data.id}>
              <button onClick={handleQuestionClick} >{data.question}</button>
            </li>
          ))}
        </ul>

        <div className={`answer ${answerState} ${animate ? 'fadeInUp' : ''}`}>
          <p>{selectedAnswer}</p>

        </div>
      </div>


      {/* 자유작성으로 이동하기 위한 링크 */}
      <div className='move'>
        <Link to="/Talk/FreeTalk" className='right-double-arrow'>자유 작성으로 이동하기</Link>
      </div>
    </div>
  );
}

export default QuickTalk;
