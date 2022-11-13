import React from 'react';
import { useState } from 'react'
import axios from 'axios';

const useGetUsers = () => {

    const [data, setdata] = useState([]);

     //funcion que sirve para mandar llamar datos de Api
     const getUsers = () => {
        axios.get(`https://users-crud1.herokuapp.com/users/`)
        .then( res => setdata(res.data))
    };
    return {getUsers,data};
};

export default useGetUsers;