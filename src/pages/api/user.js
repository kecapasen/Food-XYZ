import { pool } from "@/libs/pool";
const handler = async (req, res) => {
  const connection = await pool.getConnection();
  if (req.method === "GET") {
    try {
      const [result, _] = await connection.query(
        "select * from tb_user where tipe_user != 'Admin'"
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  } else if (req.method === "POST") {
    try {
      const { tipe, nama, alamat, telpon, username, password } = req.body;
      const [result, _] = await connection.query(
        "insert into tb_user (tipe_user, nama, alamat, telpon, username, password) values (?, ?, ?, ?, ?, ?)",
        [tipe, nama, alamat, telpon, username, password || null]
      );
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  } else if (req.method === "PATCH") {
    try {
      const { tipe, nama, alamat, telpon, username, password, id } = req.body;
      const [result, _] = await connection.query(
        "update tb_user set tipe_user = ?, nama = ?, alamat = ?, telpon = ?, username = ?, password = ? where id = ?",
        [tipe, nama, alamat, telpon, username, password, id]
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
        "delete from tb_user where id = ?",
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
