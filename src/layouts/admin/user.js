import React from "react";
import { instance } from "@/libs/instance";
const dataForm = {
  id: "",
  tipe: "Gudang",
  nama: "",
  alamat: "",
  telpon: "",
  username: "",
  password: "",
};
const User = () => {
  const [formData, setFormData] = React.useState(dataForm);
  const [datas, setDatas] = React.useState([]);
  const handleGetData = async () => {
    try {
      const response = await instance.get("/user");
      setDatas(response.data.result);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleCreateData = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/user", formData);
      setFormData(dataForm);
      handleGetData();
    } catch (error) {
      alert(error.message);
    }
  };
  const handleUpdateData = async () => {
    try {
      await instance.patch("/user", formData);
      setFormData(dataForm);
      handleGetData();
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDeleteData = async () => {
    await instance.delete("/user", { data: formData });
    setFormData(dataForm);
    handleGetData();
  };
  React.useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div className="h-full flex-grow flex flex-col gap-8">
      <p className="font-['Poppins'] text-stone-800 font-bold text-4xl text-center">
        Kelola User
      </p>
      <div className="flex flex-col justify-center gap-4">
        <form
          className="flex flex-col gap-4"
          autoComplete="off"
          onSubmit={handleCreateData}
        >
          <div className="grid grid-cols-2 gap-x-16 gap-y-2">
            <div className="flex flex-col gap-2">
              <label
                className="font-['Poppins'] text-stone-800 font-medium text-lg"
                htmlFor="tipe"
              >
                Tipe User
              </label>
              <select
                name="tipe"
                id="tipe"
                className="bg-slate-100 py-2 px-4 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.tipe}
                onChange={(e) => {
                  setFormData({ ...formData, tipe: e.target.value });
                }}
              >
                <option value="Gudang">Gudang</option>
                <option value="Kasir">Kasir</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-['Poppins'] text-stone-800 font-medium text-lg"
                htmlFor="alamat"
              >
                Alamat
              </label>
              <input
                id="alamat"
                type="text"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.alamat}
                onChange={(e) => {
                  setFormData({ ...formData, alamat: e.target.value });
                }}
                required={true}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-['Poppins'] text-stone-800 font-medium text-lg"
                htmlFor="nama"
              >
                Nama
              </label>
              <input
                id="nama"
                type="text"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.nama}
                onChange={(e) => {
                  setFormData({ ...formData, nama: e.target.value });
                }}
                required={true}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-['Poppins'] text-stone-800 font-medium text-lg"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.username}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    username: e.target.value.toLowerCase(),
                  });
                }}
                required={true}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-['Poppins'] text-stone-800 font-medium text-lg"
                htmlFor="telepon"
              >
                Telepon
              </label>
              <input
                id="telepon"
                type="text"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.telpon}
                onChange={(e) => {
                  setFormData({ ...formData, telpon: e.target.value });
                }}
                required={true}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-['Poppins'] text-stone-800 font-medium text-lg"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="text"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.password || ""}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <div className="flex justify-between gap-y-4">
            <button
              className="bg-sky-300 px-14 py-3 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm w-64"
              type="submit"
            >
              Tambah
            </button>
            <button
              className="bg-sky-300 disabled:bg-slate-300 disabled:cursor-not-allowed px-14 py-3 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm w-64"
              disabled={!formData.id}
              onClick={(e) => {
                e.preventDefault();
                handleUpdateData();
              }}
            >
              Edit
            </button>
            <button
              className="bg-sky-300 disabled:bg-slate-300 disabled:cursor-not-allowed px-14 py-3 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm w-64"
              disabled={!formData.id}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteData();
              }}
            >
              Hapus
            </button>
          </div>
        </form>
        <div className="overflow-auto w-full mb-4">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-white font-['Poppins'] font-bold text-stone-800">
                <th className="border-2 px-4 py-2">No</th>
                <th className="border-2 px-4 py-2">Tipe User</th>
                <th className="border-2 px-4 py-2">Nama User</th>
                <th className="border-2 px-4 py-2">Alamat</th>
                <th className="border-2 px-4 py-2">Telepon</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => {
                return (
                  <tr
                    className="font-['Inter'] font-medium text-stone-600 cursor-pointer hover:bg-slate-50"
                    key={index}
                    onClick={() => {
                      setFormData({
                        id: data.id,
                        alamat: data.alamat,
                        nama: data.nama,
                        password: data.password,
                        telpon: data.telpon,
                        tipe: data.tipe_user,
                        username: data.username,
                      });
                    }}
                  >
                    <td className="border-2 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border-2 px-4 py-2 text-center">
                      {data.tipe_user}
                    </td>
                    <td className="border-2 px-4 py-2">{data.nama}</td>
                    <td className="border-2 px-4 py-2">{data.alamat}</td>
                    <td className="border-2 px-4 py-2 text-center">
                      {data.telpon}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default User;
