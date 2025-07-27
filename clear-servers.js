import { CONFIG } from "../config.js";

export default async function handler(req, res){
  const headers = { Authorization:`Bearer ${CONFIG.API_KEY}`, Accept:"application/json" };

  try {
    const list = await fetch(`${CONFIG.PANEL_URL}/api/application/servers`, { headers }).then(r => r.json());
    const ids = list.data.map(s => s.attributes.id);
    await Promise.all(ids.map(id => fetch(`${CONFIG.PANEL_URL}/api/application/servers/${id}`, { method:"DELETE", headers })));
    return res.send("✅ All servers deleted.");
  } catch(e){
    console.error(e);
    return res.status(500).send("❌ Failed to delete servers.");
  }
}
