import React from 'react';
import CustomersTable from "../../components/customer-components/customers-data-table/customers-data-table";
import { Box } from "@chakra-ui/react"
import './customer-data.css';
import AddCustomerData from "../../components/customer-components/add-customer-data/add-customer-data";

function CustomersData() {
    return (
        <div className="container">
            <Box w={[300, 500, 900]} >
                <div className="check">
                    <h1 >Technical Task Basic</h1>
                    <CustomersTable/>
                    <AddCustomerData/>
                </div>
            </Box>
        </div>
    );
}

export default CustomersData;