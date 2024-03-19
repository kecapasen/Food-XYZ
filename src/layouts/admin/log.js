import React from "react";
import { instance } from "@/libs/instance";
const Log = () => {
  const [date, setDate] = React.useState("");
  const [log, setLog] = React.useState([]);
  const handleGetData = async (e) => {
    e?.preventDefault();
    if (date) {
      try {
        const response = await instance.get("/log", {
          params: {
            date,
          },
        });
        setLog(response.data.result);
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const response = await instance.get("/log");
        setLog(response.data.result);
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
        Log Activity
      </p>
      <div className="flex flex-col justify-center items-start gap-4">
        <div className="flex flex-row items-end w-full gap-4">
          <form className="flex gap-4" onSubmit={handleGetData}>
            <div className="flex flex-col gap-4 gap-y-2">
              <label
                htmlFor="awal"
                className="font-['Poppins'] text-stone-800 font-medium text-xl"
              >
                Pilih Tanggal
              </label>
              <input
                id="awal"
                type="date"
                className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-96"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
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
        <div className="overflow-x-auto w-full mb-4">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-center font-['Inter'] font-medium text-stone-800">
                <th className="border-2 px-4 py-2">No</th>
                <th className="border-2 px-4 py-2">Username</th>
                <th className="border-2 px-4 py-2">Waktu</th>
                <th className="border-2 px-4 py-2">Aktivitas</th>
              </tr>
            </thead>
            <tbody>
              {log.map((data, index) => {
                return (
                  <tr
                    className="font-['Inter'] font-medium text-stone-600"
                    key={index}
                  >
                    <td className="border-2 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border-2 px-4 py-2">{data.username}</td>
                    <td className="border-2 px-4 py-2 text-center">
                      {data.waktu}
                    </td>
                    <td className="border-2 px-4 py-2 text-center">
                      {data.aktivitas}
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
export default Log;
