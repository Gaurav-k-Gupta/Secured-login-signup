import { toast } from "react-toastify";

export const handleSuccess = (msg) =>{
    toast.success(msg,{
        position:"top-right"
    })
}

export const handleEroor = (msg) =>{
    toast.error(msg,{
        position:"top-right"
    })
}