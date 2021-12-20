import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Test } from "./views/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
