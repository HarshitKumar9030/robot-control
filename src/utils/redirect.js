import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

const Redirect = (to) => {
  const router = useRouter();
  if (to === router.pathname) return null;
  else {
    useEffect(() => {
      router.push(to);
    }, [router]);
  }
  return null;
};

export default Redirect;
