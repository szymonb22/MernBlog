import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../componets/header/Header';
import Posts from '../../componets/posts/Posts';
import Sidebar from '../../componets/sidebar/Sidebar';
import './home.css';
const Home = () => {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts"+search);
            setPosts(res.data);
        }
        fetchPosts()
    }, [search])
    return (
        <>
            <Header />
            <div className='home'>
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>

    );
}

export default Home;
