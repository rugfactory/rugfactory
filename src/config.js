const contractPerNetwork = {
  mainnet: 'rug-testing.near',
  testnet: 'rug-testing.testnet',
};

const shitTokenPerNetwork = {
  mainnet: 'shit-1170.meme-cooking.near',
  testnet: 'shit-237.factory.v10.meme-cooking.testnet',
};

const refPoolPerNetwork = {
  mainnet: 'https://dex.rhea.finance/pools/',
  testnet: 'https://testnet.ref.finance/pools/',
};

const nearBlocksPerNetwork = {
  mainnet: 'https://nearblocks.io',
  testnet: 'https://testnet.nearblocks.io',
};

const networkId = localStorage.getItem('networkId') || 'testnet';

export const NetworkId = networkId;

export const RugFactoryContract = contractPerNetwork[NetworkId];
export const ShitTokenContract = shitTokenPerNetwork[NetworkId];
export const RefPoolUrl = refPoolPerNetwork[NetworkId];
export const NearBlocksUrl = nearBlocksPerNetwork[NetworkId];
