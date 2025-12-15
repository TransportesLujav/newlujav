'use client';

import React, { useState, useEffect } from 'react';
import './banner.css';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Check if the current date is after January 29, 2026
    const checkVisibility = () => {
      const now = new Date();
      const expirationDate = new Date('2026-01-30T00:00:00'); // Disappear starting Jan 30
      if (now >= expirationDate) {
        setIsVisible(false);
        return false;
      }
      return true;
    };

    if (!checkVisibility()) return;

    const targetDate = new Date('2026-01-27T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      
      // Double check visibility in case it expires while the user is on the page
      if (now >= new Date('2026-01-30T00:00:00')) {
        setIsVisible(false);
        return;
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="banner-container">
      <div className="banner-content">
        <span className="banner-badge">Próximo Evento</span>
        <p className="banner-text">
          Estaremos en la <span style={{ fontWeight: 600 }}>Expo Proveedores del Transporte y Logística Puebla</span>
          <span style={{ margin: '0 0.5rem' }}>&middot;</span>
          <span className="banner-date">27, 28 y 29 de Enero 2026</span>
        </p>
      </div>
      <div className="banner-timer">
        <span>Faltan: </span>
        <span className="banner-timer-value">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    </div>
  );
};

export default Banner;
