const levelOne = (a, b) => a + b;

const levelTwo = (letras) => {
    return letras.length === 0
        ? ""
        : letras.split('').map((letter, index) => {
            if (index % 2 === 0||index === 0) return letter
        }).join('')
};

const levelThree = (a, b) => [...a, ...b].sort((a, b) => a - b);

const levelFour = (num) => {
    const summation = num
        .toString()
        .split('')
        .reduce((total, act) => {
            return total + Number(act)
        }, 0)
    
    const reverse = summation
        .toString()
        .split('')
        .reverse()
        .map(e => Number(e))
        .join('')

    return (num === (summation * reverse))
};

module.exports = { levelOne, levelTwo, levelThree, levelFour };