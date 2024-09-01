import React from "react";

// Routes
import AppRoutes from "components/route/AppRoutes";

const BodyLayout = () => {
  const [location, setLocation] = React.useState(null);
  const [bodyClass, setBodyClass] = React.useState('app-body');

  const changeBodyClass = (location) => {
    const cl = 'app-body';

    if (location === "/") {
      setBodyClass(cl);
    } else if (location === "/Experience") {
      setBodyClass(`${cl} experience`);
    } else if (location === "/Projects") {
      setBodyClass(`${cl} projects`);
    } else if (location.includes("/Talk")) {
      setBodyClass(`${cl} talk`);
    } else {
      setBodyClass(cl);
    }
  };

  const handleLocationChange = (pathname) => {
    setLocation(pathname);
    changeBodyClass(pathname);
  };
  
  return (
    <div className={`${bodyClass}`}>
      <AppRoutes onLocationChange={handleLocationChange}/>
    </div>
  );
};

export default BodyLayout;

