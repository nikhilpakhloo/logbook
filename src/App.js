
import Main from "./components/Main";
import Email from "./emailtemplate/Email";
import LogbookShare from "./pages/LogbookShare";
import LogbookId from "./pages/LogbookId";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app ">
        {/* <Main /> */}
        {/* <Email/> */}
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogbookShare />} />
          <Route path="/userlog/:itemData" element={<LogbookId/>} />
        </Routes>
      </BrowserRouter>

     
      </div>
    </>
  );
}

export default App;
