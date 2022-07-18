import React from 'react';
import CustomersTable from "../../components/customers.components/customers.data.table.component/customers.data.table.component";
import { Box } from "@chakra-ui/react"
import './customers.information.css';
import AddNewCustomersComponent from "../../components/customers.components/add.new.customers.component/add.new.customers.component";

function CustomersInformation() {
    return (
        <div className="container">
            <Box w={[300, 500, 900]} >
                <div className="table">
                    <h1 >Technical Task Basic</h1>
                    <CustomersTable/>
                    <AddNewCustomersComponent/>
                </div>
            </Box>
        </div>
    );
}

export default CustomersInformation;