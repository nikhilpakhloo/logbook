import LogbookShare from "./pages/LogbookShare";
import LogbookId from "./pages/LogbookId";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://stagingapi.diveroid.com/v3/log/share/28987bcf-039a-42bc-950b-2188f6b72ebf",
          // `https://stagingapi.diveroid.com/v3/log/share/${id}`,

          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setData(jsonData.data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <div className="app ">
        <BrowserRouter>
          <Routes>
            <Route
              path="/229/28987bcf-039a-42bc-950b-2188f6b72ebf"
              element={<LogbookShare  data= {data} />}
            />
            <Route path="/detail/:shareId/:logid" element={<LogbookId />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
