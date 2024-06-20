// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract StoringNo {
    uint256[] no;

    function addNo(uint256 _no) public {
        no.push(_no);
    }

    function getNoLength() public view returns (uint256) {
        return no.length;
    }

    function getNo(uint256 _index) public view returns (uint256) {
        return no[_index];
    }
}
