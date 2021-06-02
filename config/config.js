//define some server-side configuration-related variables 
//that will be used in the code


const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:"mongodb://achyutjjj:abcde@cluster0-shard-00-00.yk9zd.mongodb.net:27017,cluster0-shard-00-01.yk9zd.mongodb.net:27017,cluster0-shard-00-02.yk9zd.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-3nab45-shard-0&authSource=admin&retryWrites=true&w=majority"

export default config
