# Node.js 이미지 사용
FROM node:18

# 앱 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 빌드 (필요한 경우)
RUN npm run build

# NGINX 포트 노출 (실제 포트는 설정에 따라 다를 수 있습니다)
EXPOSE 5001

# 앱 시작
CMD ["npm", "start"]

