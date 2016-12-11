exports.config = {
  mysql: {
    host: '',
    user: '',
    password: '',
    database: ''
  },
  queries: {
    download: "SELECT * FROM data",
    all:      "SELECT * FROM data LIMIT ?,?",
    state:    "SELECT * FROM data WHERE State = ? LIMIT ?,?",
    city:     "SELECT * FROM data WHERE City = ? LIMIT ?,?",
    category: "SELECT * FROM data WHERE Category = ? LIMIT ?,?"
  },
  port: 3000,
};
