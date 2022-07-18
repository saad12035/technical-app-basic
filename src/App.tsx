import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CustomersInformation from "./pages/customersInformation/customers.information";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CustomersInformation/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
