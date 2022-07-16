import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_CUSTOMERS, Results, UPDATE_CUSTOMERS} from '../graphql-api-calls';
import {Form, Formik} from "formik";
import {TextField} from "../../textfield/textfield";
import {validate} from "../../../utilities/formik";

function CustomersTable(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [dataValues, setDataValues] = useState({
        placeholderName: '',
        placeholderRole: '',
        placeholderEmail: ''
    });
    const [ID, setId] = useState('');

    const [loadingState, setLoadingState] = useState('false');
    const [MyMutation, {loading: delCustomerLoading, error: delCustomerError}] = useMutation(DELETE_CUSTOMERS);
    const [CustomersUpdateMutation, {
        loading: updateCustomerLoading,
        error: updateCustomerError
    }] = useMutation(UPDATE_CUSTOMERS);
    const {data, refetch, loading: resultLoading, error: resultError} = useQuery(Results);

    useEffect(() => {
        if (delCustomerLoading || updateCustomerLoading || resultLoading) {
            setLoadingState('true');
        } else if (delCustomerError || updateCustomerError || resultError) {
            setLoadingState('error')
        } else {
            setTimeout(() => {
                setLoadingState('false');
            }, 1000);
        }
    }, [delCustomerLoading, updateCustomerLoading, resultLoading, delCustomerError, updateCustomerError, resultError]);

    const setValues = (name = '', role = '', email = '') => {
        setDataValues({
            placeholderName: name.charAt(0).toUpperCase()+ name.slice(1).toLowerCase(),
            placeholderRole: role.charAt(0).toUpperCase()+ role.slice(1).toLowerCase(),
            placeholderEmail: email.charAt(0).toUpperCase()+ email.slice(1).toLowerCase()
        });
    };

    const handleOpenModal = (id) => {
        setId(id.ID);
        setValues(id.Name, id.Role, id.Email)
        onOpen();
    };

    function handleDelete(e) {
        MyMutation({
            variables: {
                ID: e,
            }
        })
            .then(() => {
                refetchCustomersData()
            })
            .catch(() => {
                setLoadingState('error');
            });
    }

    const refetchCustomersData = () => {
        refetch()
            .then((res) => {
            })
            .catch(() => {
                setLoadingState('error');
            });
    };



    function updateCustomerData(values) {
        CustomersUpdateMutation({
            variables: {
                ID: ID,
                Email: values.email.charAt(0).toUpperCase()+ values.email.slice(1).toLowerCase(),
                Name: values.name.charAt(0).toUpperCase()+ values.name.slice(1).toLowerCase(),
                Role: values.role.charAt(0).toUpperCase()+ values.role.slice(1).toLowerCase()
            }
        }).then((res) => {
            setValues();
            onClose();
            refetchCustomersData();
        });
    }

    return (
        <>
            {(loadingState === "error") ? (<p>An error occurred while fetching data</p>) : (loadingState === "true") ? (
                <Box w={[300, 500, 900]}>
                    <h1>Fetching Data ...</h1>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        style={{marginLeft: "44%", marginBottom: 20}}
                    />
                </Box>
                   ) : (
                <>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <Formik
                                initialValues={{
                                    name: dataValues.placeholderName,
                                    email: dataValues.placeholderEmail,
                                    role: dataValues.placeholderRole
                                }}
                                validationSchema={validate}
                                onSubmit={updateCustomerData}
                            >
                                {formik => (
                                    <Form>
                                        <ModalHeader>Add Customer</ModalHeader>
                                        <ModalCloseButton/>
                                        <ModalBody>
                                            <TextField label="Full Name" name="name" type="text"/>
                                            <TextField label="Email" name="email" type="email"/>
                                            <TextField label="Role" name="role" type="text"/>
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
                    <TableContainer>
                        <Table size='sm' variant="striped" colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th textAlign="center">ID</Th>
                                    <Th textAlign="center">Name</Th>
                                    <Th textAlign="center">Email</Th>
                                    <Th textAlign="center">Role</Th>
                                    <Th textAlign="center">Edit</Th>
                                    <Th textAlign="center">Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data?.Customers?.map((a) => {
                                        return (
                                            <Tr key={a.ID}>
                                                <Td textAlign="center">{a.ID}</Td>
                                                <Td textAlign="center">{a.Name}</Td>
                                                <Td textAlign="center">{a.Email}</Td>
                                                <Td textAlign="center">{a.Role}</Td>
                                                <Td textAlign="center">{
                                                    <>
                                                        <Button
                                                            colorScheme='blue'
                                                            variant='outline'
                                                            onClick={() => handleOpenModal(a)}
                                                        >Edit
                                                        </Button>
                                                    </>
                                                }</Td>
                                                <Td textAlign="center">{
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <Button colorScheme='red' variant='outline'
                                                                    size='sm'>Delete</Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <PopoverArrow/>
                                                            <PopoverCloseButton/>
                                                            <PopoverHeader>Confirmation!</PopoverHeader>
                                                            <PopoverBody>Are you sure you want to delete this
                                                                customer?</PopoverBody>
                                                            <PopoverFooter display='flex' justifyContent='center'>
                                                                <ButtonGroup size='sm'>
                                                                    <Button colorScheme='red'
                                                                            onClick={() => handleDelete(a.ID)}>Confirm
                                                                        Delete</Button>
                                                                </ButtonGroup>
                                                            </PopoverFooter>
                                                        </PopoverContent>
                                                    </Popover>
                                                }
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
}

export default CustomersTable;
