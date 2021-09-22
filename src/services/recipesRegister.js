const errorMessages = require('../utils/errorMessages');
const httpStatus = require('../utils/httpStatus');
const models = require('../models');

module.exports = async (req) => {
  const { body } = req;
  const { name, ingredients, preparation } = body;
  const { user: { id } } = req;

  const newBody = { ...body, userId: id };

  if (!name || !ingredients || !preparation) {
    throw errorMessages.INVALID_ENTRIES;
  }

  const createdRecipe = await models.createRecipe(newBody);

  return {
    status: httpStatus.OK_STATUS,
    recipe: createdRecipe,
  };
};