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
		img: images['freep_logo'],
		url: 'https://freep.freep-bubblewrap.duckdns.org/',
		title: '가상 피자 판매 브랜드 FreeP 웹 애플리케이션 제작',
		desc: '(팀) 가상 피자 주문 사이트 제작 / 프론트엔드 팀장 / 프로젝트 최우수상 수상',
		skills: ['React', 'Styled-components'],
	},
];

export const publishingData = [
	{
		img: images['kakao_logo'],
		url: 'https://bokleo.github.io/-Pub-KakaoTogether/',
		title: 'KaKao 같이가치 프로젝트',
		desc: '(개인) 가상 프로모션 사이트 제작',
		skills: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Photoshop', 'Illustrator'],
	},
	{
		img: images['kyobo_logo'],
		url: 'https://bokleo.github.io/-Pub-Kyobo/',
		title: '교보문고 프로젝트',
		desc: '(개인) 가상 웹 리뉴얼 사이트 제작',
		skills: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Photoshop', 'Illustrator'],
	},
	{
		img: images['legacy_showboks_logo'],
		url: 'https://bokleo.github.io/-Pub-ShowboksLegacy/',
		title: '포트폴리오 사이트',
		desc: '(개인) 2020 포트폴리오 사이트 제작',
		skills: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Photoshop', 'Illustrator'],
	},
];