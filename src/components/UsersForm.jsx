import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAlert from '../hooks/useAlert';
import Swal from "sweetalert2";
import axios from 'axios';

const UsersForm = ({ userSelected, getUsers}) => {

    const { register, handleSubmit, reset } = useForm(); 
    const {confirmation,errorAlert} = useAlert()


    useEffect(() => {
        if(userSelected){
            reset(userSelected)
        }
    },[userSelected]);


    const submit = (data) =>{
        console.log(data)
        if(userSelected){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
              
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    //////////////
                    axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                    .then(() => getUsers())
                    .catch(error => {
                        errorAlert()
                        console.log('ERROR',error.response?.data)
                    })

                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            });       
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
            <h2>New User</h2>
            <h2><i className="fa-solid fa-user-pen"></i></h2>
            <div className='ulLi'>
                <div>
                    <i className="fa-solid fa-circle-user"></i> <label htmlFor="first_name"/>
                    <br/>
                    <input 
                        type="text"
                        id='first_name'
                        {...register('first_name')}
                        placeholder='First Name'
                    />
                </div>
                <div>
                    <label htmlFor="last_name"><i className="fa-regular fa-circle-user"></i> </label>
                    <br/>
                    <input 
                        type="text" 
                        id='last_name'   
                        {...register('last_name')} 
                        placeholder='Last Name'
                    />
                </div>
                <div>
                    <label htmlFor="email"><i className="fa-solid fa-square-envelope"></i> </label>
                    <br/>
                    <input 
                        type="email" 
                        id='email'
                        {...register('email')}
                        placeholder='Email'
                    />
                </div>
                <div>
                    <label htmlFor="password"><i class="fa-solid fa-lock"></i> </label>
                    <br/>
                    <input 
                        type="password"
                        id='password'
                        {...register('password')}
                        placeholder='Password'
                    />
                </div>
                <div>
                    <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i> </label>
                    <br/>
                    <input 
                        type="date"
                        id='birthday'   
                        {...register('birthday')}
                    />
                </div>
            </div>
            <button>Submit</button>
        </form>
    );
};

export default UsersForm;