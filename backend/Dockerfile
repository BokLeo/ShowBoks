# Node.js 이미지를 기반으로 설정
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 소스 파일 복사
COPY . .

# TypeScript 빌드
RUN npx tsc

# 5000번 포트 열기
EXPOSE 5000

# 서버 실행
CMD ["node", "dist/server.js"]