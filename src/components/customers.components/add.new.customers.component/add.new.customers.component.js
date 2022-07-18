import React from 'react';
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
import {INSERT_CUSTOMERS, Results} from "../graphql.api.calls";
import './add.new.customers.component.css';
import {TextfieldComponent} from "../../textfield.components/textfield.component";
import {Form, Formik} from "formik";
import {validate} from "../../../utilities/formik.conditions";



function AddNewCustomersComponent() {
    const [Mutation] = useMutation(INSERT_CUSTOMERS);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {refetch} = useQuery(Results);

    function handleSubmit(values){
            Mutation({
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
                            <TextfieldComponent label="Full Name" name="name" type="text" />
                            <TextfieldComponent label="Email" name="email" type="email" />
                            <TextfieldComponent label="Role" name="role" type="text" />
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

export default AddNewCustomersComponent;