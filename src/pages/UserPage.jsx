import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage(){
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res =await fetch("http://localhost:7070/api/users", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                const data = await res.json()
                setData(data)
            }catch(err){
                console.error(err)
            }
        }
        fetchData()
    },[])

    const deleteUser = (userId) => {
        fetch(`http://localhost:7070/api/deleteusers/${userId}`, {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        .then((res) =>  {
            if (res.ok){
                setData(data.filter((user) => user.userId !== userId))
            } else {
                throw new Error("ERROR with Delete")
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const editUse = (e,id) => {
        e.preventDefault()
        navigate(`/editUser/${id}`)
    }

    return (
        <div className="flex flex-row justify-center">
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={() => navigate("/newUser")}>New User</button>
            </div>
            <table className="border-collapse border border-slate-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-slate-300">Username</th>
                        <th className="border border-slate-300">Firstname</th>
                        <th className="border border-slate-300">Lastname</th>
                        <th className="border border-slate-300">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.userId} className="bg-slate-100">
                            <td className="border border-slate-300">{user.userName}</td>
                            <td className="border border-slate-300">{user.firstName}</td>
                            <td className="border border-slate-300">{user.lastName}</td>
                            <td className="border border-slate-300">{user.password}</td>
                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={(e) => editUse(e,user.userId)}>Update</button></td>
                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={() => deleteUser(user.userId)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}