import { useEffect, useState } from "react";

const messages = [
  "Free delivery on orders over Rs. 2,000",
  "New festive edit is live -- shop Mehfil",
  "Easy 7-day exchanges, nationwide",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-ink text-ivory text-xs md:text-sm py-2.5 text-center tracking-wide">
      {messages[index]}
    </div>
  );
}
