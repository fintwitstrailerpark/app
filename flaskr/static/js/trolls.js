var simpleMarketplace_instance = new window.web3.eth.Contract(simpleMarketplace_abi, simpleMarketplace_address);
async function load(){

  let canMintFree = await simpleMarketplace_instance.methods.canMintFree(1).call()

  if(canMintFree == true){
    document.querySelector('#price').innerHTML = "0.00"
  }else{
        document.querySelector('#price').innerHTML = `${0.01}`
  }
}
load()

document.querySelector('#arrow-up').addEventListener('click', async () => {
    let target = document.querySelector('#count')
    let count
    if(target.innerHTML >= 1){
        count = parseInt(target.innerHTML) + 1
        target.innerHTML = count
    }
    console.log("count: ", count)
    let canMintFree = await simpleMarketplace_instance.methods.canMintFree(count).call()
    if(canMintFree == true){
      document.querySelector('#price').innerHTML = "0.00"
    }else{
          document.querySelector('#price').innerHTML = `${count*0.01}`
    }
})

document.querySelector('#arrow-down').addEventListener('click', async () => {
  let target = document.querySelector('#count')
  let count
  if(target.innerHTML >= 1){
      count = parseInt(target.innerHTML) - 1
      target.innerHTML = count
  }
  console.log("count: ", count)
  let canMintFree = await simpleMarketplace_instance.methods.canMintFree(count).call()
  if(canMintFree == true){
    document.querySelector('#price').innerHTML = "0.00"
  }else{
        document.querySelector('#price').innerHTML = `${count*0.01}`
  }
})

async function updatePage(){
  let minted = document.querySelector('#minted')
  let total = document.querySelector('#maxSupply')

  let maxSupply = await simpleMarketplace_instance.methods.maxToMint().call()

  let totalSupply = await simpleMarketplace_instance.methods.totalSupply().call()

  total.innerText = maxSupply + " Freaky Trolls on the Ethereum Blockchain ready to be deployed in a game"

  minted.innerText = totalSupply + "/" +maxSupply +" Trolls already found their homes."

  let canMintFree = await simpleMarketplace_instance.methods.canMintFree(1).call()
  console.log("canMintFree: ", canMintFree)
  if(canMintFree == true){
    console.log("can mint free")
    document.querySelector('#price').innerHTML = "0.00"
  }
}

updatePage()

async function mint(){
  console.log("minting")
  let target = document.querySelector('#count')
  let count = 1
  count = parseInt(target.innerText)
  // if(target.innerHTML >= 1){
  //     count = parseInt(target.innerHTML) + 1
  //     count = count.innerText
  // }
  // if(target.innerHTML > 1){
  //     count = parseInt(target.innerHTML) - 1
  //     count = count.innerText
  // }
  // var count = target.innerHTML
  // console.log("count: ", count.innerText)
  // count = count.innerText
  var price = document.querySelector('#price').innerHTML
  console.log("price 0: ", price*1000000000000000000)
  var price = price*1000000000000000000
  // console.log("price2: ", price2)
  // var price3 = count * price2
  // console.log("price3: ", price3)
  count = count.toString()
  hexNativeFees = window.web3.utils.toHex(price)
  console.log("hexNativeFees: ", hexNativeFees)
  // hexNativeFees = 0x2386f26fc1
  // count = count.toString()
  console.log("count: ", count)

  let canMintFree = await simpleMarketplace_instance.methods.canMintFree(count).call()

  if(canMintFree == true){
    hexNativeFees = 0
  }

  // console.log("totalSupply: ", totalSupply)
  console.log("canMintFree: ", canMintFree)
  var accounts = window.web3.eth.getAccounts().then(function(acc){
      parameter = {
          value: hexNativeFees,
          from: acc[0],
          gas: web3.utils.toHex(mintingGas*count),
          gasPrice: web3.utils.toHex(gasPrice)
      }

      simpleMarketplace_instance.methods.mint(count).send(parameter, (err, transactionHash) => {
          window.alert("Transaction sent: "+transactionHash)
          if(transactionHash){
          $('main').append('<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
            <p style="position: absolute; color: White; top: 50%; left: 45%;">\
            Pending transactions, please wait...\
            <img src="static/assets/create/loader.gif">\
            </p>\
            </div>');
          }
          tx_hash = transactionHash
      }).on('confirmation', () => {}).then((newContractInstance) => {
        setTimeout(removeLoader, 2000);
          window.alert('Minted')
          // window.location = "/mynfts"
          // create()
      })
      .catch(function(error){
        setTimeout(removeLoader, 2000);
        window.alert("Minting failed")
      })
    })
  // console.log("price: ", price)

}

function create(){
  console.log("creating")

  // if(descriptionInput.value && nameInput.value){
    // file = e.target.files[0]
    // formData.append('image', URL.createObjectURL(loadedFile))
    // category = $("input[type='radio'][name='category']:checked").val()
    // console.log("category: ", category)
    // let metadata = {'description':descriptionInput.value,'name':nameInput.value,'artist':minter,'category':category};
    // let formData = new FormData()
    // formData.append('file', loadedFile)
    // formData.append('metadata', JSON.stringify(metadata))
    // console.log("metadata added")
    // formData.append('id', 'tokenId')
    // formData.append('description', 'description')
    // console.log("loaded file: ", URL.createObjectURL(loadedFile))
    // const category = document.querySelector('#category')
    // console.log("category: ", category)

    // window.$.ajax({
    let target = document.querySelector('#count')
    let metadata = {'count':target.innerText};
    let formData = new FormData()
    formData.append('count', target.innerText)

    $('main').append('<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
      <p style="position: absolute; color: White; top: 50%; left: 45%;">\
      Minting, please wait...\
      <img src="static/assets/create/loader.gif">\
      </p>\
      </div>');

    $.ajax({
      type: "POST",
      url: `/metadata`,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      dataType : 'json',
      success: function(data) {
                  console.log('Success!');
              },
    }).done(response => {
      // $('main').append('<div id="divLoading" style="margin: 0px; padding: 0px; position: fixed; right: 0px; top: 0px; width: 100%; height: 100%; background-color: rgb(102, 102, 102); z-index: 30001; opacity: 0.8;">\
      //   <p style="position: absolute; color: White; top: 50%; left: 45%;">\
      //   Loading, please wait...\
      //   <img src="static/assets/create/loader.gif">\
      //   </p>\
      //   </div>');
      // console.log("response: ", response)
      // var obj = JSON.parse(response)
      // setTimeout(removeLoader, 2000);
      // console.log('response["status"]: ', obj["status"])
      // console.log("response: ", obj)
      mint()
      // if (obj["status"] == 'success') {
      //   // alertify.success(['status']["status"])
      //   // setTimeout(removeLoader, 2000);
      //   mint()
      //   // console.log('response.msg : ', obj['status'])
      //   // resolve(response.result)
      // } else {
      //
      //   console.log('error 1')
      //   // alertify.error(response['status'] || "Some error occurred!")
      //   // reject(response.msg)
      // }
    })
    .fail(err => {
      console.log(err)
      // alertify.error(err.responseJSON && err.responseJSON.msg || err.responseText || "Some error occurred!")
      // reject(err.responseJSON || err.responseText || false)
    })
  // }

}
