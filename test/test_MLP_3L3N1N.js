const fs = require('fs');
const MLP_3L_3n = artifacts.require("MLP_3L_3n1n.sol");
const fsPromises = fs.promises;

const {classify, upload_trainingData, upload_weightsBiases} = require('./util_functions.js');

// gas cost of diff functions
let gas_classify = 0;
let gas_upload_weightBias = 0;
let gas_deployment = 0;
let gas_upload_testData = 0;

//saves log into a file
const originalConsoleLog = console.log;
console.log = function (...args) {
    originalConsoleLog.apply(console, args);  // This will ensure the logs still display in the console
    fs.appendFileSync('./results/OnChain_accuracy', args.join(' ') + '\n');
};

contract("MLP_3L_3n.sol", accounts => {
     let instance;

    before(async () => {
        instance = await MLP_3L_3n.new(3);
        gas_deployment += await MLP_3L_3n.new.estimateGas(3)
    });

    // test deployment
    it("deployment", async () => {
        assert(instance.address !== "");
    });

    it("Upload weights and biases", async () => {
        gas_upload_weightBias = await upload_weightsBiases(instance, fsPromises, 'MLP_3L3.json',3)
    });

    it("Upload training data", async () => {
        gas_upload_testData += await upload_trainingData(instance, fsPromises)
    });

    it("Classify", async () => {
        gas_classify += await classify(instance);
    });

    after(() => {
        console.log('Name: MLP_3L_3n');
        console.log(`Deployment Gas: ${gas_deployment}`);
        console.log(`Test data upload gas: ${gas_upload_testData}`);
        console.log(`Weights and biases upload gas: ${gas_upload_weightBias}`);
        console.log(`Classify gas: ${gas_classify}\n`);
    });

});

