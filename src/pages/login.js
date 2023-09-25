import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    const creds = localStorage.getItem("token");
    if (creds) {
      router.push("/dashboard");
    }
  }, [router.query]);
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } 
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: Email,
      password: Password,
    };

    let a = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let fetchData = await a.json();

    if (fetchData.status === "success") {
      toast.success(fetchData.message);
      localStorage.setItem("token", fetchData.token);
      router.push("/token");
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
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Login.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                onChange={handleChange}
                size="lg"
                name="email"
                label="Email"
              />
              <Input
                onChange={handleChange}
                type="password"
                name="password"
                size="lg"
                label="Password"
              />
            </div>
            <Button onClick={handleSubmit} className="mt-6" fullWidth>
              LogIn
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <a
                onClick={() => router.push("/")}
                className="font-medium text-gray-900"
              >
                Sign Up
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}
