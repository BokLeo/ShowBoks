import express, { Request, Response } from 'express';
import path from 'path';
import appRoot from 'app-root-path';

const router = express.Router();

// 접속 
const connPath = path.join(appRoot.path, 'dist', 'src', 'conn'); // dist로 경로 수정
const conn = require(connPath).default; // conn 모듈 가져오기

// Utils > getUserIp 가져오기
const getUserIp = require(path.join(appRoot.path, 'dist', 'src', 'utils', 'getUserIp')).default;

type BaseTalkFree = {
  cnt: number;
  id: number;
  content: string;
  // created_dt: string; auto generated
  // updated_dt: string; auto generated
  user_ip: string | null;
  free_nickname: string;
  free_password: string;
  use_yn: string;
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
  
  // 쿼리 파라미터 처리
  const pageParam = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
	const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const pageSize = 8;
  
  // OFFSET 계산
  const offset = (page - 1) * pageSize;
  console.log(`page: ${page}, pageSize: ${pageSize}, offset: ${offset}`);

  // 최종 실행되는 SQL 쿼리 확인
  const sqlQuery = `SELECT * FROM talk_free WHERE use_yn = 'Y' ORDER BY id DESC LIMIT ? OFFSET ?`;
  const finalQuery = conn.format(sqlQuery, [pageSize, offset]);
  console.log('최종 SQL 쿼리:', finalQuery);

  // 데이터 조회 쿼리 실행
  conn.query(sqlQuery, [pageSize, offset], (err:any, results:any) => {
    if (err) {
      console.error('Database query error:', err);
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
    results.message = '게시글이 성공적으로 등록되었습니다!';    
    res.json(results);
  });
});

// talk_free 게시글 비밀번호 확인
router.post('/check_password', (req:Request, res:Response) => {
  console.log(req.body);

  const { postId, password }: { postId: number, password: string } = req.body;

  console.log(`postId: ${postId}, password: ${password}`);

  conn.query('SELECT * FROM talk_free WHERE id = ? AND free_password = ?', [postId, password], (err:Error, results:BaseTalkFree[]) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err });
    }
    console.log('Database query results:', results); // Log the results

    if (results.length === 0) {
      return res.status(200).json({ result: false, error: '비밀번호가 일치하지 않습니다.' });
    }

    res.status(200).json({ result: true, data: results });
  });
});

// talk_free 게시글 삭제
router.post('/delete', (req: Request, res: Response) => {
  console.log(req.body);

  const { postId }: { postId: number } = req.body;

  console.log(`postId: ${postId}`);

  conn.query('UPDATE talk_free SET use_yn = "N" WHERE id = ?', [postId], (err: Error, results: any) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(200).json({ result: false, error: '비밀번호가 일치하지 않거나 게시글이 존재하지 않습니다.' });
    }

    res.status(200).json({ result: true, message: '게시글이 성공적으로 삭제되었습니다.' });
  });
});

// talk_free 게시글 수정
router.post('/update', (req: Request, res: Response) => {
  const { postId, content } : { postId: number, content: string } = req.body;

  console.log(`postId: ${postId}, content: ${content}`);

  conn.query('UPDATE talk_free SET content = ? WHERE id = ?', [content, postId], (err: Error, results: any) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).json({ error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(200).json({ result: false, error: '게시글이 존재하지 않습니다.' });
    }

    res.status(200).json({ result: true, message: '게시글이 성공적으로 수정되었습니다.' });
  });
});


export default router;