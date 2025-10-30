import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Paint-lite</h1>
        <div className="toolbar-placeholder">
          [Toolbar - Tools will go here]
        </div>
      </header>

      <main className="app-main">
        <aside className="control-panel-placeholder">
          [Control Panel - Tool options will go here]
        </aside>

        <section className="canvas-container-placeholder">
          [Canvas - Drawing area will go here]
        </section>

        <aside className="layers-panel-placeholder">
          [Layers Panel - Layer management will go here]
        </aside>
      </main>
    </div>
  )
}

export default App
