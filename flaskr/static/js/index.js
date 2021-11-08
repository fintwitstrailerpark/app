var simpleMarketplace_instance = new web3.eth.Contract(simpleMarketplace_abi, simpleMarketplace_address);
var nft_instance = new web3.eth.Contract(erc721_abi, erc721_address);

async function load(){
  let totalSupply = await nft_instance.methods.totalSupply().call()
  console.log("totalSupply: ", totalSupply)
  let maxToMint = await simpleMarketplace_instance.methods.maxToMint().call()
  console.log("maxToMint: ", maxToMint)
  let minted = document.querySelector('#minted')
  minted.innerHTML = totalSupply + "/" + maxToMint + " minted"
}

load()

function updateValue(){
  console.log("updateValue")
  let target = document.querySelector('#count')
  if(parseInt(target.value) < 1){
    document.querySelector('#count').value = 1
  }
}

async function mint(){
  console.log("minting")

  let mintFee = await simpleMarketplace_instance.methods.mintFee().call()

  let target = document.querySelector('#count')
  let count = 1
  count = parseInt(target.value)
  count = count.toString()
  var price = mintFee * count
  hexNativeFees = web3.utils.toHex(price)
  const acc = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  // var accounts = window.web3.eth.getAccounts().then(function(acc){
      parameter = {
          value: hexNativeFees,
          from: acc[0],
          gas: web3.utils.toHex(mintingGas),
          gasPrice: web3.utils.toHex(gasPrice)
      }

      simpleMarketplace_instance.methods.mint(1).send(parameter, (err, transactionHash) => {
          window.alert("Transaction sent: "+transactionHash)
          if(transactionHash){
          $('main').append('<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
            <p style="position: absolute; color: White; top: 50%; left: 45%;">\
            Pending transactions, please wait...\
            <!-- img src="static/assets/create/loader.gif" -->\
            </p>\
            </div>');
          }
          tx_hash = transactionHash
      }).on('confirmation', () => {}).then((newContractInstance) => {
        setTimeout(removeLoader, 2000);
          window.alert('Minted')

      })
      .catch(function(error){
        setTimeout(removeLoader, 2000);
        window.alert("Minting failed")
      })
    // })

}
