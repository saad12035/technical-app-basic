import React from 'react';
import * as Yup from 'yup';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import {useMutation} from "@apollo/client";
import {INSERT_CUSTOMERS} from "../graphql-api-calls";
import './add-customer-data.css';
import {TextField} from "../../textfield/textfield";
import {Form, Formik} from "formik";


function AddCustomerData() {
    const [MyMutation] = useMutation(INSERT_CUSTOMERS);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const validate = Yup.object({
        name: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .max(15, 'Must be 15 characters or less')
            .required('Fullname is Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        role: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid role')
            .max(5,'Role is invalid')
            .required('Role is required'),
    })
    return (
        <div className="add-button">
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
                        onSubmit={values => {
                            MyMutation({
                                variables: {
                                    Email: values.email,
                                    Name: values.name,
                                    Role: values.role
                                }
                            }).then((res)=>{
                                window.location.reload(false);
                            })
                            console.log(values)
                        }}
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
        </div>
    );
}

export default AddCustomerData;