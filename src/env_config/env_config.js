import dotenv from "dotenv";

dotenv.config();

export default{
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGOSTRING,
    ADMIN_NAME:process.env.ADMIN_NAME,
    ADMIN_PASS:process.env.ADMIN_PASS

}