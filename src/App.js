import LogbookShare from "./pages/LogbookShare";
import LogbookId from "./pages/LogbookId";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before making the API call

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
        setLoading(false)
       
      } catch (error) {
        setLoading(false)

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
              path="/229/6f798c97-e8dd-4459-9eab-ac45b3e21d92"
              element={<LogbookShare  data= {data} loading={loading} />}
            />
            <Route path="/detail/:shareId/:logid" element={<LogbookId />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
