module.exports = (req, res) => {
  res.setHeader('Content-Type', ['text/html;charset=UTF-8']);
  res.statusCode = 200;
  res.write('[{"id":1,"name":"Joe"}]');
  res.end();
};
