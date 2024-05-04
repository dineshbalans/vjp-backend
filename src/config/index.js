import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// dotenv.config({ path: `./${process.env.NODE_ENV}.env` });
// dotenv.config({ path: `./.env` });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });


// console.log( `./${process.env.NODE_ENV}.env`)