import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleEroor, handleSuccess } from "./toaster";

function Home() {
    const [userName, setuserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [products,setProducts] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        setuserName(localStorage.getItem('loggedInUserName'));
        setuserEmail(localStorage.getItem('loggedInUserEmail'));
        console.log('Hii');
    }, [])


    const handleLogout = (e) => {
        localStorage.removeItem('loggedInUserName')
        localStorage.removeItem('loggedInUserEmail')
        localStorage.removeItem('token')
        handleSuccess('Successfully logged out');
        setTimeout(() => {
            navigate('/');
        }, 1400)
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const res = await response.json();
            console.log(res);
            setProducts(res);
        } catch (err) {
            handleEroor(err);
        }
    }

    useEffect(() => {
        console.log('clicked');
        fetchProducts();
    }, [])

    return (
        <>
            <div className="flex flex-col gap-5 m-auto p-5" style={{ width: "30vw", marginTop: "50px", border: "2px solid black" }}>
                <h1 className="text-large fw-800">Welcome, {userName}</h1>
                <h2>Your email is {userEmail}</h2>

                <button
                    type="submit"
                    className="p-1 bg-gradient-to-r from-[#ec5990] to-[#c64c7a] text-white py-2 rounded-md hover:from-[#c64c7a] hover:to-[#ec5990] transition-all duration-300 transform hover:scale-105"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="inline-block mr-2" />
                    Log out
                </button>
                <div className="flex flex-col gap-2">products:-
                    {
                        products && products.map((item,index)=>(
                            <span key={index}>
                                {item.name} : {item.price}
                            </span>
                        ))
                    }
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Home;