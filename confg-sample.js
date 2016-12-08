exports.config = {
  mysql: {
    host: '',
    user: '',
    password: '',
    database: ''
  },
  queries: {
    download: "SELECT * FROM data",
    all: "SELECT * FROM data LIMIT %offset%,%limit%",
    state: "SELECT * FROM data WHERE State = '%state%' LIMIT %offset%,%limit%",
    city: "SELECT * FROM data WHERE City = '%city%' LIMIT %offset%,%limit%",
    category: "SELECT * FROM data WHERE Category = '%category%' LIMIT %offset%,%limit%"
  },
  port: 3000,
  tools: {
    buildQuery: function buildQuery(query, limit, offset, replaceString, replaceWith) {
      return query.replace('%offset%', offset)
      .replace('%limit%', limit)
      .replace('%' + replaceString + '%', formatParamter(replaceWith));
    }
  }
};

// Utility functions.
function formatParamter(parameter) {
  if(typeof(parameter) == 'string') {
    return decodeURIComponent(parameter.toUpperCase());
  }
  return;
}
