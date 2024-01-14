const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Autehentication Passport',
      version: '1.0.0',
      description: '',
    },
  },
  apis: ['./routes/login.js','./routes/register.js'], 
};

module.exports = swaggerOptions;
