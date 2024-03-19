import React from "react";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    const data = await getSession();
    if (!result.error) {
      if (data) {
        if (data.user.role === "Admin") {
          router.push("/admin");
        } else if (data.user.role === "Gudang") {
          router.push("/gudang");
        } else if (data.user.role === "Kasir") {
          router.push("/kasir");
        }
      }
    } else {
      setIsError(true);
    }
  };
  const handleReset = () => {
    setUsername("");
    setPassword("");
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <Image
        src={"/retail.png"}
        alt="Food XYZ"
        width={128}
        height={128}
        quality={100}
      />
      <p className="font-['Poppins'] text-stone-800 font-semibold text-4xl">
        Food XYZ
      </p>
      <form className="flex flex-col gap-4" id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-slate-200 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-bold outline-none"
          placeholder="User Name"
          value={username}
          onChange={(e) => {
            isError && setIsError(false);
            setUsername(e.target.value);
          }}
          required={true}
        ></input>
        <input
          type="password"
          className="bg-slate-200 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-bold outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            isError && setIsError(false);
            setPassword(e.target.value);
          }}
        ></input>
        <div className="flex justify-between gap-4">
          <button
            className="bg-sky-300 px-14 py-2 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm"
            type="submit"
          >
            Login
          </button>
          <button
            className="bg-slate-300 px-14 py-2 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm"
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            Reset
          </button>
        </div>
      </form>
      {isError && (
        <p className="font-['Poppins'] text-rose-500 font-semibold">
          Username Atau Password Salah!
        </p>
      )}
    </div>
  );
};
export default Login;
