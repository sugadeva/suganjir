import { CONFIG } from "../config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const servers = await fetch(`${CONFIG.PANEL_URL}/api/application/servers`, {
      headers: {
        Authorization: `Bearer ${CONFIG.API_KEY}`,
        Accept: "application/json",
      },
    }).then(r => r.json());

    let count = 0;
    for (const s of servers.data || []) {
      await fetch(`${CONFIG.PANEL_URL}/api/application/servers/${s.attributes.id}/force`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CONFIG.API_KEY}`,
          Accept: "application/json",
        },
      });
      count++;
    }

    res.status(200).send(`Berhasil hapus ${count.toLocaleString("id-ID")} server.`);
  } catch (e) {
    res.status(500).send("Gagal hapus server.");
  }
}
