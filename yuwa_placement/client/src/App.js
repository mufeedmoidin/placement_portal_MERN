import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./Layouts/Admin/Routes";
import StudentRoutes from "./Layouts/Student/Routes";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin/*" element={<AdminRoutes />} />
          <Route exact path="/*" element={<StudentRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
