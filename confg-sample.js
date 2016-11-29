exports.config = {
  mysql: {
    host: '',
    user: '',
    password: '',
    database: ''
  },
  queries: {
    default: "SELECT * FROM data LIMIT %offset%,%limit%",
    state: "SELECT * FROM data WHERE State = '%state%' LIMIT %offset%,%limit%",
    city: "SELECT * FROM data WHERE City = '%city%' LIMIT %offset%,%limit%"
  },
  port: 3000
};
