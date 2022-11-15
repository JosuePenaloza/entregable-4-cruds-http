import axios from "axios";
import Swal from "sweetalert2";
import useGetUsers from "../hooks/useGetUsers";

const UsersList = ({users, selecUsers,getUsers}) => {

    //funcion para seleccionar el usuario a borrar
  const deleteUser = (u) => {
      
    //alerta donde te pregunta si deseas borrar o no
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
        axios.delete(`https://users-crud1.herokuapp.com/users/${u.id}/`)
        .then(() => getUsers())
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  } 
    
  return (
    <div className="userList">
      {
        users.map(user => (
          <div className="user" key={user.id}>
            <ul key={user.id}>
              <li>{user.first_name}</li>
              <li>{user.last_name}</li>
              <li>{user.email}</li>
              <li>{user.birthday}</li>
              <li>{user.password}</li>
              <button  onClick={() => selecUsers(user)} >Select</button>
              <button onClick={() => deleteUser(user)} >Delet</button>
            </ul>
          </div>
        ))
      }    
    </div>
  );
};

export default UsersList;