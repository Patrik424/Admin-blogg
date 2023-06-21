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

// import React from "react";
// import { useKeycloak } from "@react-keycloak/web";

// const NavBar = () => {
//   const { keycloak } = useKeycloak();

//   return (
//     <div>
//       <div className="top-0 w-full flex flex-wrap">
//         <section className="x-auto">
//           <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
//             <div className="px-5 xl:px-12 py-6 flex w-full items-center">
//               <h1 className="text-3xl font-bold font-heading">
//                 Keycloak React AUTH.
//               </h1>
//               <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
//                 <li>
//                   <a className="hover:text-blue-800" href="/">
//                     Start
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:text-blue-800" href="/post">
//                     Post
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:text-blue-800" href="/category">
//                     Category
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:text-blue-800" href="/comment">
//                     Comment
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:text-blue-800" href="/user">
//                     User
//                   </a>
//                 </li>
//                 <li>
//                   <a className="hover:text-blue-800" href="/secured">
//                     Secured Page
//                   </a>
//                 </li>
//               </ul>
//               <div className="hidden xl:flex items-center space-x-5">
//                 <div className="hover:text-gray-200">
//                   {!keycloak.authenticated && (
//                     <button
//                       type="button"
//                       className="text-blue-800"
//                       onClick={() => keycloak.login()}
//                     >
//                       Login
//                     </button>
//                   )}
//                   {!!keycloak.authenticated && (
//                     <button
//                       type="button"
//                       className="text-blue-800"
//                       onClick={() => keycloak.logout()}
//                     >
//                       Logout ({keycloak.tokenParsed.preferred_username})
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default NavBar;