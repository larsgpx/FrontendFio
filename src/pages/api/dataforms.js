import { registerdata } from "@/data/registerform";
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(registerdata);
    
    }
    else if (req.method === 'POST') {
      console.log(req.body);
      const register = req.body;
      const newRegister = {
        data: {
            attributes: register,
            type: "clients"
        }
      }
      registerdata.push(newRegister);
      res.status(201).json(newRegister);
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  }
  