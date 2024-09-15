import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Pages from "./pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />} />
      </Routes>
    </Router>
  )
}

export default App
