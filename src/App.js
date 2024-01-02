

import LogbookShare from "./pages/LogbookShare";
import LogbookId from "./pages/LogbookId";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app ">
     
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogbookShare />} />
          <Route path="/detail/:shareId/:logid" element={<LogbookId/>} />
        </Routes>
      </BrowserRouter>  

     
      </div>
    </>
  );
}

export default App;
