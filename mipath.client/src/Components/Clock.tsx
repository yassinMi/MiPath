import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";


  return (
    <div className='font-thin flex-shrink-0 items-end text-4xl flex flex-row gap-4'>
        <div className="w-26">
        {hours}:{minutes}:{seconds}
      </div>
      <div className="text-lg">{ampm}</div></div>
   
  );
}
