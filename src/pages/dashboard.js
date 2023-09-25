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

    const [token, setToken] = useState("");
    const [data2, setData2] = useState([]);
  useEffect(() => {
    const creds = localStorage.getItem("token");
    setToken(creds);
    if (!creds) {
      router.push("/login");
    }
    let a = fetch("/api/stats?token=" + creds, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            // get data from the object
             setData2(Object.values(data)[2]);
            console.log(data2)
        });
    }, [router.query]);



  return (
    <>
        {/** Show connected devices, a dropdown menu with settings options, and a dashboard interface for a vehicle like robot with a accelerometer */}

        <ToastContainer />

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to the Dashboard
                </h1>
                <p className="mt-3 text-2xl">
                    Here you can see your connected devices and their status
                </p>
                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                <Card>
                        <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
                            <h1 className="text-4xl font-bold">{data2.name}</h1>
                            <p className="mt-3 text-2xl">
                                Status: {data2.status}
                            </p>
                            <p className="mt-3 text-2xl">
                                Battery: {data2.battery}
                            </p>
                            
                        </div>
                    </Card>
                    </div>




            </main>
        </div>


    </>
  );
}

