import React, {useEffect, useState} from 'react';
import CustomersTable from "../../components/customerTable/customerTable";
import {useQuery, useMutation} from "@apollo/client";
import {
    Button, FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
import './customerData.css';
import {Results,INSERT_CUSTOMERS} from './api';

function CustomersData() {
    const {data} = useQuery(Results);
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [arr, setArr] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [MyMutation] = useMutation(INSERT_CUSTOMERS);

    const handleSubmit = event => {
        event.preventDefault();
        MyMutation({
            variables: {
                Email: email,
                Name: name,
                Role: role
            }
        });
        window.location.reload(false);
    };


    useEffect(() => {
        if (data !== undefined) {
            let p = []
            data.Customers.map((arr) => (
                p.push(arr)
        ));
            setArr(p)
        }
    }, [data])

    return (
        <div className="container">
            <Box maxW="960px" mx="auto" >
                <div className="check">
                    <h1 >Technical Task Basic</h1>
                    <CustomersTable{...arr}/>
                    <Button colorScheme='teal' size='lg' onClick={onOpen}>Add Record</Button>
                </div>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <form onSubmit={handleSubmit}>
                            <ModalHeader>Add Customer</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='name'>Full Name</FormLabel>
                                    <Input
                                        id='name'
                                        type='name'
                                        onChange={event => setName(event.currentTarget.value)}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='email'>Email address</FormLabel>
                                    <Input id='email' type='email' onChange={event => setEmail(event.currentTarget.value)}/>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='role'>Role</FormLabel>
                                    <Input id='role' type='role' onChange={event => setRole(event.currentTarget.value)}/>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button colorScheme='blue' type="submit">Submit</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Box>
        </div>
    );
}

export default CustomersData;