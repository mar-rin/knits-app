import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import GeneralTable from "./components/GeneralTable";
import Detail from "./components/Detail"
import { LOCAL_DATA } from './utils/localData';


function App() {
  
  
  const navigate = useNavigate();
  const url = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";
  const [data, setData] = useState([]);
  const [active, setActive] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
      axios
        .get(url)
        .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
              console.error(error);
              setData(LOCAL_DATA);
      })
      .finally(setIsLoading(false));
  }, []);
  
  
  // const dummy = [
    //   {"orderNo":"zz-450581-11385595-4210084","date":"10/16/2019","customer":"NXP Semiconductors N.V.","trackingNo":"TP-724057-72553473-5647860","status":"'In Transit'","consignee":"Koppers Holdings Inc."},
    //   {"orderNo":"kk-275651-64476049-3346442","date":"8/20/2019","customer":"Triumph Bancorp, Inc.","trackingNo":"TP-011637-13598236-2700556","status":"'Delivered'","consignee":"Celsius Holdings, Inc."},
    //   {"orderNo":"nz-906145-26850629-1813784","date":"7/10/2019","customer":"Inter Parfums, Inc.","trackingNo":"TP-065338-70937481-7664135","status":"'Delivered'","consignee":"Hovnanian Enterprises Inc"},
    // ]
          
  
  function handleEdit(e){
    navigate("/detail/" + e.currentTarget.id);
    setActive(data.filter(item => item.trackingNo === e.currentTarget.id));
    console.log("Active customer: " + active.customer)
  }
  
  function handleDelete(e) {
    console.log(e.currentTarget.id)
  }
          
  function handleSort() {
    let data2 = data.sort((a, b) => {
      if (a.customer < b.customer) return -1;
      if (a.customer > b.customer) return 1;
      return 0;
    });
    console.log("Sorted by customer: " + data2[0].customer )
    console.log("Sorted by customer: " + data2[1].customer )
    setData(data2);
  }

// //SORT BY DATE
//     arr.sort(function(a, b) {
//       var keyA = new Date(a.updated_at),
//         keyB = new Date(b.updated_at);
//       // Compare the 2 dates
//       if (keyA < keyB) return -1;
//       if (keyA > keyB) return 1;
//       return 0;
//     });
          
  return (
    <div className="container">
      <Routes>
        <Route 
          path="/" 
          element={
            (isLoading) ? <h3>A moment please... Data is being fetched</h3> :
            <GeneralTable 
              data={data} 
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleSort={handleSort}
              />} 
        /> 
        <Route 
          path="/detail/:order" 
          element={
            <Detail 
              active={active} 
              />} 
        /> 
      </Routes>
    </div>
  );
};

export default App;