import { useEffect, useState } from "react";

function LoadPage() {
  // UseState
  const [num, setNum] = useState(0);
  // useEffect
  useEffect(() => {
    // make the dots of loading animated so that one appears after the other
    const interval = setInterval(() => {
      setNum((prev) => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, [num]);
  // Render
  return (
    <div className="flex items-center justify-center h-screen text-3xl">
      Loading{".".repeat(num)}
    </div>
  );
}

export default LoadPage;
