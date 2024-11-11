"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// [ ] TODO: 배포 후 UserIp를 가져오는 방법을 수정해야 함
const getUserIp = (req) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.warn(`clientIp: ${clientIp}`);
    return 'test';
};
exports.default = getUserIp;
