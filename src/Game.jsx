import Card from "./Components/Card/Card";
import "./Game.css";

const initialItems = [
  { id: 1, color: "#A30006", height: 60 },
  { id: 2, color: "#2A6E78", height: 70 },
  { id: 3, color: "#6E1E62", height: 80 },
  { id: 4, color: "#DE4126", height: 90 }
];

function Game() {
  return (
    <div
      className="Game"
      style={{ perspective: 800, perspectiveOrigin: "center" }}
    >
      {/* <Column initialItems={initialItems} /> */}
      <Card />
      <div className="crt" />
    </div>
  );
}

export default Game;
