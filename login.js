import { CONFIG } from "../config.js";

export default function handler(req, res){
  if(req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const { password } = req.body;
  if(password === CONFIG.ADMIN_PASSWORD) res.status(200).send("OK");
  else res.status(401).send("WRONG");
}
