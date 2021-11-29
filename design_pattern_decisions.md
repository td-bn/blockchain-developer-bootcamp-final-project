## inter-contract communication
Inter contract communication using interfaces to maintain type 
safety. Pattern of inter contract communication: `Interface(adress).functionName(...args)`
- Vault.sol, Controller.sol, AaveConnector.sol, ETHStrategy.sol


## inheritance
Vault.sol inherits from ERC20 to provide liquidity token to providers.
