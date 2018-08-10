// Copy this file to credentials.js and edit with your own information.
module.exports = {
  cookieSecret : '',
  mongo: {
    development: {
      connectionString: 'mongodb://user:password@host:port/database'
    },
    production: {
      connectionString: 'mongodb://user:password@host:port/database'
    }
  },
  fbstate: '',
  authProviders: {
    facebook: {
      development: {
        appId: '',
        appSecret: ''
      },
      production: {
        appId: '',
        appSecret: ''
      }
    }
  }
};
