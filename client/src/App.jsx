import { Route, Routes } from "react-router-dom"
import Navigation from "./components/Navigation"
import { Catalogo } from "./views/Catalogo"
import { DetalleCatalogo } from "./views/DetalleCatalogo"
// import otro from "./views/otro"


function App() {

  return (
    <div className="min-h-screen flex flex-col max-w-400 mx-auto">

      <Navigation />

      <main className="w-full px-6">
        <Routes>
          <Route path="/" element={<h1>Vista Home</h1>} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/productos/:id" element={<DetalleCatalogo />} />
          {/* <Route path="/otro" element={<otro />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App