import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

export const First = () => {
  const [data, setData] = useState('');
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(true);
  const memories = ["Maldive", "Austria", "USA"];
  const countdownTime = 10; // Set initial countdown time in seconds
  const [timeLeft, setTimeLeft] = useState(countdownTime);

  // Timer for showing the birthday message
  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowBirthdayMessage(false);
    }, countdownTime * 1000); // Converts to milliseconds

    return () => clearTimeout(messageTimer); // Cleanup timer
  }, []);

  // Countdown timer for the circle display
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer
  }, []);

  const handle = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="container mt-5">
      {showBirthdayMessage ? (
        <div className="text-center p-5 bg-light rounded shadow position-relative">
          <h6
            className="display-7 text-primary fw-bold fst-italic"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
          🎉 Celebrating Your Special Day! Happy Anniversary! 🎉
          </h6>
          <p
            className="lead text-secondary fst-italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
         Wishing you both a day filled with joy, laughter, and unforgettable memories together!
          </p>

          {/* Countdown Timer Circle */}
          <div
            className="d-flex align-items-center justify-content-center mx-auto mt-4"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              // border: '3px solid',
              borderImage: 'linear-gradient(135deg, #ff6a00, #ee0979, #ff6a00) 1',
              boxShadow: '0 0 20px rgba(255, 105, 180, 0.7)',
              backgroundColor: '#fff',
              fontSize: '1.5em',
              color: '#ff4500',
              fontWeight: 'bold',
            }}
          >
            {formatTime(timeLeft)}
          </div>
        </div>
      ) : (
        <div>
          <div className="select-container mb-4">
            <label className="select-question h4 mb-3 text-dark">
              Which memory would you like to revisit?
            </label>
            <select className="form-select form-select-lg" onChange={handle} defaultValue="">
              <option value="" disabled>Select a memory...</option>
              {memories.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>
          
          {/* Conditional rendering of the carousel */}
          <div style={{ width: "80%", margin: "0 auto" }}>
            {data && (
              <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className={`carousel-item ${num === 1 ? "active" : ""}`}>
                      <img
                        src={`../../images/${data.toLowerCase()}${num}.jpg`}
                        className="d-block w-100"
                        alt={`${data} ${num}`}
                      />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
