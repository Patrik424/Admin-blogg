import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewUser(){

const [formData,setFormData] = useState({
    userName:"",
    firstName:"",
    lastName:"",
    password:"",
})

const navigate = useNavigate()

const handleSubmit = (e) =>{
    e.preventDefault()

    fetch('http://localhost:7070/api/newuser', {
        method: "POST",
        headers:{
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setFormData({
            userName:"",
            firstName:"",
            lastName:"",
            password:"",
        })
        navigate("/user")
    }).catch((err) => {
        console.error(err)
    })
}

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
}

return (
    <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input className="flex justify-center border border-black" type="text" name="userName" value={formData.userName} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Firstname:
                <input className="flex justify-center border border-black" type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Lastname:
                <input className="flex justify-center border border-black" type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Password:
                <input className="flex justify-center border border-black" type="text" name="password" value={formData.password} onChange={handleChange}/>
            </label>
            <br/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" type="submit">New User</button>
        </form>
    </div>
)

}