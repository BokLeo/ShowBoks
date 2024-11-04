
export const experienceList = ['경력', '학력', '자격'];

export const eduData = [
	{
		period: '2021.09 ~ 2022.03',
		title: '한국소프트웨어인재개발원(KOSMO)',
		desc: 'JAVA 개발자 양성과정(프로젝트 최우수상/특모범상/봉사상 수상)',
	},
	{
		period: '2019.12 ~ 2020.04',
		title: '이젠컴퓨터학원(안양)',
		desc: '스마트기기 UI/UX 웹디자인(웹퍼블리싱과정)',
	},
	{
		period: '2011.03 ~ 2017.03',
		title: '건양대학교(4년제)',
		desc: '시각디자인학과',
	},
	{
		period: '2008.03 ~ 2011.03',
		title: '인덕원고등학교',
		desc: '이과계열',
	},
];

export const certData = [
	{
		period: '2020.04',
		title: '웹디자인기능사',
		desc: '한국산업인력공단',
	},
	{
		period: '2020.01',
		title: 'GTQ포토샵 1급',
		desc: '한국생산성본부(KPC)',
	},
	{
		period: '2020.01',
		title: 'GTQ일러스트 1급',
		desc: '한국생산성본부(KPC)',
	},
	{
		period: '2017.11',
		title: '자동차운전면허',
		desc: '경찰청(운전면허시험관리단)',
	},
	{
		period: '2011.05',
		title: 'MOS Office PowerPoint',
		desc: 'Microsoft',
	},
	{
		period: '2011.05',
		title: 'ACA Photoshop CS3',
		desc: 'ADOBE',
	},
];

class Job {
  constructor(period, title, company, desc, skills) {
    this.period = period;
    this.title = title;
    this.company = company;
    this.desc = desc;
    this.skills = skills;
  }
}

export const jobs = [
  new Job(
    "2022.07 - 2024.04",
    "Frontend Developer",
    "㈜WiseLake",
    "Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
    [
      "React",
      "Next.js",
      "Typescript",
      "Node.js",
      "GraphQL",
      "Storybook",
      "Styled Components",
      "Git",
    ]
  ),
  new Job(
    "2020.08 - 2021.08",
    "Publisher",
    "㈜신영이에스디",
    "Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
    ["HTML5", "CSS3", "SCSS", "Javascript", "jQuery", "Adobe Photoshop"]
  ),
  new Job(
    "2016.12 - 2019.01",
    "Designer",
    "㈜세중에스앤씨",
    "Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
    ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"]
  ),
];