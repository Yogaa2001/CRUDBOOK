const randomize = require('randomatic');
const uniCodeGenerator = (type, no = 4) => {
    try {
        return randomize(type, no)
    } catch (error) {
      return error
    }
  }

module.exports = {uniCodeGenerator}
