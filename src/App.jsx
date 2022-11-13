import { useEffect, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import useGetUsers from './hooks/useGetUsers';
import axios from 'axios';

function App() {

  const [userSelected, setUserSelected] = useState(null);
  //const [ users, setdata] = useState([]);

  const {data: users,getUsers} = useGetUsers();
  

    //funcion que sirve para mandar llamar datos de Api
  // const getUsers = () => {
  //   axios.get(`https://users-crud1.herokuapp.com/users/`)
  //   .then( res => setdata(res.data))
  // };


    //mandar llamaar API
  useEffect(() => {
    getUsers()
  },[]);

  //funcion para detectar y guardar un usuario completo seleccionado
  const selecUsers = (user) => {
    setUserSelected(user)
  };

    

  console.log(users)
  return (
    <div className="App">
      <UsersForm 
        userSelected={userSelected} 
        getUsers={getUsers}
      />
      <UsersList 
        users={users} 
        selecUsers={selecUsers} 
        getUsers={getUsers}
        
      />
    </div>
  )
}

export default App
