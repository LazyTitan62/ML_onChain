const {Web3} = require('web3');
const contractData = require('../build/contracts/MLP_Test.json');  // Replace with the path to your ABI

const web3 = new Web3('HTTP://127.0.0.1:7545');  // Replace with your provider
const contract = new web3.eth.Contract(contractData.abi, '0x9f0dDa3B3eB2072a54a445C49Fc0ee32d280a9A0');  // Replace with your contract's address

function toPRBMathFormat(value) {
    return BigInt(Math.round(value * 10**18));
}
function fromPRBMathFormat(value) {
    return Number(value) / 10**18;
}
async function multiplyNumbers(value1, value2) {
    const scaledValue1 = toPRBMathFormat(value1);
    const scaledValue2 = toPRBMathFormat(value2);
    console.log(scaledValue1);
    console.log(scaledValue2);
    const result = await contract.methods.signedMul(5e18, 5.3e18).call();
    console.log(fromPRBMathFormat(result));
}

multiplyNumbers(2.5, 1.1);
