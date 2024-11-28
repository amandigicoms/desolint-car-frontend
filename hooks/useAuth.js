"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, []);
  return { loading, isAuthenticated };
};

export default useAuth;
