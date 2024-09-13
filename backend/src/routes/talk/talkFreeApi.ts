import express, { Request, Response } from 'express';
import path from 'path';
import appRoot from 'app-root-path';

const router = express.Router();

// 접속 
const connPath = path.join(appRoot.path, 'src', 'conn'); // 절대 경로로 conn 파일 경로 설정
const conn = require(connPath).default; // conn 모듈 가져오기

// Utils > getUserIp 가져오기
const getUserIp = require(path.join(appRoot.path, 'src', 'utils', 'getUserIp')).default;

type BaseTalkFree = {
  cnt: number;
  id: number;
  content: string;
  // created_dt: string; auto generated
  // updated_dt: string; auto generated
  user_ip: string | null;
  free_nickname: string;
  free_password: string;
};

// BaseTalkFree 에서 프론트에서 넘겨 받아야할 (contnet, password, nickname)만 TalkFreeRequestBody 로 정의
interface TalkFreeRequestBody extends Pick<BaseTalkFree, 'content' | 'user_ip' | 'free_nickname' | 'free_password'> {};


router.get('/total_cnt', (req: Request, res: Response) => {
  conn.query(`SELECT count(*) as cnt FROM talk_free where use_yn = 'Y'`, (err: Error, results: BaseTalkFree[]) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err.message });
    }
    console.log('Database query results:', results); // Log the results
    // res.json(results);
    const cnt = results[0]['cnt'];
    const pageSize = 8;
    const totalPage = Math.ceil(cnt / pageSize);

    res.json({totalPage : totalPage});
  });
});

// 데이터 요청
router.get('/data', (req: Request, res: Response) => {
  console.log('talkFree API accessed');

  // 페이지네이션 파라미터 가져오기
  const page = parseInt(req.query.page as string) || 1; // 기본값 1
  const pageSize = 8;

  
  // OFFSET 계산
  const offset = (page - 1) * pageSize;

  console.log(`page: ${page}, pageSize: ${pageSize}, offset: ${offset}`);

  // 데이터 조회 쿼리 실행
  conn.query(`SELECT * FROM talk_free WHERE use_yn = 'Y' ORDER BY updated_dt DESC LIMIT ? OFFSET ?`, [pageSize, offset], (err: Error, results: any[]) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});





// talk_free 테이블에 데이터 삽입
router.post('/save', (req:Request, res:Response) => {
  const { content, free_nickname, free_password }: TalkFreeRequestBody = req.body;

  // 회원 여부에 따라 다른 쿼리 실행
  let query: string;
  let params: (string | number)[];

  console.log(`content: ${content}, free_nickname: ${free_nickname}, free_password: ${free_password}`);

  // ip 가져오기
  const user_ip = getUserIp(req);

  query = 'INSERT INTO talk_free (content, free_nickname, free_password, user_ip) VALUES (?, ?, ?, ?)';
  params = [content, free_nickname, free_password, user_ip];
  
  // 데이터베이스에 데이터 삽입
  conn.query(query, params, (err:Error, results:any) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err });
    }
    console.log('Database query results:', results); // Log the results
    res.json(results);
  });
});


export default router;