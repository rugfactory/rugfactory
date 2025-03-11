const contractPerNetwork = {
  mainnet: 'rug-testing.near',
  testnet: 'rugfun.testnet',
};

const shitTokenPerNetwork = {
  mainnet: 'shit-1170.meme-cooking.near',
  testnet: 'shit-237.factory.v10.meme-cooking.testnet',
};

const refPoolPerNetwork = {
  mainnet: 'https://dex.rhea.finance/pool/',
  testnet: 'https://testnet.ref.finance/pool/',
};

export const NetworkId = 'testnet';
export const RugFactoryContract = contractPerNetwork[NetworkId];
export const ShitTokenContract = shitTokenPerNetwork[NetworkId];
export const RefPoolUrl = refPoolPerNetwork[NetworkId];
