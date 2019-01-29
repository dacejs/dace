module.exports = (req, res) => {
  const { page } = req.query;
  const data = [];

  for (let i = 0; i < 10; i++) {
    const id = i + 1 + ((page - 1) * 10);
    data.push({ id, title: `标题${id}` });
  }

  res.end(JSON.stringify(data));
};
