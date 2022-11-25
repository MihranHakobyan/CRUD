import React, { useState} from 'react';
import {NavLink} from 'react-router-dom';

const Register = () => {

    const [inpval, setINP] = useState({
        name: '',
        owner: ''
    });

    const setData = (e) => {
        const {name, value} = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            };
        });
    };

    const addInpData = async (e) => {
        e.preventDefault();

        const {name, owner} = inpval;
        const res = await fetch('http://localhost:5000/account/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name, owner
            })
        });
        const data = await res.json();
        if (res.status === 201) {
            alert('data added');
        } else {
            alert(data.message);
        }
        window.location.reload(true);

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
                    <button type="submit" onClick={addInpData} className="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>
    );
};

export default Register;