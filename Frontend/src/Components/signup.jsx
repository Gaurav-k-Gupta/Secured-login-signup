import { ToastContainer } from "react-toastify"
import { FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../App.css';
import { handleEroor, handleSuccess } from "./toaster";

function Signup() {
    const [formInfo,setformInfo] = useState({
        name: "",
        email : "",
        password : ""
    })
    const navigateTo = useNavigate();

    const handleChange = (e)=>{
        // console.log(e.target.name , e.target.value);
        formInfo[e.target.name] = e.target.value;
        console.log(formInfo);
    }

    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name , email , password} = formInfo;
        if(!name || !email || !password){
            return handleEroor("All fields are mandatory!");
        }
        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formInfo)
            })
            const result = await response.json();
            const {success , message , error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigateTo('/');
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
            <div className="flex flex-col p-8 bg-[#EAD9D6]" style={{width:"40vw" , border:"2px solid black"}}>
                <div className="mx-auto text-l" style={{fontSize:"25px"}}><h1>Sign up</h1></div>
                <form action="" className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] " name="name" type="name" placeholder="Enter you name.." autoFocus  onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] " name="email" type="email" placeholder="Enter you email.." onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col" style={{marginBottom:"40px"}}>
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input className="w-full px-4 py-2 rounded-md bg-[#081229] text-white border border-gray-600 focus:outline-none focus:border-[#ec5990] " name="password" type="password" placeholder="Enter you password.." onChange={handleChange}/>
                    </div>
                    <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ec5990] to-[#c64c7a] text-white py-2 rounded-md hover:from-[#c64c7a] hover:to-[#ec5990] transition-all duration-300 transform hover:scale-105"
                  onClick={handleSignup}
                >
                  <FaUserPlus className="inline-block mr-2" />
                  Sign up
                </button>
                </form>
                <p className="text-center text-black mt-6 flex gap-2 justify-center">
                    Already have an account?
                    <Link
                        to={'/'}
                        className="text-[#ec5990] hover:underline font-bold"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer/>
        </div>
        </>
    )
}

export default Signup