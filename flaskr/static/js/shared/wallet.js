// const bsc_rpc_endpoint = "https://data-seed-prebsc-1-s1.binance.org:8545/"
const infura = "https://rinkeby.infura.io/v3/9c7e70b4bf234955945ff87b8149926e"

// web3 = new Web3(new Web3.providers.HttpProvider(bsc_rpc_endpoint));
if (typeof web3 !== 'undefined') {
    // Mist, Metamask
    web3 = new Web3(web3.currentProvider);
    console.log("current provider")
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider(infura));
    console.log("current provider else")
}
// window.ethereum.enable();
const defaultGasPrice = 2000000000
let gasPrice
const approveGas = 100573
const mintingGas = 200573
const listingGas = 400573
const unlistingGas = 300573
const listingAuctionGas = 300573
const buyGas = 250573
const sellGas = 167573
const bidGas = 167573

const minHotDeals = 3
const mintingFees = 100000000000000

const mintingFeesToken = 10000000000000000000
const mintingFeesNative = 100000000000000

async function getGasPrice(){
  gasPrice = (await web3.eth.getGasPrice()) || defaultGasPrice
  console.log("gasPrise: ", gasPrice)
}
getGasPrice()
// async function loadGasPrice(){
//   await getGasPrice()
// }
//
// loadGasPrice()
//
// console.log("gasPrise: ", gasPrice)
// window.web3.eth.getGasPrice(function(e, r) { console.log(r) })
