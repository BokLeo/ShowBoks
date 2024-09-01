import React from "react";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";

// Components
import { About, Experience, Projects, Talk } from "components/menu";

// Pages
import { FreeTalk, QuickTalk } from "pages/talk";



const AppRoutes = ({onLocationChange}) => {
  const location = useLocation();

  React.useEffect(() => {
    if (onLocationChange) {
      onLocationChange(location.pathname);
    }
  }, [location, onLocationChange]);

  return (
    <RouterRoutes>
      <Route path="/" element={<About />} />
      <Route path="/Experience" element={<Experience />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Talk" element={<Talk />} />
      <Route path="/Talk/FreeTalk" element={<FreeTalk />} />
      <Route path="/Talk/QuickTalk" element={<QuickTalk />} />
    </RouterRoutes>
  );
};

export default AppRoutes;
