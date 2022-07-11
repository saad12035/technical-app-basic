import React, {useEffect, useState} from 'react';
import CustomersTable from "../../components/customer-components/view-customers-data/view-customers-data";
import {useQuery} from "@apollo/client";
import { Box } from "@chakra-ui/react"
import './customer-data.css';
import {Results} from '../../components/customer-components/graphql-api-calls';
import AddCustomerData from "../../components/customer-components/add-customer-data/add-customer-data";

function CustomersData() {
    const {data} = useQuery(Results);
    const [arr, setArr] = useState([]);
    useEffect(() => {
        if (data !== undefined) {
            let p = []
            data.Customers.map((arr) => (
                p.push(arr)
        ));
            setArr(p)
        }
    }, [data]);

    return (
        <div className="container">
            <Box maxW="960px" mx="auto" >
                <div className="check">
                    <h1 >Technical Task Basic</h1>
                    <CustomersTable{...arr}/>
                    <AddCustomerData/>
                </div>
            </Box>
        </div>
    );
}

export default CustomersData;