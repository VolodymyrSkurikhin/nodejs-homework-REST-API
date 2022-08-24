const cntrWrapper = (cntr) => {
  const fn = async (req, res, next) => {
    try {
      await cntr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};

module.exports = cntrWrapper;
