import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function UpdatePost(){
    const { postId } = useParams()
    const navigate = useNavigate()
    const [editData, setEditData] = useState({
        title:"",
        content:"",
    })

    useEffect(() => {
        fetch(`http://localhost:7070/api/post/` + postId)
        .then(res => res.json())
        .then(data => {
            setEditData(data)
        })
        .catch(err => console.error(err))
    }, [postId])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:7070/api/editpost/${postId}`, {
            method: "PUT",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body:JSON.stringify(editData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            navigate("/post")
            setEditData({
                title:"",
                content:"",
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setEditData(beforeData => ({
            ...beforeData,
            [name]: value,
        }))
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input className="flex justify-center border border-black" type="text" name="title" value={editData.title} onChange={handleChange} />
                </label>
                <br/>
                <label>
                    Content:
                    <input className="flex justify-center border border-black" type="text" name="content" value={editData.content} onChange={handleChange}/>
                </label>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" type="submit">Update Post</button>
            </form>
        </div>
    )
}