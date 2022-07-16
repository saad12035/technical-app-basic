import React from 'react';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import {useMutation, useQuery} from "@apollo/client";
import {INSERT_CUSTOMERS, Results} from "../graphql-api-calls";
import './add-customer-data.css';
import {TextField} from "../../textfield/textfield";
import {Form, Formik} from "formik";
import {validate} from "../../../utilities/formik";



function AddCustomerData() {
    const [MyMutation] = useMutation(INSERT_CUSTOMERS);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {refetch} = useQuery(Results);

    function handleSubmit(values){
            MyMutation({
                variables: {
                    Email: values.email.charAt(0).toUpperCase()+ values.email.slice(1).toLowerCase(),
                    Name: values.name.charAt(0).toUpperCase()+ values.name.slice(1).toLowerCase(),
                    Role: values.role.charAt(0).toUpperCase()+ values.role.slice(1).toLowerCase()
                }
            }).then((res)=>{
                onClose();
                refetchCustomersData();
            })
    }
    const refetchCustomersData = () => {
        refetch()
            .then((res) => {
            })
    };


    return (
        <Box className="add-button" w={[300, 500, 900]}>
            <Button colorScheme='teal' size='lg' onClick={onOpen}>Add Record</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            role: ''
                        }}
                        validationSchema={validate}
                        onSubmit={handleSubmit}
                    >
                        {formik => (
                    <Form>
                        <ModalHeader>Add Customer</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <TextField label="Full Name" name="name" type="text" />
                            <TextField label="Email" name="email" type="email" />
                            <TextField label="Role" name="role" type="text" />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='blue' type="submit">Submit</Button>
                        </ModalFooter>
                    </Form>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AddCustomerData;