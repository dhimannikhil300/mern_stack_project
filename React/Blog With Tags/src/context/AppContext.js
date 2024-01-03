import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
//setp 1
export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    async function fetchBlogPosts(page=1){
        console.log(loading);
        setLoading(true);
        console.log(loading);

        let url = `${baseUrl}?page=${page}`;
        try{
            const result = await fetch(url);
            const data = await result.json(); 
            // console.log(data);

            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        catch(error){
            console.log("Error a gya fetch me");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        console.log(loading);
        setLoading(false);
        console.log(loading);
    }

    function handlePageChange(page){
        setPage(page);
        fetchBlogPosts(page);
    }

    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    //setp:2
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}