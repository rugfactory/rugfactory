# Critical Files and Components

## Core Configuration Files

These files are essential for project stability and should be modified with caution:

### 1. vite.config.js
- Contains critical polyfills for Buffer and global objects
- Configures essential aliases and plugins
- Modifications may break wallet integration

### 2. eslint.config.js
- Maintains code quality standards
- Configured specifically for React 18.3
- Changes could affect development workflow

### 3. package.json
- Manages critical dependencies
- Wallet-related packages are version-sensitive
- Update dependencies with caution, especially:
  - near-wallet-selector packages
  - wagmi packages
  - web3modal packages

## Wallet Integration

### Core Wallet Files

1. `/src/wallets/near.js`
- Implements NEAR wallet selector integration
- Handles wallet connection and transactions
- Contains critical methods for interacting with NEAR blockchain
- Modifications require thorough testing

2. `/src/wallets/web3modal.js`
- Configures Web3Modal for Ethereum wallet integration
- Contains chain configuration for NEAR EVM
- Changes could affect wallet connectivity

### Network Selection

The network selection is primarily handled through:
- Environment configuration
- Wallet initialization in `near.js`
- Chain configuration in `web3modal.js`

Key aspects:
- Default network is set to 'testnet'
- Network ID affects RPC endpoints and contract interactions
- Chain ID configuration in web3modal.js must match the selected network

### Polyfills

`/src/polyfills.js` is critical for:
- Buffer implementation
- Global object compatibility
- Required for wallet functionality

## Development Guidelines

1. Always test wallet integration after updating dependencies
2. Maintain compatibility with both NEAR and Ethereum wallets
3. Keep polyfill configurations intact
4. Test on both testnet and mainnet when modifying network-related code
5. Preserve existing error handling in wallet integration

## Version Control

The following files should be kept in version control:
- All configuration files
- Wallet integration files
- Documentation

Excluded from version control (configured in .gitignore):
- `node_modules`
- `dist`
- `pnpm-lock.yaml`
- `.DS_Store`