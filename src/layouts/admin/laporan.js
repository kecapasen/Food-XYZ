import React from "react";
import { instance } from "@/libs/instance";
const dataForm = {
  from: "",
  to: "",
};
const Laporan = () => {
  const [formData, setFormData] = React.useState(dataForm);
  const [datas, setDatas] = React.useState([]);
  const handleGetData = async (e) => {
    e?.preventDefault();
    console.log(formData);
    if (formData.from && formData.to) {
      try {
        const response = await instance.get("/transaction", {
          params: {
            from: formData.from,
            to: formData.to,
          },
        });
        setDatas(response.data.result);
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const response = await instance.get("/transaction");
        setDatas(response.data.result);
      } catch (error) {
        alert(error.message);
      }
    }
  };
  React.useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div className="h-full flex-grow flex flex-col gap-8">
      <p className="font-['Poppins'] text-stone-800 font-bold text-4xl text-center">
        Kelola Laporan
      </p>
      <div className="flex flex-col justify-center items-start gap-4">
        <div className="flex flex-row justify-center items-end gap-4 w-full">
          <form className="flex w-full gap-4" onSubmit={handleGetData}>
            <div className="grid grid-cols-2 gap-4 gap-y-2 w-full">
              <label
                htmlFor="awal"
                className="font-['Poppins'] text-stone-800 font-medium text-xl"
              >
                Tanggal Awal
              </label>
              <label
                htmlFor="akhir"
                className="font-['Poppins'] text-stone-800 font-medium text-xl"
              >
                Tanggal Akhir
              </label>
              <input
                id="awal"
                type="date"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.from}
                onChange={(e) => {
                  setFormData({ ...formData, from: e.target.value });
                }}
                required={true}
              ></input>
              <input
                id="akhir"
                type="date"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                value={formData.to}
                onChange={(e) => {
                  setFormData({ ...formData, to: e.target.value });
                }}
                required={true}
              ></input>
            </div>
            <div className="flex items-end">
              <button
                className="bg-sky-300 px-14 py-3 font-['Poppins'] text-stone-800 font-bold rounded-lg text-sm"
                type="submit"
              >
                Filter
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-auto w-full mb-4">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-white font-['Poppins'] font-bold text-stone-800">
                <th className="border-2 px-4 py-2">ID Transaksi</th>
                <th className="border-2 px-4 py-2">Tanggal Transaksi</th>
                <th className="border-2 px-4 py-2">Total Pembayaran</th>
                <th className="border-2 px-4 py-2">Nama Kasir</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => {
                return (
                  <tr
                    className="text-center font-['Inter'] font-medium text-stone-600"
                    key={index}
                  >
                    <td className="border-2 px-4 py-2">{"TR" + data.id}</td>
                    <td className="border-2 px-4 py-2">{data.tanggal}</td>
                    <td className="border-2 px-4 py-2">
                      {"Rp. " +
                        parseInt(
                          data.total_bayar.toString().replace(/\D/g, ""),
                          10
                        ).toLocaleString("id-ID")}
                    </td>
                    <td className="border-2 px-4 py-2">{data.nama}</td>
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
export default Laporan;
