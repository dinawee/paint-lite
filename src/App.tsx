import "./App.css";
import { Canvas } from "./components/Canvas";
import { Header } from "./components/common";
import { ControlPanel } from "./components/ControlPanel";
import { LayersPanel } from "./components/LayersPanel";
import { Toolbar } from "./components/Toolbar";

function App() {
  return (
    <div className="app">
      <Header />
      <Toolbar />

      <main className="app-main">
        <ControlPanel />

        <section className="canvas-container">
          <Canvas />
        </section>

        <LayersPanel />
      </main>
    </div>
  );
}

export default App;
