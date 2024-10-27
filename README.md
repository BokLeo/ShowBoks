⭕ 241026~27 학습 기록
- OCI Free Tier 
	✨ 과거 계정 Free Tier ➡️ 결제 방식 추가로 유료 계정으로 전환
- OCI 
	- 구획 생성
	- 가상 클라우드 네트워크 생성
	- 인스턴스 생성
	- 인스턴스 수신 규칙 설정
	- 에약된 공용 IP 생성 및 인스턴스 연결
	- 인스턴스 ssh 접속 확인
	- 인스턴스 부트 볼륨 백업 및 복구
- Ubuntu
	- 초기 설정
		- 기본 패키지 설치
		- SSH 포트 및 로그인 방식 변경
		- iptables에 새로운 ssh 포트 허용 저장
			> 로그인이 안되는 이슈로 인하여 ubuntu iptables 설정 초기화 진행(INPUT/OUTPUT/FORWARD 모두 허용 -> iptables 사용 안함 효과)
			🤔 위 이슈는 sshd_config의 ListenAddress를 수정하였더니 접속 가능하였음.
				- ListenAddress : 127.0.0.1 -> 0.0.0.0
				이것이 이슈를 해결한 본질적인 해결법이라면 iptables 설정 초기화가 불필요할듯
				(상기) 두 방법 중 두가지 방법이 모두 필요한지 아니면 하나만 필요한지 추후 확인 필요할듯
		- OCI에서 수신 규칙 추가
		- 유저 계정 생성 및 권한 부여
		- 새로운 유저 계정 ssh 접속 확인
	- 우분투 보안 설정
	- 우분투 xRDP 설정 및 원격 데스크톱 연결
- Docker
	- docker 설치 및 network 설정
	- Nginx Proxy Manager 설치 및 NPM 연동
	- Portainer 설치 및 NPM 연동


