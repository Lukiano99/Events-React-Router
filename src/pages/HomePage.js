import React from "react";
import PageContent from "../components/PageContent";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <PageContent title="Welcome!">
      <p>Browse all our amazing events!</p>
      <NavLink
              to="/events"
              
            >
              All Events
            </NavLink>
    </PageContent>
  );
};

export default HomePage;
