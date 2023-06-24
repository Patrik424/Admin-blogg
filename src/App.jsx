import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import StartPage from "./pages/StartPage";
import PostPage from "./pages/PostPage";
import CommentPage from "./pages/CommentPage";
import UserPage from "./pages/UserPage";
import CategoryPage from "./pages/CategoryPage";
import { NewPost } from "./components/posts/NewPost";
import { UpdatePost } from "./components/posts/UpdatePost";
import { NewCategory } from "./components/category/NewCategory";
import UpdateCategory from "./components/category/UpdateCategory";
import { NewUser } from "./components/user/NewUser";
import { UpdateUser } from "./components/user/UpdateUser";

export default function App(){
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<StartPage />} />
        <Route path="/" element={<StartPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/editPost/:postId" element={<UpdatePost />} /> 
        <Route path="/comment" element={<CommentPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/editUser/:userId" element={<UpdateUser />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/newCategory" element={<NewCategory />} />
        <Route path="/editCategory/:categoryId" element={<UpdateCategory />} />
      </Routes>
    </>
  )
}

