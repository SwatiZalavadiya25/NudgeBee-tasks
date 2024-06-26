import APIProgressBar from "./components/APIProgressBar";
import NestedCheckbx from "./components/NestedCheckbox";
import UnCompress from "./components/Uncompress";

function App() {
  return (
    <div className="app-layout">
      <div className="container">
        <div>
          <h2>Task 1</h2>
          <UnCompress />
        </div>
        <div>
          <h2>Task 2</h2>
          <NestedCheckbx />
        </div>
        <div>
          <h2>Task 3</h2>
          <APIProgressBar />
        </div>
      </div>
    </div>
  );
}

export default App;
