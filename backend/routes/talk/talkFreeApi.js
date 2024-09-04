const express = require('express');
const appRoot = require('app-root-path');
const router = express.Router();
const db = require(appRoot.resolve('db')); // Use path.join to construct the path

// 페이지 진입 시
router.get('', (req, res) => {

  console.log('talkFree API accessed');

  db.query('SELECT * FROM talk_free', (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err });
    }
    console.log('Database query results:', results); // Log the results
    res.json(results);
  });
});

// talk_free 테이블에 데이터 삽입
router.post('/save', (req, res) => {
  const { content, user_id } = req.body;

  // 회원 여부에 따라 다른 쿼리 실행
  let query;
  let params;

  console.log('content:', content);
  console.log('user_id:', user_id);

  if (user_id) {
    // 회원일 경우
    query = 'INSERT INTO talk_free (content, created_at, updated_at, user_id) VALUES (?, NOW(), NOW(), ?)';
    params = [content, user_id];
  } else {
    // 비회원일 경우
    query = 'INSERT INTO talk_free (content, created_at, updated_at) VALUES (?, NOW(), NOW())';
    params = [content];
  }

  // 데이터베이스에 데이터 삽입
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err });
    }
    console.log('Database query results:', results); // Log the results
    res.json(results);
  });
});


module.exports = router;