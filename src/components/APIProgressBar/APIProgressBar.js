// Task 3: Create API progress bar component in React
// Have thoughts on scenarios like -
// - natural animation
// - multiple API case
// - error case, timeout
// - fast & slow request
// - API cancellation .etc

import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [apiRequests, setApiRequests] = useState([
    { url: "https://dummyapi.online/api/movies/1" },
    { url: "https://dummyapi.online/api/movies/2" },
    { url: "https://dummyapi.online/api/movies/3" },
  ]);
  const [message, setMessage] = useState("No response");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          apiRequests.map((apiRequest) => fetch(apiRequest.url))
        );

        const successfulResponses = responses.filter((response) => response.ok);
        setProgress((successfulResponses.length / apiRequests.length) * 100);
        if (successfulResponses.length === apiRequests.length) {
          setMessage("All requests successful");
        } else {
          setMessage("Request failed");
          setHasError(true);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        setHasError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="progress-bar">
        <div
          role="progressbar"
          className={hasError ? "progress-bar-error" : "progress-bar-fill"}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div>{message}</div>
    </>
  );
};

export default ProgressBar;
