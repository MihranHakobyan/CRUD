import React, {useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';

const Edit = () => {
    const [inpval, setINP] = useState({
        name: '',
        owner: ''
    });

    const {id} = useParams('');

    const setData = (e) => {
        const {name, value} = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            };
        });
    };


    const updateUser = async (id) => {
        const {name, owner} = inpval;
        const res2 = await fetch(`http://localhost:5000/account/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, owner
            })
        });
        await res2.json();
        if (res2.status === 200) {
            alert('accaunt updated');
        } else {
            console.log(res2.message);
        }

    };
    return (

        <div className="container">
            <NavLink to="/accaunt">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" value={inpval.name} name="name" onChange={setData} className="form-control"
                               id="exampleInputName"/>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputOwner" className="form-label">Owner</label>
                        <input type="text" value={inpval.owner} name="owner" onChange={setData} className="form-control"
                               id="exampleInputOwner"/>
                    </div>
                    <NavLink to="/accaunt">
                        <button type="submit" onClick={() => updateUser(id)} className="btn btn-primary">Submit</button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};
export default Edit;