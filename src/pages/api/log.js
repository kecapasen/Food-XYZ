import { pool } from "@/libs/pool";
const handler = async (req, res) => {
  const connection = await pool.getConnection();
  if (req.method === "GET") {
    if (req.query.date) {
      try {
        const { date } = req.query;
        const [result, _] = await connection.query(
          "select tb_user.username, date_format(tb_log.waktu, '%e/%m/%Y %H:%i') as waktu, tb_log.aktivitas from tb_log join tb_user on (id_user = tb_user.id) where tb_log.waktu between date_format(?, '%Y-%m-%e 00:01') and date_format(?, '%Y-%m-%e 23:59')",
          [date.toString(), date.toString()]
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
          "select tb_user.username, date_format(tb_log.waktu, '%e/%m/%Y %H:%i') as waktu, tb_log.aktivitas from tb_log join tb_user on (id_user = tb_user.id) where tb_log.waktu between date_format(now(), '%Y-%m-%e 00:01') and date_format(now(), '%Y-%m-%e 23:59')"
        );
        return res.status(200).json({ result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      } finally {
        connection.release();
      }
    }
  }
};
export default handler;
