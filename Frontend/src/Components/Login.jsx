import { ToastContainer } from "react-toastify"
import { FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleEroor , handleSuccess } from "./toaster";
import { useState } from "react";
import '../App.css';

function Login() {

    const [formInfo,setformInfo] = useState({
        email : "",
        password : ""
    })
    const navigateTo = useNavigate();

    const handleChange = (e)=>{
        // console.log(e.target.name , e.target.value);
        formInfo[e.target.name] = e.target.value;
        console.log(formInfo);
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        const { email , password} = formInfo;
        if(!email || !password){
            return handleEroor("All fields are mandatory!");
        }
        try{
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formInfo)
            })
            const result = await response.json();
            const {success , message , error , name , jwToken , email} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwToken);
                localStorage.setItem('loggedInUserName',name);
                localStorage.setItem('loggedInUserEmail',email);
                setTimeout(()=>{
                    navigateTo('/home');
                },2000)
            } 
            else if(error){
                const details = error?.details[0].message;
                handleEroor(details);
            }
            else{
                handleEroor(message);
            }
            console.log(result);
        } catch(err){
            handleEroor(err);
        }
    }

    return (
        <><div className="flex justify-center align-center my-8 bg-[#F7A9A8]">
            <div className="flex flex-col p-8 bg-[#EAD9D6]" style={{ width: "40vw", border: "2px solid black" }}>
                <div className="mx-auto text-l" style={{ fontSize: "25px" }}><h1>Login</h1></div>
                <form action="" className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="block mb-2">Username</label>
                        <input className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] " name="email" type="email" placeholder="Enter you email.." autoFocus onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col" style={{ marginBottom: "35px" }}>
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] " name="password" type="password" placeholder="Enter you password.." onChange={handleChange}/>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#ec5990] to-[#c64c7a] text-white py-2 rounded-md hover:from-[#c64c7a] hover:to-[#ec5990] transition-all duration-300 transform hover:scale-105"
                        onClick={handleLogin}
                    >
                        <FaSignInAlt className="inline-block mr-2" />
                        Login
                    </button>
                </form>

                <p className="text-center text-black mt-6 flex gap-2 justify-center">
                    Don't have an account?
                    <Link
                        to={"/signup"}
                        className="text-[#ec5990] hover:underline font-bold"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
            <ToastContainer/>
        </div>
        </>
    )
}

export default Login