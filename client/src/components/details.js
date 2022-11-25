import React, {useState, useEffect} from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink, useParams} from 'react-router-dom';

const Details = () => {

    const [getUserData, setUserData] = useState([]);
    const {id} = useParams('');
    const getData = async () => {

        const res = await fetch(`http://localhost:5000/account/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        const data = await res.json();
        if (res.status === 200) {
            setUserData(data);
        } else {
            console.log('error');
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
        await res2.json();
        if (res2.status === 200) {
            alert('accaunt deleted');
        } else {
            console.log(res2.message);
        }

    };
    return (<div className="container mt-3">
        <NavLink to="/accaunt" className="mb-5">Home</NavLink>

        <table className="table">
            <thead>
            <tr className="table-dark">
                <td scope="col">Id</td>
                <th scope="col">Name</th>
                <th scope="col">Owner</th>
                <th scope="col">Created On</th>
                <th scope="col">Updated On</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">{getUserData._id}</th>
                <td>{getUserData.name}</td>
                <td>{getUserData.owner}</td>
                <td>{getUserData.createdAt}</td>
                <td>{getUserData.updatedAt}</td>
                <td className="d-flex justify-content-between">
                    <NavLink to="/accaunt">
                        <button className="btn btn-danger" onClick={() => deleteUser(getUserData._id)}><DeleteIcon/>
                        </button>
                    </NavLink>
                    <NavLink to={`/edit/${id}`}>
                        <button className="btn btn-primary"><CreateIcon/></button>
                    </NavLink>
                </td>
            </tr>

            </tbody>
        </table>
    </div>);
};
export default Details;