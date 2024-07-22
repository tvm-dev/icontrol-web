"use client";

import React, { useState, useEffect } from "react";

const Greeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours >= 6 && hours < 12) {
      return "Bom dia! ☀️ - ";
    } else if (hours >= 12 && hours < 18) {
      return "Boa tarde! 🕘 - ";
    } else if (hours >= 18 && hours < 24) {
      return "Boa noite! 🌜- ";
    } else {
      return "Boa madrugada! 🛌 - ";
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const cleanDayOfWeek = (day) => {
    // Remove "feira" e hífens se existirem
    return day.replace(/feira/g, "").replace(/-$/, "").trim();
  };

  const getDateInfo = () => {
    const dayOfWeek = cleanDayOfWeek(
      currentTime.toLocaleDateString("pt-BR", { weekday: "long" })
    );
    const dayOfMonth = currentTime.getDate();
    const month = capitalizeFirstLetter(
      currentTime.toLocaleDateString("pt-BR", { month: "long" })
    );

    return `${dayOfWeek}, ${dayOfMonth} de ${month}`;
  };

  return (
    <div>
      <h1 className="font-thin">
        Olá<span className="font-bold"> Thiago</span>, {getGreeting()} Hoje é{" "}
        {getDateInfo()}.
      </h1>
    </div>
  );
};

export default Greeting;
