exports.config = {
  mysql: {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE
  },
  queries: {
    download: "SELECT * FROM data",
    all:      "SELECT * FROM data LIMIT ?,?",
    state:    "SELECT * FROM data WHERE State = ? LIMIT ?,?",
    city:     "SELECT * FROM data WHERE City = ? LIMIT ?,?",
    category: "SELECT * FROM data WHERE Category = ? LIMIT ?,?"
  },
  port: process.env.port || 3000,
};
