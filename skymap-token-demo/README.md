# Soar Platform - ethereum smart contracts

This is project for smart contracts used in Soar platform

## Technical stack

#### Smart contract/Solidity
- Truffle

## Prerequisites
In order to run the Soar platform, you will need [Node.js](https://nodejs.org) (tested with version 8.x.x). This will include npm, needed to install dependencies.

## Installation and Building

1. Install truffle and an ethereum client. For local development, try Ganache CLI.
    ```javascript
    npm install -g truffle
    npm install -g ganache-cli
    ```

2. Install yarn.

    ```javascript
    ## MacOS
    brew install yarn

    ## Windows
    https://yarnpkg.com/en/docs/install#windows-tab
    ```

3. Download or clone repository.

4. Install the node dependencies.
    ```javascript
    yarn install
    ```

5. Run Ganache CLI.
    ```javascript
    ganache-cli
    ```

6. Compile and migrate the contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```
7. Truffle's own suite is included for smart contracts. Be sure you've compile your contracts before running jest, or you'll receive some file not found errors.
    ```javascript
    // Runs Truffle's test suite for smart contract tests.
    truffle test
    ```