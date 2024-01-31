import { ClipLoader } from "react-spinners";

interface LoadingProps {
  sizee?: "sm" | "base" | "large";
  color?: "white" | "black";
}

export function Loading({ color = "white", sizee = "sm" }: LoadingProps) {
  return (
    <ClipLoader
      color={color == "white" ? "#fff" : color == "black" ? "#292929" : "#fff"}
      size={
        sizee == "sm" ? 18 :
          sizee == "large" ? 52 :
            sizee === "base" ? 32 : 32
      }
    />
  )
}