import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryPage(){
    const [data, setData]= useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await fetch('http://localhost:7070/api/category', {
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
    }, [])

    const deleteCate = (categoryId) => {
        fetch(`http://localhost:7070/api/deletecategory/${categoryId}`, {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            if (res.ok){
                setData(data.filter((category) => category.categoryId !== categoryId))
            } else{
                throw new Error("NO!! Not again")
            }
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const editCate = (e,id) => {
        e.preventDefault()
        navigate(`/editCategory/${id}`)
    }


    return (
        <div className="flex flex-row justify-center">
            <table className="border-collapse border border-slate-400">
                <thead className="bg-slate-300 ">
                    <tr>
                        <th className="border border-slate-300">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((category) => (
                        <tr key={category.categoryId} className="bg-slate-100">
                            <td className="border border-slate-300">{category.name}</td>
                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={(e) => editCate(e, category.categoryId)}>Update</button></td>
                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={() => deleteCate(category.categoryId)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded" onClick={() => navigate("/newCategory")}>Add</button>
            </div>
        </div>
    )


}