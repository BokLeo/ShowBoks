import { Request } from 'express';

// [ ] TODO: 배포 후 UserIp를 가져오는 방법을 수정해야 함
const getUserIp = (req: Request) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.warn(`clientIp: ${clientIp}`);
  return 'test';
};

export default getUserIp;