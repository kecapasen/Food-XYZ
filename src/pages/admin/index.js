import React from "react";
import Image from "next/image";
import Log from "@/layouts/admin/log";
import User from "@/layouts/admin/user";
import Laporan from "@/layouts/admin/laporan";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
const Admin = () => {
  const [layoutID, setLayoutID] = React.useState(1);
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="h-full w-96 bg-sky-100 flex flex-col gap-16 items-center justify-center px-8">
        <div className="flex flex-col gap-4 items-center">
          <p className="font-['Poppins'] text-stone-800 font-bold text-4xl">
            Admin
          </p>
          <Image
            src={"/administrator.png"}
            alt="administrator"
            width={150}
            height={150}
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <button
            className="bg-sky-300 px-14 py-3 font-['Poppins'] text-stone-800 font-bold rounded-lg text-sm w-full"
            onClick={(e) => {
              e.preventDefault();
              setLayoutID(2);
            }}
          >
            Kelola User
          </button>
          <button
            className="bg-sky-300 px-14 py-3 font-['Poppins'] text-stone-800 font-bold rounded-lg text-sm w-full"
            onClick={(e) => {
              e.preventDefault();
              setLayoutID(3);
            }}
          >
            Kelola Laporan
          </button>
          <button
            className="bg-sky-300 px-14 py-3 font-['Poppins'] text-stone-800 font-bold rounded-lg text-sm w-full"
            onClick={(e) => {
              e.preventDefault();
              signOut({
                redirect: false,
              });
              router.push("/auth/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="overflow-auto w-full pt-12 pb-4 px-4">
        {layoutID === 1 ? (
          <Log />
        ) : layoutID === 2 ? (
          <User />
        ) : layoutID === 3 ? (
          <Laporan />
        ) : (
          <Log />
        )}
      </div>
    </div>
  );
};
export default Admin;
