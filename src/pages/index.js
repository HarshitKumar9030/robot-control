import Image from "next/image";
import { Inter } from "next/font/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const creds = localStorage.getItem("token");
    if (creds) {
      router.push("/dashboard");
    }
  }, [router.query]);


  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState(''); 

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: Name,
      email: Email,
      password: Password,
    };

    let a = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    let fetchData = await a.json();
    
    if (fetchData.status === "success") {
      toast.success(fetchData.message);
      setEmail("");
      setPassword("");
      setName("");

      localStorage.setItem("token", fetchData.token);

      setTimeout(() => {
      router.push("/token");
      }, 3000);
    } else {
      toast.error(fetchData.message);
    }
  };

    
  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
    />
      <div className="card flex justify-center items-center bg-white h-screen">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input onChange={handleChange} name="name" size="lg" label="Name" />
              <Input onChange={handleChange} name="email" size="lg" label="Email" />
              <Input onChange={handleChange} name="password" type="password" size="lg" label="Password" />
            </div>
            <Button onClick={handleSubmit} className="mt-6" fullWidth>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a onClick={()=> router.push('/login')} className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}
