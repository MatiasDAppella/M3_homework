const antiTrollsSecurity = (string) => {
    return string.replace(/[aeiou]/gi, '')
};

module.exports = antiTrollsSecurity;
