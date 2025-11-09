import React from 'react';
import error404 from '/error-404.png'

const Error404 = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen w-11/12 mx-auto'>
            <h1 className='text-3xl md:text-5xl text-[#9f62f2] font-bold text-center mb-10'>Page Not Found!!!</h1>
            <img src={error404} alt="" />
        </div>
    );
};

export default Error404;