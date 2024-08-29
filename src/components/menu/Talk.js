// this page is About page

import React, { useRef } from 'react';


const Talk = () => {
  // useEffect(() => window.scrollTo({ top: 1000, behavior: "smooth" }), []);
  const paragraphRef = useRef(null);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        onClick={() =>
          window.scrollTo({
            top: paragraphRef.current.offsetTop,
            behavior: "smooth"
          })
        }
      >
        Learn more
      </button>
      <div style={{ height: 1000, border: "1px solid black" }}></div>
      <p ref={paragraphRef}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <div style={{ height: 1000, border: "1px solid black" }}></div>
    </div>
  );
};

export default Talk;