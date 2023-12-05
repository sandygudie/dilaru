"use client"
import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
}
export default function IconButton({ children, handleClick }: IconButtonProps) {
  return <button onClick={() => handleClick()}>{children}</button>;
}
