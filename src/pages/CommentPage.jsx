import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommentPage(){
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await fetch('http://localhost:7070/api/comment', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                const data = await res.json()
                setData(data)
            }catch(err) {
                console.error(err)
            }
        }
        fetchData();
    },[])

    const deleteComment = (commentId) => {
        fetch(`http://localhost:7070/api/deletecomment/${commentId}`, {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            if (res.ok){
                setData(data.filter(( comment) => comment.commentId !== commentId))
            } else{
                throw new Error("Error something went wrong")
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    return (
        <div className="flex flex-row justify-center">
            <table className="border-collapse border-slate-400">
                <thead className="bg-slate-400">
                    <tr>
                        <th className="border border-slate-300">Comment</th>
                        <th className="border border-slate-300">Content</th>
                        <th className="border border-slate-300">User</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-200">
                    {data.map((comment) => (
                        <tr key={comment.commentId}>
                            <td className="border border-slate-300">{comment.commentId}</td>
                            <td className="border border-slate-300">{comment.content}</td>
                            <td className="border border-slate-300">{comment.user.userId}</td>
                            <td className="border border-slate-300"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"onClick={() => deleteComment(comment.commentId)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )



}