module.exports = {
  contracts_build_derectory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 9545, // Standard Ethereum port (default: none)
      network_id: "5777", // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: "0.8.10",
    },
  },
};
