import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function PostPage(){
    const [data, setData] =useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:7070/api/post", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                const data = await res.json()
                setData(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    },[])

    const deletePost = (postId) =>{
        fetch(`http://localhost:7070/api/deletepost/${postId}`, {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            if(res.ok){
                setData(data.filter((post) => post.postId !== postId))
            } else {
                throw new Error("WRONG I TOLD YOU THAT")
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const editPosts = (e,id) => {
        e.preventDefault();
        navigate(`/editPost/${id}`)
    }


    return (
        <div>
            {data.map((post) => (
                <div className="flex justify-center items-center py-4 ">
                    <div className="space-y-4">
                        <div key={post.postId} className="box-content h-44 w-64 p-4 border-4 bg-slate-500">
                            <h3 className="flex justify-center font-bold">{post.title}</h3>
                            <p className="flex justify-center">{post.content}</p>
                            <p className="flex justify-center">{post.postDate}</p>
                            <p  className="flex justify-center space-x-2"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={(e) => editPosts(e, post.postId)}>Update</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={() => deletePost(post.postId)}>Delete</button></p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={() => navigate("/newPost")}>Add</button>
            </div>
        </div>
    )
        }