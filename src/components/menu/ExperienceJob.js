import React from "react";

class Job {
  constructor(period, title, company, desc, skills) {
    this.period = period;
    this.title = title;
    this.company = company;
    this.desc = desc;
    this.skills = skills;
  }
}

const jobs = [
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
    ["Adobe Illustrator", "Adobe Photoshop"]
  ),
];

const ExperienceJob = () => {
  const toggleHoverJobActive = (e) => {
    e.preventDefault();
    const jobList = e.target.closest(".job-list");
    const jobItems = jobList.querySelectorAll(".job");

    jobItems.forEach((item) => {
      item.classList.remove("active");
    });

    e.target.closest(".job").classList.add("active");
  };

  return (
    <ul className="job-list">
      {jobs.map((job, index) => (
        <li
          className={`job ${index === 0 ? "active" : ""}`}
          key={index}
          onMouseEnter={toggleHoverJobActive}
        >
          <div className="period">{job.period}</div>

          <div className="detail">
            <h5 className="job-title">
              {job.title}
              <span className="dashed" />
              {job.company}
            </h5>
            <p className="job-desc">{job.desc}</p>
            <div className="job-skill">
              <h5>Used Tech</h5>
              <ul className="skills">
                {job.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExperienceJob;
