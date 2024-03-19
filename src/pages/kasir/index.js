import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import { getSession, signOut } from "next-auth/react";
import { instance } from "@/libs/instance";
const dataForm = {
  id: "",
  no: "",
  index: "",
  code: "",
  nama: "",
  kuantitas: "",
  satuan: "",
  total: "",
  bayar: "",
};
const Kasir = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState(dataForm);
  const [cartData, setCartData] = React.useState([]);
  const [productData, setProductData] = React.useState([]);
  const componentRef = React.useRef();
  const handleChange = (value, path) => {
    const rawValue = value.toString().replace(/\D/g, "");
    const parsedValue = parseInt(rawValue, 10);
    const formattedValue = parsedValue.toLocaleString("id-ID");
    setFormData((prev) => ({
      ...prev,
      [path]: isNaN(parsedValue) ? "" : formattedValue,
    }));
  };
  const handleGetDataProduct = async () => {
    const response = await instance.get("/product");
    setProductData(response.data.result);
  };
  const handleCreateData = async (e) => {
    e.preventDefault();
    console.log(componentRef.current);
    handlePrint(null, () => componentRef.current);
    const session = await getSession();
    await instance.post("/transaction", {
      session: session.user.id,
      cartData,
    });
  };
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  React.useEffect(() => {
    handleGetDataProduct();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="h-full w-96 bg-sky-100 flex flex-col gap-16 items-center justify-center px-8">
        <div className="flex flex-col gap-4 items-center">
          <p className="font-['Poppins'] text-stone-800 font-bold text-4xl">
            Kasir
          </p>
          <Image
            src={"/cashier.png"}
            alt="administrator"
            width={150}
            height={150}
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-16 items-center">
          <p className="font-['Poppins'] text-stone-800 font-bold text-4xl text-center">
            Kelola Transaksi
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
            Kelola Transaksi
          </p>
          <div className="flex flex-col justify-center gap-4">
            <form
              className="flex flex-col gap-4"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                setCartData([...cartData, formData]);
                setFormData(dataForm);
                console.log(cartData);
              }}
            >
              <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="menu_transaksi"
                  >
                    Pilih Menu
                  </label>
                  <select
                    name="menu_transaksi"
                    id="menu_transaksi"
                    value={formData.index}
                    className="bg-slate-100 py-2 px-4 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        id: productData[e.target.value]?.id || "",
                        index: e.target.value,
                        code: productData[e.target.value]?.kode_barang || "",
                        nama: productData[e.target.value]?.nama_barang || "",
                        satuan: productData[e.target.value]?.harga_satuan || "",
                        kuantitas: "",
                        total: "",
                      });
                    }}
                  >
                    <option value="">Kode - Nama Menu</option>
                    {productData.map((result, index) => {
                      return (
                        <option value={index} key={index}>
                          {result.kode_barang} - {result.nama_barang}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="kuantitas_transaksi"
                  >
                    Kuantitas
                  </label>
                  <input
                    id="kuantitas_transaksi"
                    type="text"
                    value={formData.kuantitas}
                    className="bg-slate-100 py-2 px-4 placeholder:text-stone-500 rounded-lg font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                    onChange={(e) => {
                      if (formData.index) {
                        handleChange(e.target.value, "kuantitas");
                        handleChange(
                          parseInt(
                            e.target.value.toString().replace(/\D/g, ""),
                            10
                          ) *
                            parseInt(
                              formData.satuan.toString().replace(/\D/g, "")
                            ) || "",
                          "total"
                        );
                      }
                    }}
                    required={true}
                  ></input>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="harga_transaksi"
                  >
                    Harga Satuan
                  </label>
                  <label
                    htmlFor="harga_transaksi"
                    className="flex items-center font-['Poppins'] bg-slate-100 w-full rounded-lg px-4 cursor-text"
                  >
                    <p className="font-['Inter'] text-stone-600 font-semibold">
                      Rp.
                    </p>
                    <input
                      disabled={true}
                      id="harga_transaksi"
                      type="text"
                      readOnly={true}
                      value={formData.satuan.toLocaleString("id-ID")}
                      className="bg-transparent py-2 px-1 placeholder:text-stone-500 font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                      required={true}
                    ></input>
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-['Poppins'] text-stone-800 font-medium text-lg"
                    htmlFor="total_transaksi"
                  >
                    Total Harga
                  </label>
                  <label
                    htmlFor="total_transaksi"
                    className="flex items-center font-['Poppins'] bg-slate-100 w-full rounded-lg px-4 cursor-text"
                  >
                    <p className="font-['Inter'] text-stone-600 font-semibold">
                      Rp.
                    </p>
                    <input
                      disabled={true}
                      id="total_transaksi"
                      type="text"
                      readOnly={true}
                      value={formData.total}
                      className="bg-transparent py-2 px-1 placeholder:text-stone-500 font-['Inter'] text-stone-600 font-semibold outline-none w-full"
                      required={true}
                    ></input>
                  </label>
                </div>
                <div className="flex justify-end gap-4 py-4 col-end-3">
                  <button
                    className="bg-sky-300 px-14 py-3 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm flex-grow"
                    type="submit"
                  >
                    Tambah
                  </button>
                  <button
                    className="bg-slate-300 px-14 py-3 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm flex-grow"
                    onClick={(e) => {
                      e.preventDefault();
                      setCartData([]);
                      setFormData(dataForm);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
            <div className="overflow-auto flex flex-col gap-2 w-full p-4 bg-slate-100">
              <p className="font-['Poppins'] text-stone-800 font-bold">
                Keranjang
              </p>
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-white font-['Poppins'] font-bold text-stone-800">
                    <th className="border-2 px-4 py-2">ID Cart</th>
                    <th className="border-2 px-4 py-2">Kode Barang</th>
                    <th className="border-2 px-4 py-2">Nama Barang</th>
                    <th className="border-2 px-4 py-2">Harga Satuan</th>
                    <th className="border-2 px-4 py-2">Kuantitas</th>
                    <th className="border-2 px-4 py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData
                    ? cartData.map((data, index) => {
                        return (
                          <tr
                            className="bg-white font-['Inter'] font-medium text-stone-600"
                            key={index}
                          >
                            <td className="border-2 px-4 py-2 text-center">
                              {"CT" + (index + 1)}
                            </td>
                            <td className="border-2 px-4 py-2 text-center">
                              {data.code}
                            </td>
                            <td className="border-2 px-4 py-2">{data.nama}</td>
                            <td className="border-2 px-4 py-2">
                              {"Rp. " +
                                parseInt(
                                  data.satuan.toString().replace(/\D/g, ""),
                                  10
                                ).toLocaleString("id-ID")}
                            </td>
                            <td className="border-2 px-4 py-2 text-center">
                              {data.kuantitas}
                            </td>
                            <td className="border-2 px-4 py-2">
                              {"Rp. " + data.total}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-['Poppins'] text-stone-800 font-bold">
                    Total Harga
                  </p>
                  <p className="font-['Poppins'] text-stone-800 font-bold">
                    {"Rp. " +
                      cartData
                        .reduce(
                          (total, data) =>
                            total +
                            parseInt(
                              data.total.toString().replace(/\D/g, ""),
                              10
                            ),
                          0
                        )
                        .toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="hidden">
                  <div
                    ref={componentRef}
                    className="max-w-[58mm] text-[10px] flex flex-col gap-2 p-2"
                  >
                    <p className="font-['Poppins'] text-black text-center text-base">
                      RECEIPT
                    </p>
                    <hr className="w-full border-black" />
                    <div className="flex justify-between items-center">
                      <p className="font-['Poppins'] text-black">Kasir 1</p>
                      <p className="font-['Poppins'] text-black">
                        {new Date().toLocaleString("id-ID")}
                      </p>
                    </div>
                    <hr className="w-full border-black" />
                    {cartData.map((data, index) => {
                      return (
                        <>
                          <div key={index} className="grid grid-cols-2">
                            <p className="font-['Poppins'] text-black">
                              {data.nama + " x " + data.kuantitas}
                            </p>
                            <p className="font-['Poppins'] text-black text-end">
                              {"Rp. " + data.total}
                            </p>
                          </div>
                        </>
                      );
                    })}
                    <hr className="w-full border-black" />
                    <div className="grid grid-cols-2">
                      <p className="font-['Poppins'] text-black">Total</p>
                      <p className="font-['Poppins'] text-black text-end">
                        {"Rp. " +
                          cartData
                            .reduce(
                              (total, data) =>
                                total +
                                parseInt(
                                  data.total.toString().replace(/\D/g, ""),
                                  10
                                ),
                              0
                            )
                            .toLocaleString("id-ID")}
                      </p>
                      <p className="font-['Poppins'] text-black">Bayar</p>
                      <p className="font-['Poppins'] text-black text-end">
                        {formData.bayar ? "Rp " + formData.bayar : "Rp. 0"}
                      </p>
                      <p className="font-['Poppins'] text-black">Kembalian</p>
                      <p className="font-['Poppins'] text-black text-end">
                        {parseInt(
                          formData.bayar.toString().replace(/\D/g, "") -
                            cartData.reduce(
                              (total, data) =>
                                total +
                                parseInt(
                                  data.total.toString().replace(/\D/g, ""),
                                  10
                                ),
                              0
                            )
                        ) < 0
                          ? "Rp. 0"
                          : "Rp. " +
                            parseInt(
                              formData.bayar.toString().replace(/\D/g, "") -
                                cartData.reduce(
                                  (total, data) =>
                                    total +
                                    parseInt(
                                      data.total.toString().replace(/\D/g, ""),
                                      10
                                    ),
                                  0
                                )
                            ).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <hr className="w-full border-black" />
                    <p className="font-['Poppins'] text-black text-center text-base">
                      THANK YOU!
                    </p>
                    <div className="flex items-center gap-2">
                      <hr className="w-full border-black" />
                      <p className="font-['Poppins'] text-black flex-grow text-nowrap">
                        &copy; Rizky Maulana
                      </p>
                      <hr className="w-full border-black" />
                    </div>
                  </div>
                </div>
                <form
                  className="flex flex-col items-center gap-2"
                  onSubmit={handleCreateData}
                >
                  <label
                    htmlFor="bayar"
                    className="flex items-center bg-slate-100 w-full rounded-lg px-4 cursor-text"
                  >
                    <p className="font-['Inter'] text-stone-600 font-bold">
                      Rp.
                    </p>
                    <input
                      id="bayar"
                      type="text"
                      className="bg-transparent px-1 py-2 placeholder:text-stone-500 font-['Inter'] text-stone-600 font-bold outline-none w-full"
                      required={true}
                      value={
                        isNaN(
                          parseInt(
                            formData.bayar?.toString().replace(/\D/g, "")
                          )
                        )
                          ? ""
                          : parseInt(
                              formData.bayar.toString().replace(/\D/g, "")
                            ).toLocaleString("id-ID")
                      }
                      onChange={(e) => {
                        handleChange(e.target.value, "bayar");
                      }}
                    ></input>
                  </label>
                  <button
                    className="bg-sky-300 px-14 py-3 font-['Poppins'] text-stone-700 font-bold rounded-lg text-sm flex-grow w-full"
                    type="submit"
                  >
                    Bayar
                  </button>
                </form>
                <div className="flex justify-between items-center">
                  <p className="font-['Poppins'] text-stone-800 font-bold">
                    Kembalian
                  </p>
                  <p className="font-['Poppins'] text-stone-800 font-bold">
                    {parseInt(
                      formData.bayar.toString().replace(/\D/g, "") -
                        cartData.reduce(
                          (total, data) =>
                            total +
                            parseInt(
                              data.total.toString().replace(/\D/g, ""),
                              10
                            ),
                          0
                        )
                    ) < 0
                      ? "Rp. 0"
                      : "Rp. " +
                        parseInt(
                          formData.bayar.toString().replace(/\D/g, "") -
                            cartData.reduce(
                              (total, data) =>
                                total +
                                parseInt(
                                  data.total.toString().replace(/\D/g, ""),
                                  10
                                ),
                              0
                            )
                        ).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Kasir;
