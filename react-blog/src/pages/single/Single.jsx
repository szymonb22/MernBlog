import React from 'react';
import Sidebar from '../../componets/sidebar/Sidebar';
import SinglePost from '../../componets/singlePost/SinglePost';
import './single.css';
const Single = () => {
    return (
        <div className='single'>
           <SinglePost/>
            <Sidebar/>
        </div>
    );
}

export default Single;
