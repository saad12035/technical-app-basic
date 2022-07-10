import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CustomersData from "./pages/customerData/customerData";



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
