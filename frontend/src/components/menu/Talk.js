import React from 'react';

import { Link } from 'react-router-dom';

const Talk = () => {
  return (
    <div className='talk'>
      <ul className='btn-wrap'>
        <li><Link to="/Talk/QuickTalk" className='btn'>빠른 문답</Link></li>
        <li><Link to="/Talk/FreeTalk" className='btn'>자유 작성</Link></li>
      </ul>
    </div>
  );
};

export default Talk;