# BubbleWrap FrontEnd Developer Portfolio
```
frontend
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  ├─ robots.txt
│  └─ src
│     └─ images
│        ├─ profile.webp
│        └─ test.png
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.js
│  ├─ App.test.js
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ BodyLayout.js
│  │  │  ├─ ExperienceLayout.js
│  │  │  ├─ HeaderLayout.js
│  │  │  └─ index.js
│  │  ├─ menu
│  │  │  ├─ About.jsx
│  │  │  ├─ Experience.js
│  │  │  ├─ ExperienceJob.js
│  │  │  ├─ freeTalk
│  │  │  │  └─ FreeTalkMessage.js
│  │  │  ├─ index.js
│  │  │  ├─ Projects.js
│  │  │  └─ Talk.js
│  │  ├─ route
│  │  │  └─ AppRoutes.js
│  │  └─ utils
│  │     ├─ Nav.js
│  │     ├─ PopupController.js
│  │     ├─ SimpleAlert.js
│  │     ├─ SimpleSnackbar.js
│  │     └─ UserTab.js
│  ├─ index.css
│  ├─ index.js
│  ├─ logo.svg
│  ├─ pages
│  │  └─ talk
│  │     ├─ FreeTalk.js
│  │     ├─ index.js
│  │     └─ QuickTalk.js
│  ├─ reportWebVitals.js
│  ├─ services
│  │  ├─ api.js
│  │  ├─ common
│  │  │  └─ PasswordApi.js
│  │  ├─ index.js
│  │  └─ talk
│  │     ├─ TalkFreeApi.js
│  │     └─ TalkQnaApi.js
│  ├─ setupTests.js
│  └─ styles
│     ├─ base-system.css
│     ├─ base-system.css.map
│     ├─ base-system.scss
│     ├─ browser-custom.css
│     ├─ browser-custom.css.map
│     ├─ browser-custom.scss
│     ├─ common.css
│     ├─ common.css.map
│     ├─ common.scss
│     ├─ design-system.css
│     ├─ design-system.css.map
│     ├─ design-system.scss
│     ├─ keyframs.css
│     ├─ keyframs.css.map
│     ├─ keyframs.scss
│     └─ reset.css
└─ webpack.config.js

```
```
frontend
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ images
│  │  ├─ logo
│  │  │  ├─ css3.png
│  │  │  ├─ figma.png
│  │  │  ├─ git.png
│  │  │  ├─ html5.png
│  │  │  ├─ illustrator.png
│  │  │  ├─ java.png
│  │  │  ├─ jquery.png
│  │  │  ├─ js.png
│  │  │  ├─ mysql.png
│  │  │  ├─ nodejs.png
│  │  │  ├─ oracle.png
│  │  │  ├─ photoshop.png
│  │  │  ├─ postman.png
│  │  │  ├─ reactjs.png
│  │  │  ├─ sass.png
│  │  │  ├─ spring.png
│  │  │  ├─ ts.png
│  │  │  └─ vue.png
│  │  ├─ profile.webp
│  │  └─ test.png
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.js
│  ├─ App.test.js
│  ├─ assets
│  │  └─ icons
│  │     └─ weather
│  │        ├─ cloud-sun.svg
│  │        ├─ cloud.svg
│  │        ├─ rain-snow.svg
│  │        ├─ rain.svg
│  │        ├─ snow.svg
│  │        └─ sun.svg
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ BodyLayout.js
│  │  │  ├─ ExperienceLayout.js
│  │  │  ├─ HeaderLayout.js
│  │  │  └─ index.js
│  │  ├─ menu
│  │  │  ├─ about
│  │  │  │  ├─ AboutModules.js
│  │  │  │  ├─ AboutModulesWeather.js
│  │  │  │  └─ AboutSkillSet.js
│  │  │  ├─ About.jsx
│  │  │  ├─ Experience.js
│  │  │  ├─ ExperienceJob.js
│  │  │  ├─ freeTalk
│  │  │  │  └─ FreeTalkMessage.js
│  │  │  ├─ index.js
│  │  │  ├─ Projects.js
│  │  │  └─ Talk.js
│  │  ├─ route
│  │  │  └─ AppRoutes.js
│  │  ├─ ui
│  │  │  ├─ AssetIcon.jsx
│  │  │  ├─ Card.jsx
│  │  │  └─ ToggleBtn.jsx
│  │  └─ utils
│  │     ├─ Geolocation.js
│  │     ├─ Information.js
│  │     ├─ Nav.js
│  │     ├─ PopupController.js
│  │     ├─ SimpleAlert.js
│  │     ├─ SimpleSnackbar.js
│  │     ├─ UserTab.js
│  │     └─ WeatherDataProcessor.js
│  ├─ index.css
│  ├─ index.js
│  ├─ logo.svg
│  ├─ pages
│  │  └─ talk
│  │     ├─ FreeTalk.js
│  │     ├─ index.js
│  │     └─ QuickTalk.js
│  ├─ reportWebVitals.js
│  ├─ services
│  │  ├─ api.js
│  │  ├─ common
│  │  │  └─ PasswordApi.js
│  │  ├─ index.js
│  │  ├─ outside
│  │  │  ├─ NaverMapApi.js
│  │  │  └─ WeatherApi.js
│  │  └─ talk
│  │     ├─ TalkFreeApi.js
│  │     └─ TalkQnaApi.js
│  ├─ setupTests.js
│  └─ styles
│     ├─ about-modules-weather.scss
│     ├─ base-system.scss
│     ├─ browser-custom.scss
│     ├─ common.scss
│     ├─ design-system.scss
│     ├─ keyframs.scss
│     ├─ logo.scss
│     └─ reset.css
└─ webpack.config.js

```