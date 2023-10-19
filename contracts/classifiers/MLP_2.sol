// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

import "../libraries/ABDKMath64x64.sol";

contract MLP_2 {
    int[][] public fc;
    int[][] public fc2;

    int[] public inputData;
    int[] public classifiedResults;

    function setfc(int[][] memory value) public {
        for (uint256 i = 0; i < value.length; ++i) {
            for (uint256 j = 0; j < value[0].length; ++j) {
                fc[i][j] = value[i][j];
            }
        }
    }

    function setfc2(int[][] memory value) public {
        for (uint256 i = 0; i < value.length; ++i) {
            for (uint256 j = 0; j < value[0].length; ++j) {
                fc2[i][j] = value[i][j];
            }
        }
    }
    constructor(uint256 input_dim) {
        fc = new int[][](input_dim);
        for (uint256 i = 0; i < input_dim; i++) {
            fc[i] = new int[](2);
        }

        fc2 = new int[][](2);
        for (uint256 i = 0; i < 2; i++) {
            fc2[i] = new int[](2);
        }
    }

    function predict(int x) public view returns (int) {
        int[] memory res1 = new int[](2);
        int c;
        for (uint256 i = 0; i < 2; ++i) {
            c = fc[i][0] * x;
            res1[i] = c > 0 ? c : int256(0);  // Activation (ReLu)
        }

        int res2 = 0;
        for (uint256 i = 0; i < 2; ++i) {
            res2 += fc2[i][0] * res1[i];
        }

        return res2 > 0 ? res2 : int256(0);  // Activation (ReLu)
    }


    function classifyAndStore() public {
        require(inputData.length > 0, "No input data provided");

        classifiedResults = new int[](inputData.length);

        for (uint i = 0; i < inputData.length; i++) {
            classifiedResults[i] = predict(inputData[i]);
        }
    }

    function getClassifiedResults() public view returns (int[] memory) {
        return classifiedResults;
    }
}







