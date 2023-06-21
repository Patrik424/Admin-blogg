
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateUser(){
    const { userId } = useParams()
    const navigate = useNavigate()
    const [editData,setEditData] = useState({
        userName:"",
        firstName:"",
        lastName:"",
        password:"",
    })

    useEffect(() => {
        fetch(`http://localhost:7070/api/users/` + userId)
        .then(res => res.json())
        .then(data => {
            setEditData(data)
        }).catch(err => console.error(err))
    },[userId])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:7070/api/editusers/${userId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            navigate("/user")
            setEditData({
                userName:"",
                firstName:"",
                lastName:"",
                password:"",
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditData(beforeData => ({
            ...beforeData,
            [name]: value,
        }))
    }

    return(
        <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input className="flex justify-center border border-black" name="userName" value={editData.userName} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Firstname:
                    <input className="flex justify-center border border-black" name="firstName" value={editData.firstName} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Lastname:
                    <input className="flex justify-center border border-black" name="lastName" value={editData.lastName} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input className="flex justify-center border border-black" name="password" value={editData.password} onChange={handleChange}/>
                </label>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" type="submit">Update User</button>
            </form>
        </div>
    )
}