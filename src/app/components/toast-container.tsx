'use client';

import { Slide, ToastContainer as ToastifyContainer } from 'react-toastify';

export default function ToastContainer() {
    return <ToastifyContainer theme="dark"
        toastClassName="border border-gray-700 !bg-gray-800"
        bodyClassName="bg-gray-800"
        progressClassName="!bg-indigo-500"
        position="top-right"
        transition={Slide}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        closeButton={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />;
}
