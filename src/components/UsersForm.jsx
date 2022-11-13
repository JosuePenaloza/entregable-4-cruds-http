import axios, { Axios } from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAlert from '../hooks/useAlert';
//import useGetUsers from '../hooks/useGetUsers';

const UsersForm = ({ userSelected, getUsers}) => {

    const { register, handleSubmit, reset } = useForm(); 
    const {confirmation,toUpdate,errorAlert} = useAlert()
    //const {getUsers} = useGetUsers();

    useEffect(() => {
        if(userSelected){
            reset(userSelected)
        }
    },[userSelected]);


    const submit = (data) =>{
        console.log(data)
        if(userSelected){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
            .then(() => getUsers())
            .catch(error => {
                errorAlert()
                console.log('ERROR',error.response?.data)
            } )
        }else{
            axios.post(`https://users-crud1.herokuapp.com/users/`,data)
            .then(() =>{ 
                confirmation()
                getUsers()
            })
            .catch(error => {
                errorAlert()
                console.log('ERROR',error.response?.data)
            } )
        }
        
        reset(
            {
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                birthday: ""
            }
        )     

    }

    return (
        <form className='usersFrom' onSubmit={handleSubmit(submit)} >
            <h2>usersfrom</h2>
            <div>
                <label htmlFor="first_name">First Name</label>
                <input 
                    type="text"
                    id='first_name'
                    {...register('first_name')}
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text" 
                    id='last_name'   
                    {...register('last_name')} 
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id='email'
                    {...register('email')}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id='password'
                    {...register('password')}
                />
            </div>
            <div>
                <label htmlFor="birthday">Birthday</label>
                <input 
                    type="date"
                    id='birthday'   
                    {...register('birthday')}
                />
            </div>
            <button>Submit</button>
        </form>
    );
};

export default UsersForm;