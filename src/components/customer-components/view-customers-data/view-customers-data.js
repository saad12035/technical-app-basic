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
    FormControl, FormLabel, Input, ModalFooter, useDisclosure
} from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'
import {useMutation} from "@apollo/client";
import {DELETE_CUSTOMERS,UPDATE_CUSTOMERS} from '../graphql-api-calls';


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
    const initialValues = { name: "", email: "", role: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
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

    const handleSubmit = event => {
        event.preventDefault();
        CustomersUpdateMutation({
            variables: {
                ID:ID,
                Email: formValues.email,
                Name: formValues.name,
                Role: formValues.role
            }
        }).then((res)=>{
            window.location.reload(false);
        })
    };


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

    if(counsellorSlots.length!==0){
        return(
            <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <form onSubmit={handleSubmit}>
                            <ModalHeader>Edit Customer</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='name'>Full Name</FormLabel>
                                    <Input
                                        id='name'
                                        name='name'
                                        type='text'
                                        placeholder={placeholderName}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='email'>Email address</FormLabel>
                                    <Input id='email'
                                           type='email'
                                           name='email'
                                           placeholder={placeholderEmail}
                                           onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='role'>Role</FormLabel>
                                    <Input id='role'
                                           type='text'
                                           name='role'
                                           placeholder={placeholderRole}
                                           onChange={handleChange}/>
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