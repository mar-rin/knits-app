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
  const [isLoading, setIsLoading] = useState(true);
  const [tempData, setTempData] = useState({});
  const [activeIndex, setActiveIndex] = useState(-1);
  const [customerIsSorted, setCustomerIsSorted] = useState(false);
  const [dateIsSorted, setDateIsSorted] = useState(false);

//FETCHING DATA. IF FETCH NOT SUCCESSFUL, THEN USING LOCALLY SAVED DATA
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

//OPENING DETAIL VIEW AND SETTING DATA TO BE EDITED
  function handleEdit(e){
    navigate("/detail/" + e.currentTarget.id);
    const selectedIndex = data.findIndex(item => item.trackingNo === e.currentTarget.id);
    setActiveIndex(selectedIndex);
    setTempData({
      ...tempData,
      orderNo: data[selectedIndex].orderNo,
      date: data[selectedIndex].date,
      customer: data[selectedIndex].customer,
      trackingNo: data[selectedIndex].trackingNo,
      status: data[selectedIndex].status,
      consignee: data[selectedIndex].consignee
    })
  }

//HANDLING USER INPUT IN DETAIL VIEW.
  function handleChange(e) {
    for (let key in tempData) {
      if (key === e.target.name) {
        setTempData({...tempData, [key]: e.target.value});
        break;
      }
    }
  }

//A CHECK FOR CORRECT DATE FORMAT. THEN
//SAVING USER INPUT TO DATA BY CREATING A DEEP COPY OF ORIGINAL DATASET
  function handleSave() {
    const editedDate = tempData.date;
    const pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const isValidDate = pattern.test(editedDate);
    if (!isValidDate) {
      alert("Invalid date format! Please check input.");
    } else {
      const newData = [...data];
      newData[activeIndex] = {
        orderNo: tempData.orderNo,
        date: tempData.date,
        customer: tempData.customer,
        status: tempData.status,
        trackingNo: tempData.trackingNo,
        consignee: tempData.consignee
      };
      setData(newData);
      navigate("/");
    }
  }

//HANDLING ITEM DELETE
  function handleDelete(e) {
    setData(data.filter(item => item.trackingNo !== e.currentTarget.id))
  }

//HANDLING SORTING OF CUSTOMER FIELD, IN BOTH ASC AND DESC ORDER
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

//HANDLING DATE SORT
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
  
//RENDERING TWO VIEWS: TABLE AND DETAIL, WITH ROUTING
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
              tempData={tempData}
              handleChange={handleChange}
              handleSave={handleSave}
              />}
        />
      </Routes>
    </div>
  );
}

export default App;