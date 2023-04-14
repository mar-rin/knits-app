import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import GeneralTable from "./components/GeneralTable";
import Detail from "./components/Detail"


function App() {

    const navigate = useNavigate();
    const [selectedShipment, setSelectedShipment] = useState("")


    function handleEdit(e) {
        setSelectedShipment(e.currentTarget.id);
        navigate("/detail/" +  e.currentTarget.id)
    }


    return (
      <div className="container">
        <Routes>
          <Route
              path="/"
              element={
                  <GeneralTable
                      handleEdit={handleEdit}
                  />}
          />
          <Route
              path="/detail/:shipment"
              element={
                  <Detail
                      selectedShipment={selectedShipment}
                  />}
          />
        </Routes>
      </div>
      );
}

export default App;
