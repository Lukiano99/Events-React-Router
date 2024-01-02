import React from "react";
import PageContent from "../components/PageContent.js";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation.js";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  let title = "An error occured!";
  let message = "Something went wrong!";
  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
