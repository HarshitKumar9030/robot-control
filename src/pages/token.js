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

    const [Token, setToken ] = useState("");

  useEffect(() => {
    const creds = localStorage.getItem("token");
    if (!creds) {
      router.push("/login");
    }
    }, [router.query]);

  const getAuthToken = async () => {
    let a = await fetch(`/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
            jwtToken: localStorage.getItem("token"),
        }),
    })
    let fetchData = await a.json();
    if (fetchData.status === "success") {
        setToken(fetchData.token);
        }

  };

  useEffect(() => {
    getAuthToken();
  }, [router.query]);
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white min-h-screen py-2">
        <ToastContainer />
          <div className="flex flex-col  items-center p-4">
        
        <Card>
            <Card.Body>
                <div className="flex flex-col items-center justify-center">
                    
                    <h1 className="text-4xl font-bold">Your token</h1>
                    <p className="text-gray-500 text-lg">This is your Auth token, you can use it to authenticate b/w pi and our servers.</p>
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        value={Token}
                        readOnly={true}
                    />
                    <Button
                        color="lightBlue"
                        buttonType="filled"
                        size="regular"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                        className="mt-4"
                        onClick={() => {
                            navigator.clipboard.writeText(Token);
                            toast.success("Copied to clipboard!");
                        }}
                    >
                        Copy to clipboard
                    </Button>
                    <Button color="red" onClick={() => router.push("/dashboard")} className="mt-4">
                        Dashboard
                    </Button>
                </div>
            </Card.Body>
        </Card>
          </div>
      </div>
    </>
  );
}
