import { Routes, Route, Link } from "react-router-dom"
import SignUp from "pages/SignUp"
import SignIn from "pages/SignIn"
import FilesList from "pages/FilesList"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FilesList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
