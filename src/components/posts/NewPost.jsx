import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewPost(){
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        postDate: "",
        "author":{
            "authorId": sessionStorage.getItem("userid")
        },
        category: "",
    })

    const navigate = useNavigate()
    const [cate, setCate] = useState([])

    useEffect(() => {
        fetch("http://localhost:7070/api/category", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setCate(data)
        })
        .catch((err) => {
            console.error(err)
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()

        const {title, content, postDate,category} = formData

        const newPostData = {
            title,
            content,
            postDate: new Date(),
            "author":{
                "authorId": sessionStorage.getItem("userid")
            },
            category: { categoryId: parseInt(category) },
        }

        fetch("http://localhost:7070/api/newpost", {
            method: "POST",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPostData)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setFormData({
                title: "",
                content: "",
                postDate: "",
                "author":{
                    "authorId": sessionStorage.getItem("userid")
                },
                category: "",
            })
            navigate("/post")
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "category" ? Number(value) : value,
        }))
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
                <label className="font-bold">
                    Title:
                    <input className="flex justify-center border border-black"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    />
                </label>
                <br/>
                <label className="font-bold">
                    Content:
                    <input className="flex justify-center border border-black"
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    />
                </label>
                <br/>
                <label className="font-bold">
                    Category:
                    <select className="px-1 py-0.5 flex justify-center border border-black"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}>
                        <option value="">Select category</option>
                        {cate.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">Add</button>
            </form>
        </div>
    )



}