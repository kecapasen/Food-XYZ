import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { instance } from "@/libs/instance";
import { signOut } from "next-auth/react";
const dataForm = {
  id: "",
  kode: "",
  nama: "",
  expired: "",
  jumlah: "",
  satuan: "Botol",
  harga: "",
};
const Gudang = () => {
  const [formData, setFormData] = React.useState(dataForm);
  const [datas, setDatas] = React.useState([]);
  const handleChange = (value, path) => {
    const rawValue = value.toString().replace(/\D/g, "");
    const parsedValue = parseInt(rawValue, 10);
    const formattedValue = parsedValue.toLocaleString("id-ID");
    setFormData((prev) => ({
      ...prev,
      [path]: isNaN(parsedValue) ? "" : formattedValue,
    }));
  };
  const handleGetData = async () => {
    try {
      const result = await instance.get("/product");
      setDatas(result.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreateData = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/product", {
        ...formData,
        harga: parseInt(formData.harga.toString().replace(/\D/g, ""), 10),
        jumlah: parseInt(formData.jumlah.toString().replace(/\D/g, ""), 10),
      });
      setFormData(dataForm);
      handleGetData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateData = async () => {
    try {
      await instance.patch("/product", {
        ...formData,
        harga: parseInt(formData.harga.toString().replace(/\D/g, ""), 10),
        jumlah: parseInt(formData.jumlah.toString().replace(/\D/g, ""), 10),
      });
      setFormData(dataForm);
      handleGetData();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteData = async () => {
    try {
      await instance.delete("/product", {
        data: {
          id: formData.id,
        },
      });
      setFormData(dataForm);
      handleGetData();
    } catch (error) {
      console.error(error);
    }
  };
  const router = useRouter();
  React.useEffect(() => {
    setFormData(dataForm);
    handleGetData();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="h-full w-96 bg-sky-100 flex flex-col gap-16 items-center justify-center px-8">
        <div className="flex flex-col gap-4 items-center">
          <p className="font-['Poppins'] text-stone-800 font-bold text-4xl">
            Gudang
          </p>
          <Image
            src={"/warehouse.png"}
            alt="administrator"
            width={150}
            height={150}
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-16 items-center">
          <p className="font-['Poppins'] text-stone-800 font-bold text-4xl text-center">
            Kelola Barang
          </p>
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
        <div className="h-full flex-grow flex flex-col gap-8">
          <p className="font-['Poppins'] text-stone-800 font-bold text-4xl text-center">
            Kelola Barang
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
                    htmlFor="kode_barang"
                  >
                    Kode Barang
                  </label>
                  <input
                    id="kode_barang"
                    type="text"
                    value={formData.kode}
                    className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                    required={true}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        kode: e.target.value.toUpperCase(),
                      });
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="jumlah_barang"
                  >
                    Jumlah Barang
                  </label>
                  <input
                    id="jumlah_barang"
                    type="text"
                    value={formData.jumlah}
                    className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                    required={true}
                    onChange={(e) => {
                      handleChange(e.target.value, "jumlah");
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="nama_barang"
                  >
                    Nama Barang
                  </label>
                  <input
                    id="nama_barang"
                    type="text"
                    value={formData.nama}
                    className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                    required={true}
                    onChange={(e) => {
                      setFormData({ ...formData, nama: e.target.value });
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="satuan"
                  >
                    Satuan
                  </label>
                  <select
                    name="satuan"
                    id="satuan"
                    value={formData.satuan}
                    onChange={(e) => {
                      setFormData({ ...formData, satuan: e.target.value });
                    }}
                    className="bg-slate-100 py-2 px-4 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                  >
                    <option value="Botol">Botol</option>
                    <option value="Sachet">Sachet</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="expired_barang"
                  >
                    Expired Date
                  </label>
                  <input
                    id="expired_barang"
                    type="date"
                    value={formData.expired}
                    className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                    required={true}
                    onChange={(e) => {
                      setFormData({ ...formData, expired: e.target.value });
                    }}
                  ></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="harga_barang"
                  >
                    Harga Per Satuan
                  </label>
                  <label
                    htmlFor="harga_barang"
                    className="flex items-center font-['Poppins'] bg-slate-100 w-full rounded-lg px-4 cursor-text"
                  >
                    <p className="font-['Inter'] text-stone-600 font-semibold">
                      Rp.
                    </p>
                    <input
                      id="harga_barang"
                      type="text"
                      value={formData.harga}
                      className="bg-transparent py-2 px-1 placeholder:text-stone-500 font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                      required={true}
                      onChange={(e) => {
                        handleChange(e.target.value, "harga");
                      }}
                    ></input>
                  </label>
                </div>
              </div>
              <div className="flex justify-between gap-y-4">
                <button
                  className="bg-sky-300 disabled:bg-slate-300 disabled:cursor-not-allowed px-14 py-3 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm w-64"
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
                    <th className="border-2 px-4 py-2">Kode Barang</th>
                    <th className="border-2 px-4 py-2">Nama Barang</th>
                    <th className="border-2 px-4 py-2">Expired Date</th>
                    <th className="border-2 px-4 py-2">Jumlah</th>
                    <th className="border-2 px-4 py-2">Satuan</th>
                    <th className="border-2 px-4 py-2">Harga Satuan</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => {
                    return (
                      <tr
                        className="bg-white font-['Inter'] font-medium text-stone-600 cursor-pointer hover:bg-slate-50"
                        key={data.id}
                        onClick={() => {
                          setFormData({
                            id: data.id,
                            kode: data.kode_barang,
                            nama: data.nama_barang,
                            expired: data.expired_date,
                            jumlah: data.jumlah_barang,
                            satuan: data.satuan,
                          });
                          handleChange(data.harga_satuan, "harga");
                        }}
                      >
                        <td className="border-2 px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border-2 px-4 py-2 text-center">
                          {data.kode_barang}
                        </td>
                        <td className="border-2 px-4 py-2">
                          {data.nama_barang}
                        </td>
                        <td className="border-2 px-4 py-2 text-center">
                          {data.expired}
                        </td>
                        <td className="border-2 px-4 py-2 text-center">
                          {data.jumlah_barang}
                        </td>
                        <td className="border-2 px-4 py-2 text-center">
                          {data.satuan}
                        </td>
                        <td className="border-2 px-4 py-2 text-center">
                          {"Rp. " +
                            data.harga_satuan
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gudang;
