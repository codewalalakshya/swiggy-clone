import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="error-page">
      <div className="error-box">
        <div className="error-emoji">😵</div>
        <h1 className="error-code">{err?.status || 404}</h1>
        <h2 className="error-title">{err?.statusText || "Page Not Found"}</h2>
        <p className="error-msg">{err?.data || "Oops! The page you're looking for doesn't exist."}</p>
        <Link to="/" className="btn-primary">Go Back Home</Link>
      </div>
    </div>
  );
};

export default Error;
