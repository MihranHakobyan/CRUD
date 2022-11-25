import React, {useState, useEffect} from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {NavLink} from 'react-router-dom';


const Home = () => {

    const [getUserData, setUserData] = useState([]);
    const getData = async (e) => {

        const res = await fetch('http://localhost:5000/account/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if (res.status === 200) {
            setUserData(data);
        } else {
            console.log(data.message);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const deleteUser = async (id) => {

        const res2 = await fetch(`http://localhost:5000/account/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const deleteData = await res2.json();

        if (res2.status === 200) {
            alert('accaunt deleted');
        } else {
            console.log(res2.message);
        }
        window.location.reload(true);
    };
    return (
        <div className="mt-5">
            <div className="container">
                <div className="add_btn mt-2 mb-2">
                    <NavLink to="/register" className="btn btn-primary">Add Data</NavLink>
                </div>
                <table className="table">
                    <thead>
                    <tr className="table-dark">
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Created On</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        getUserData.map((element, id) => {
                            return (
                                <>
                                <tr>
                                    <th scope="row">{element._id}</th>
                                    <td>{element.name}</td>
                                    <td>{element.owner}</td>
                                    <td>{element.createdAt}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`${element._id}`}>
                                            <button className="btn btn-success"><RemoveRedEyeIcon/></button>
                                        </NavLink>
                                        <NavLink to={`/edit/${element._id}`}>
                                        <button className="btn btn-primary"><CreateIcon/></button></NavLink>
                                    <button className="btn btn-danger" onClick={() => deleteUser(element._id)}>
                                        <DeleteOutlineIcon/></button>
                                </td>
                                </tr>
                        </>
                        )
                            ;
                        })
                    }


                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Home;