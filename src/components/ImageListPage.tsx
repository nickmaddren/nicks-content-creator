import { Outlet } from "react-router";
import { ImageList } from "./ImageList";

export const ImageListPage = () => (
  <div className="w-full max-w-[calc(100%-2rem)] sm:container mx-auto py-15">
    <h1 className="text-center text-2xl mb-15 font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
      Nick's Content Creator 🎨
    </h1>
    <ImageList />
    <Outlet />
  </div>
);
