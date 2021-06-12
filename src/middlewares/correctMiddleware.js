const correctMiddleware = (req, res) => {
  res.send({
    OK: 1,
    message: 'usuario añadido',
    id: req.response.id,
  });
};

module.exports = correctMiddleware;
