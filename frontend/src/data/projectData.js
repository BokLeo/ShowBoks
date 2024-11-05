export const projectList = ['Web-Application', 'Web-Publishing'];

// logo img 파일은 src/assets/projects/ 폴더에 저장
import freepLogo from '../assets/projects/freep_logo.png';

const importAllImages = (requireContext) => {
  const images = {};
  requireContext.keys().forEach((key) => {
    const imageName = key.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
    images[imageName] = requireContext(key);
  });
  return images;
};

const images = importAllImages(require.context('../assets/projects', false, /\.(png|jpe?g|svg)$/));

export const applicationData = [
	{
		img: images['legacy_showboks_logo'],
		url: '',
		title: '(개인) 포트폴리오 사이트',
		desc: [
			'2024 포트폴리오 사이트 제작',
			'사용자 위치 파악을 위한 Naver Map API 적용',
			'기상청 기상예보 API 적용',
			'Chart.js를 이용한 정보 시각화',
			'Redux를 이용한 전역 상태 관리',
			'OCI 클라우드 서버 배포',
		],
		skills: ['React', 'Redux', 'Node.js', 'Express', 'Javascript', 'OCI', 'Photoshop', 'Illustrator'],
	},
	{
		img: images['freep_logo'],
		url: 'https://freep.freep-bubblewrap.duckdns.org/',
		title: '(팀프로젝트) 가상 피자 판매 브랜드 FreeP 웹 애플리케이션 프로젝트',
		desc: [
			'프로젝트 최우수상 수상',
			'프론트엔드 팀장',
			'전체 디자인,레이아웃 구성',
			'주문하기 기능 구현',
			'장바구니 담기 기능 구현',
			'커뮤니티 기능 구현',
			'OCI 클라우드 서버 배포',
		],
		skills: ['JAVA', 'Spring', 'MyBatis', 'JSP', 'HTML5', 'CSS3', 'Javascript', 'jQuery', 'OracleDB', 'OCI', 'Photoshop', 'Illustrator'],
	},
];

export const publishingData = [
	{
		img: images['kakao_logo'],
		url: 'https://bokleo.github.io/-Pub-KakaoTogether/',
		title: '(개인) KaKao 같이가치 프로젝트',
		desc: [
			'가상 프로모션 사이트 제작',
			'반응형 웹 제작',
			'이미지 소스 제작 및 드로잉 디자인',
		],
		skills: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Photoshop', 'Illustrator'],
	},
	{
		img: images['kyobo_logo'],
		url: 'https://bokleo.github.io/-Pub-Kyobo/',
		title: '(개인) 교보문고 프로젝트',
		desc: [
			'가상 웹 리뉴얼 사이트 제작',
			'반응형 웹 제작',
			'이미지 소스 제작 및 드로잉 디자인',
		],
		skills: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Photoshop', 'Illustrator'],
	},
	{
		img: images['legacy_showboks_logo'],
		url: 'https://bokleo.github.io/-Pub-ShowboksLegacy/',
		title: '(개인) 포트폴리오 사이트',
		desc: [
			'2020 포트폴리오 사이트 제작',
			'반응형 웹 제작',
			'이미지 소스 제작 및 드로잉 디자인',
		],
		skills: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Photoshop', 'Illustrator'],
	},
];