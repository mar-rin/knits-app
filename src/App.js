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
  const [openShipment, setOpenShipment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tempData, setTempData] = useState({});
  const [activeIndex, setActiveIndex] = useState(-1);


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


  function handleEdit(e){
    navigate("/detail/" + e.currentTarget.id);
    setOpenShipment(data.filter(item => item.trackingNo === e.currentTarget.id));
    setActiveIndex(data.findIndex(item => item.trackingNo === e.currentTarget.id));
    setTempData({...tempData, orderNo: "", date:"", customer: "", status: "", consignee: ""})
  }


  function handleChange(e) {
    for (let key in tempData) {
      if (key === e.target.name) {
        setTempData({...tempData, [key]: e.target.value});
        break;
      }
    }
  }


  function handleSave() {
    const newData = [...data];
    newData[activeIndex] = {
      orderNo: tempData.orderNo,
      date: tempData.date,
      customer: tempData.customer,
      status: tempData.status,
      trackingNo: openShipment[0].trackingNo,
      consignee: tempData.consignee};
    setData(newData);
    navigate("/");
  }

  
  function handleDelete(e) {
    setData(data.filter(item => item.trackingNo !== e.currentTarget.id))
  }


  function handleSort() {
    let sortAsc = true;
    if (sortAsc) {
      let dataSortAsc = (data.sort((a, b) => {
        if (a.customer < b.customer) return -1;
        if (a.customer > b.customer) return 1;
        return 0;
      }));
      setData([...dataSortAsc]);
      
    }
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
          path="/detail/:shipment"
          element={
            <Detail
              data={data}
              handleChange={handleChange}
              handleSave={handleSave}
              />}
        />
      </Routes>
    </div>
  );
}

export default App;
      