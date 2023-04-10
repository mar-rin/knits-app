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
  const [customerIsSorted, setCustomerIsSorted] = useState(false);
  const [dateIsSorted, setDateIsSorted] = useState(false);


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
    setActiveIndex(data.findIndex(item => item.trackingNo === e.currentTarget.id));
    setOpenShipment(data.filter(item => item.trackingNo === e.currentTarget.id));
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
    if (!customerIsSorted) {
      let dataSortAsc = (data.sort((a, b) => {
        if (a.customer.toUpperCase() < b.customer.toUpperCase()) return -1;
        if (a.customer.toUpperCase() > b.customer.toUpperCase()) return 1;
        return 0;
      }));
      setData([...dataSortAsc]);
      setCustomerIsSorted(true);
      setDateIsSorted(false);
    } else {
        let dataSortDesc = (data.sort((a, b) => {
          if (a.customer.toUpperCase() < b.customer.toUpperCase()) return 1;
          if (a.customer.toUpperCase() > b.customer.toUpperCase()) return -1;
          return 0;
        }));
        setData([...dataSortDesc]);
        setCustomerIsSorted(false);
        setDateIsSorted(false);
    }
  }

  function handleSortDate() {
    if (!dateIsSorted) {
      let dataSortAsc = (data.sort((a, b) => {
        let keyA = new Date(a.date);
        let keyB = new Date(b.date);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      }));
      setData([...dataSortAsc]);
      setDateIsSorted(true);
      setCustomerIsSorted(false);
    } else {
      let dataSortDesc = (data.sort((a, b) => {
        let keyA = new Date(a.date);
        let keyB = new Date(b.date);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      }));
      setData([...dataSortDesc]);
      setDateIsSorted(false);
      setCustomerIsSorted(false);
    }
  }
  


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
              handleSortDate={handleSortDate}
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
      