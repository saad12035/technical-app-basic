import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CustomersData from "./pages/customerData/customer-data";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CustomersData/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
