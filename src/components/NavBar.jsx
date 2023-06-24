import { Link } from "react-router-dom";
import LoginService from "../config/KeyCloakConfig";

export default function NavBar(){
    return (
        <nav className="bg-teal-300 text-stone-600 flex justify-between">
            <Link to="/" className="font-bold">
                Start
            </Link>
            <ul className="flex m-0 p-0 list-none gap-x-4">
                <li>
                    <Link to="/post">Post</Link>
                </li>
                <li>
                    <Link to="/comment">Comment</Link>
                </li>
                <li>
                    <Link to="/user">User</Link>
                </li>
                <li>
                    <Link to="/category">Category</Link>
                </li>
                <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={LoginService.doLogout}>Logout</button>
                </div>
            </ul>
        </nav>
    )
}

