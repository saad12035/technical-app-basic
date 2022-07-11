import React from 'react';
import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {INSERT_CUSTOMERS} from "../graphql-api-calls";
import './add-customer-data.css';


function AddCustomerData() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [MyMutation] = useMutation(INSERT_CUSTOMERS);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleSubmit = event => {
        event.preventDefault();
        MyMutation({
            variables: {
                Email: email,
                Name: name,
                Role: role
            }
        });
        setTimeout(() => {
            window.location.reload(false);
        }, 500);
    };

    return (
        <div className="add-button">
            <Button colorScheme='teal' size='lg' onClick={onOpen}>Add Record</Button>
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
        </div>
    );
}

export default AddCustomerData;