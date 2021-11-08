from web3 import Web3, HTTPProvider

import json

CHAIN_ID = 3 # 4 for Rinkeby, 56 for BSC, 97 for BSC testnet,  Ropsten 3
GAS_LIMIT = 356608
GAS_PRICE = 80 # 5 for BSC mainnet, 80 for BSC testnet, allways check network before

nft_json = "./flaskr/abi/erc721.json"

with open(nft_json) as f:
    nft_artifact = json.load(f)
nft_abi = nft_artifact['abi']

nft_address = "0xC817571B157FA1B1652b5Ac7F47693AF3cE96641"

# w3 = Web3(HTTPProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
w3 = Web3(HTTPProvider("https://rinkeby.infura.io/v3/9c7e70b4bf234955945ff87b8149926e"))
