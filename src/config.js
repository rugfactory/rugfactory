const contractPerNetwork = {
  mainnet: 'rug-testing.near',
  testnet: 'rug-testing.testnet',
};

const shitTokenPerNetwork = {
  mainnet: 'shit-1170.meme-cooking.near',
  testnet: 'shit-237.factory.v10.meme-cooking.testnet',
};

export const NetworkId = 'testnet';
export const RugFactoryContract = contractPerNetwork[NetworkId];
export const ShitTokenContract = shitTokenPerNetwork[NetworkId];
