import { pool } from "@/libs/pool";
const handler = async (req, res) => {
  const connection = await pool.getConnection();
  if (req.method === "GET") {
    try {
      const [result, _] = await connection.query(
        "select id, kode_barang, nama_barang, date_format(expired_date, '%Y-%m-%e') as expired_date, date_format(expired_date, '%e/%m/%Y') as expired, jumlah_barang, satuan, harga_satuan from tb_barang"
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  } else if (req.method === "POST") {
    try {
      const { kode, nama, expired, jumlah, satuan, harga } = req.body;
      const [result, _] = await connection.query(
        "insert into tb_barang (kode_barang, nama_barang, expired_date, jumlah_barang, satuan, harga_satuan) values (?, ?, ?, ?, ?, ?)",
        [kode, nama, expired, jumlah, satuan, harga]
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  } else if (req.method === "PATCH") {
    try {
      const { id, kode, nama, expired, jumlah, satuan, harga } = req.body;
      const [result, _] = await connection.query(
        "update tb_barang set kode_barang = ?, nama_barang = ?, expired_date = ?, jumlah_barang = ?, satuan = ?, harga_satuan = ? where id = ?",
        [kode, nama, expired, jumlah, satuan, harga, id]
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const [result, _] = await connection.query(
        "delete from tb_barang where id = ?",
        [id]
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  }
};
export default handler;
