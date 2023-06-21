
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCategory(){
    const { categoryId } = useParams()
    const navigate = useNavigate()
    const [editData, setEditData] = useState({name:""})

    useEffect(() => {
        fetch(`http://localhost:7070/api/post/` + categoryId)
        .then(res => res.json())
        .then(data => {
            setEditData(data)
        })
        .catch(err => {
            console.error(err)
        })
    },[categoryId])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:7070/api/editcategory/${categoryId}`, {
            method: "PUT",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate("/category")
            setEditData({name:""})
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleChange = (e) => {
        const {name,value}= e.target;
        setEditData(beforeData => ({
            ...beforeData,
            [name]: value,
        }))
    }


    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input className="flex justify-center border border-black" name="name" value={editData.name} onChange={handleChange}/>
                </label>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" type="submit">Update</button>
            </form>
        </div>
    )

}