const express = require('express');
const appRoot = require('app-root-path');
const router = express.Router();
const db = require(appRoot.resolve('db')); // Use path.join to construct the path

// 페이지 진입 시
router.get('', (req, res) => {

  db.query('SELECT * FROM talk_qna', (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err });
    }
    console.log('Database query results:', results); // Log the results
    res.json(results);
  });
});

module.exports = router;