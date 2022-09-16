import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
    username: string;
    password: string;
    email: string;
    errors?:string;
    
}


export default function Forms(){

        const {register, watch, handleSubmit, formState:{errors}, setValue, setError, reset} = useForm<LoginForm>(
            {mode: "onChange"}
        );
        
        const onValid = (data:LoginForm) => {
            console.log("Im valid bby")
            setError("errors",{message:"Backed is offlined"})
            reset();
        };

        const onInvalid = (errors:FieldErrors) => {
            console.log(errors);
        }

        console.log(errors);
        console.log(watch("email"))
        setValue("username", "hello")

    return (

        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <input {...register("username",{
                required: "Username is required",
            })} type="text" placeholder="Username"></input>
            
            <input {...register("email",{
                required:"Email is required",
                validate: {
                    notGmail: (value) => !value.includes("@gmail.com") || "Gmail is not allowed",
                },
            })} type="email" placeholder="Email" className={`${Boolean(errors.email?.message) ? "border-red-500":""}`}></input>
            
            {errors.email?.message}
            
            <input {...register("password",{
                required:"Password is required",
            })} type="password" placeholder="Password"></input>
            
            <input type="submit" value="Create Account"></input>

        </form>


    )


}
