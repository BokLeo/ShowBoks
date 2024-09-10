import express, { Request, Response } from 'express';
import path from 'path';
import appRoot from 'app-root-path';

const router = express.Router();

const connPath = path.join(appRoot.path, 'src', 'conn'); // 절대 경로로 conn 파일 경로 설정
const conn = require(connPath).default; // conn 모듈 가져오기

type BaseTalkQna = {
  id: number;
  question: string;
  answer: string;
  created_dt: string;
  updated_dt: string;
};

// 페이지 진입 시
router.get('', (req: Request, res: Response) => {
  conn.query('SELECT * FROM talk_qna', (err: Error, results: BaseTalkQna[]) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err.message });
    }
    console.log('Database query results:', results); // Log the results
    res.json(results);
  });
});

export default router;