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
    const [MyMutation] = useMutation(INSERT_CUSTOMERS);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialValues = { name: "", email: "", role: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const handleSubmit = event => {
        event.preventDefault();
        MyMutation({
            variables: {
                Email: formValues.email,
                Name: formValues.name,
                Role: formValues.role
            }
        }).then((res)=>{
            window.location.reload(false);
        })
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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
                                    name='name'
                                    type='text'
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='email'>Email address</FormLabel>
                                <Input id='email' type='email'   name='email'  onChange={handleChange}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='role'>Role</FormLabel>
                                <Input id='role' type='role'   name='role'  onChange={handleChange}/>
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