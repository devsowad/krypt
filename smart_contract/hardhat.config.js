require('@nomiclabs/hardhat-waffle');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/nIt7ypgbg87SJ-v-IzvsJdIq6FFEsF7l',
      accounts: [
        'ab293099ce3fe61eb112243f44695f1c9761c051c0fa302b0a8e5664f7fa6bd4',
      ],
    },
  },
};
