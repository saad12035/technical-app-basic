import React, {useState} from 'react';
import {
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    PopoverFooter,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter, useDisclosure
} from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'
import {useMutation} from "@apollo/client";
import {DELETE_CUSTOMERS,UPDATE_CUSTOMERS} from '../graphql-api-calls';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {TextField} from "../../textfield/textfield";


function CustomersTable(props) {
    const [counsellorSlots, setCounsellorSlots] = useState([]);
    const [check, setCheck] = useState(false);
    const [MyMutation] = useMutation(DELETE_CUSTOMERS);
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [placeholderName, setPlaceholderName] = useState('');
    const [placeholderRole, setPlaceholderRole] = useState('');
    const [placeholderEmail, setPlaceholderEmail] = useState('');
    const [ID, setId] = useState('');
    const [CustomersUpdateMutation] = useMutation(UPDATE_CUSTOMERS);



    const handleOpenModal = (id) => {
        setPlaceholderName(id.name);
        setPlaceholderEmail(id.email);
        setPlaceholderRole(id.role);
        setId(id.id);
        onOpen();
    };
    function handleDelete(e){
        MyMutation({
            variables: {
                ID:e,
            }
        }).then((res)=>{
            window.location.reload(false);
        })
    }



    if (Object.keys(props).length !== 0) {
        if(!check){
            const data = Object.keys(props).map((index,ID, Name, Email, Role) => {
                return {
                    id: props[index].ID,
                    name: props[index].Name,
                    email: props[index].Email,
                    role: props[index].Role
                }
            });
            setCheck(true)
            setCounsellorSlots(data)
        }

    }

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
    if(counsellorSlots.length!==0){
        return(
            <>
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
                                CustomersUpdateMutation({
                                    variables: {
                                        ID:ID,
                                        Email:values.email,
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
                                        <TextField label="Full Name" name="name" type="text" a={placeholderName} />
                                        <TextField label="Email" name="email" type="email" a={placeholderEmail}/>
                                        <TextField label="Role" name="role" type="text" a={placeholderRole}/>
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
                    <Table size='sm' variant="striped" colorScheme='teal'  >
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
                                counsellorSlots.map((a)=>{
                                    return(
                                        <Tr>
                                            <Td textAlign="center">{a.id}</Td>
                                            <Td textAlign="center">{a.name}</Td>
                                            <Td textAlign="center">{a.email}</Td>
                                            <Td textAlign="center">{a.role}</Td>
                                            <Td textAlign="center">{
                                                <>
                                                    <Button
                                                        colorScheme='blue'
                                                        variant='outline'
                                                        onClick={()=>handleOpenModal(a)}
                                                    >Edit
                                                    </Button>
                                                </>
                                            }</Td>
                                            <Td textAlign="center">{
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button colorScheme='red' variant='outline' size='sm'>Delete</Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverHeader>Confirmation!</PopoverHeader>
                                                        <PopoverBody>Are you sure you want to delete this customer?</PopoverBody>
                                                        <PopoverFooter display='flex' justifyContent='center'>
                                                            <ButtonGroup size='sm'>
                                                                <Button colorScheme='red' onClick={() => handleDelete(a.id)}>Confirm Delete</Button>
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
        );
    }
    else {
        return(
            <>
                <h1>Fetching Data ...</h1>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                    style={{marginLeft:400,marginBottom:20}}
                />
            </>
        );
    }
}

export default CustomersTable;