import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewCategory(){
    const [formData, setFormData]= useState({name: ""})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:7070/api/newcategory', {
            method: "POST",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            setFormData({
                name:""
            })
            navigate("/category")
        }).catch((err) => {
            console.error(err)
        })
    }


    const handleChange = (e) => {
        const {name,value}= e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input className="flex justify-center border border-black" type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" type="submit">New Category</button>
            </form>
        </div>
    )


}