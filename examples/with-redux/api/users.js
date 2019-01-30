module.exports = (req, res) => {
  const data = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
    { id: 4, name: '钟六' }
  ];

  res.end(JSON.stringify(data));
};
