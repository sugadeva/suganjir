import { CONFIG } from "../config.js";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).send("User ID wajib diisi.");
  if (req.method !== "DELETE") return res.status(405).send("Method Not Allowed");

  try {
    await fetch(`${CONFIG.PANEL_URL}/api/application/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${CONFIG.API_KEY}`,
        Accept: "application/json",
      },
    });
    res.status(200).send(`User ${id} berhasil dihapus.`);
  } catch (e) {
    res.status(500).send("Gagal hapus user.");
  }
}
