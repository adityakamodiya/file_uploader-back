import{MongoClient} from "mongodb"
const connection = MongoClient.connect("mongodb+srv://adityakamodiya:11223344@cluster0.j4ukslx.mongodb.net/database?retryWrites=true&w=majority")
export const dbName = "fileuploader"
export default connection