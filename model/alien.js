const mongoose = require('mongoose');

const alienScheme = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
    },
    message: props => `${props.value} is not a valid email!`
  },
  tech: { type: String, required: true },
  is_admin: { type: String, required: true, default: false },
  date: { type: Date, default: Date.now }
});               

// alienScheme.path('email') instanceof mongoose.SchemaType; // true
// alienScheme.path('email') instanceof mongoose.Schema.Types.String; // true
// alienScheme.path('email').instance; // 'String'
// console.log(alienScheme.path('email'));

module.exports = mongoose.model('Alien', alienScheme);
