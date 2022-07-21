module.exports = function validateSpec(spec, data, optionalConfig = {}) {
  const { error, value } = spec.validate(data, {
    allowUnknown: true,
    stripUnknown: true,
    errors: {
      wrap: {
        label: '',
      },
    },
    ...optionalConfig,
  });
  if (error) {
    throw new Error(error.message);
  }
  return value;
};
