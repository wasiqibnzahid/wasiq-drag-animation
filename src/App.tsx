import { useEffect, useRef, useState } from "react";
const itemArr = [1, 2, 3, 4];
function App() {
  let { current: lastMousePos } = useRef(0);
  const [movementPercentage, setMovementPercentage] = useState(0);
  let { current: lastMovementPercentage } = useRef(0);
  function handleClick(e: MouseEvent) {
    lastMousePos = e.clientX;
  }
  function handleMouseUp(e: MouseEvent) {
    const maxVal = window.innerWidth ;
    const movementIndex = lastMousePos - e.clientX;

    const percentageOfMovement = Math.min(
      100,
      Math.max(0, (movementIndex / maxVal) * 100 + lastMovementPercentage, 0)
    );
    lastMovementPercentage = percentageOfMovement;
    setMovementPercentage(percentageOfMovement);
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return (
    <div
      style={{
        transform: `translate(-${movementPercentage}%, -50%)`,
      }}
      className="parent-container"
    >
      {itemArr.map((item) => (
        <div
          style={{
            backgroundPositionX: `${movementPercentage}%`,
          }}
          key={item}
        ></div>
      ))}
    </div>
  );
}

export default App;
