const getVotes = ({ Vote }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const votes = await Vote.find({ answerId: _id });
    res.status(200).send({ votes });
  } catch (error) {
    next(error);
  }
};

module.exports = getVotes;
