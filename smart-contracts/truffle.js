module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "127.0.0.1",
      from: "0x220acc01169a1e887ecc35e53f0eee86329d377a",
      port: 8545,
      network_id: "4" // Match any network id

    }
  }
};
