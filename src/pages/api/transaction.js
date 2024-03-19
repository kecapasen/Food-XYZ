import { pool } from "@/libs/pool";
const handler = async (req, res) => {
  const connection = await pool.getConnection();
  if (req.method === "GET") {
    if (req.query.from) {
      try {
        const { from, to } = req.query;
        const [result, _] = await connection.query(
          "select tb_transaksi.id, date_format(tb_transaksi.tgl_transaksi, '%W, %e/%m/%Y') as tanggal, tb_transaksi.total_bayar, tb_user.nama from tb_transaksi join tb_user on (id_user = tb_user.id) where tb_transaksi.tgl_transaksi between date_format(?, '%Y-%m-%e') and date_format(?, '%Y-%m-%e')",
          [from.toString(), to.toString()]
        );
        return res.status(200).json({ result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      } finally {
        connection.release();
      }
    } else {
      try {
        const [result, _] = await connection.query(
          "select tb_transaksi.id, date_format(tb_transaksi.tgl_transaksi, '%W, %e/%m/%Y') as tanggal, tb_transaksi.total_bayar, tb_user.nama from tb_transaksi join tb_user on (id_user = tb_user.id) where tb_transaksi.tgl_transaksi between date_format(curdate(), '%Y-%m-%e') and date_format(curdate(), '%Y-%m-%e')"
        );
        return res.status(200).json({ result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      } finally {
        connection.release();
      }
    }
  } else if (req.method === "POST") {
    const { session, cartData } = req.body;
    await cartData.map(async (data) => {
      try {
        await connection.query(
          "insert into tb_transaksi (id_user, id_barang, total_bayar) values (?, ?, ?)",
          [
            session,
            data.id,
            parseInt(data.total.toString().replace(/\D/g, ""), 10),
          ]
        );
      } catch (error) {
        console.error(error);
      } finally {
        connection.release();
      }
      return res.status(200).json({ result: "Success!" });
    });
  }
};
export default handler;
