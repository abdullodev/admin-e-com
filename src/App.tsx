import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/about" element={<>About</>} />
          <Route path="/price" element={<>Price</>} />
          <Route path="/history" element={<>history</>} />
          <Route path="/starred" element={<>starred</>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
