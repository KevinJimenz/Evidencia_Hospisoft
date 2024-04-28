import { createPool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({ path: "../../../.env"})

export const connection = createPool({
 host: process.env.MYSQL_HOST,
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASSWORD,
 database: process.env.MYSQL_DATABASE,
<<<<<<< HEAD
}).promise();
=======
}).promise();
>>>>>>> 30ed91b3f170ba70e21c163cb5cd97e808ecb9b3
