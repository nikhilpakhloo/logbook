import LogbookShare from "./pages/LogbookShare";
import LogbookId from "./pages/LogbookId";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              path={`/:userid/:shareid`}
              element={<LogbookShareWrapper />}
            />
            <Route path="/details/:shareid/:logid" element={<LogbookId />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

function LogbookShareWrapper() {
  const { userid, shareid } = useParams();


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://stagingapi.diveroid.com/v3/log/share/${shareid}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setData(jsonData.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [shareid]);

  return <LogbookShare data={data} loading={loading} shareid={shareid} userid= {userid} />;
}

export default App;
