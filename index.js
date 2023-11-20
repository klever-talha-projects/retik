import Web3 from 'web3';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5'

const projectId = '8611889b7eb993eea6852f9e794ead60'
const presaleContractAddress = '0xf5F9f7F2b812D7a34545124c051766343a745056'; // presale contract address
const web3Provider = 'https://goerli.infura.io/v3/d7ef37f9c55947588866bd8e578bf417'; // Infura project ID
const abi = [{ "inputs": [{ "internalType": "address", "name": "_oracle", "type": "address" }, { "internalType": "address", "name": "_usdt", "type": "address" }, { "internalType": "address", "name": "_usdc", "type": "address" }, { "internalType": "address", "name": "_SaleToken", "type": "address" }, { "internalType": "uint256", "name": "_MinTokenTobuy", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "_id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_totalTokens", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_startTime", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_endTime", "type": "uint256" }], "name": "PresaleCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "PresalePaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "prevValue", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newValue", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "PresaleTokenAddressUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "PresaleUnpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "key", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "prevValue", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newValue", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "PresaleUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "purchaseToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokensBought", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountPaid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "TokensBought", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "TokensClaimed", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_oracle", "type": "address" }], "name": "ChangeOracleAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }], "name": "ChangeTokenToSell", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ETH_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "EditMinTokenToBuy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "bool", "name": "_status", "type": "bool" }], "name": "ExcludeAccouctFromMinBuy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "MinTokenTobuy", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SaleToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDCInterface", "outputs": [{ "internalType": "contract IERC20Metadata", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDTInterface", "outputs": [{ "internalType": "contract IERC20Metadata", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDT_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "WithdrawContractFunds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "WithdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "bool", "name": "_value", "type": "bool" }], "name": "blackListUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "blockStamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyWithEth", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "usdcAmount", "type": "uint256" }], "name": "buyWithUSDC", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "usdAmount", "type": "uint256" }], "name": "buyWithUSDT", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_oldAddress", "type": "address" }, { "internalType": "address", "name": "_newWallet", "type": "address" }], "name": "changeClaimAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_wallet", "type": "address" }], "name": "changeFundWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newAddress", "type": "address" }], "name": "changeUSDCToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newAddress", "type": "address" }], "name": "changeUSDTToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "claimAmount", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "claimableAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_price", "type": "uint256" }, { "internalType": "uint256", "name": "_nextStagePrice", "type": "uint256" }, { "internalType": "uint256", "name": "_tokensToSell", "type": "uint256" }, { "internalType": "uint256", "name": "_UsdtHardcap", "type": "uint256" }], "name": "createPresale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "currentSale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "bool", "name": "_status", "type": "bool" }], "name": "enableClaim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ethBuyHelper", "outputs": [{ "internalType": "uint256", "name": "ethAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ethToTokens", "outputs": [{ "internalType": "uint256", "name": "_tokens", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fundReceiver", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getLatestPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isBlackList", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isExcludeMinToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isExist", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "overalllRaised", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "pausePresale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "presale", "outputs": [{ "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "nextStagePrice", "type": "uint256" }, { "internalType": "uint256", "name": "Sold", "type": "uint256" }, { "internalType": "uint256", "name": "tokensToSell", "type": "uint256" }, { "internalType": "uint256", "name": "UsdtHardcap", "type": "uint256" }, { "internalType": "uint256", "name": "amountRaised", "type": "uint256" }, { "internalType": "bool", "name": "Active", "type": "bool" }, { "internalType": "bool", "name": "isEnableClaim", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "setPresaleStage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "_id", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "vestingStartTime", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_initialClaimPercent", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_vestingTime", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_vestingPercentage", "type": "uint256[]" }], "name": "setPresaleVesting", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }], "name": "unPausePresale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniqueBuyers", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "uint256", "name": "_price", "type": "uint256" }, { "internalType": "uint256", "name": "_nextStagePrice", "type": "uint256" }, { "internalType": "uint256", "name": "_tokensToSell", "type": "uint256" }, { "internalType": "uint256", "name": "_Hardcap", "type": "uint256" }, { "internalType": "bool", "name": "isclaimAble", "type": "bool" }], "name": "updatePresale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "uint256", "name": "_vestingStartTime", "type": "uint256" }, { "internalType": "uint256", "name": "_initialClaimPercent", "type": "uint256" }, { "internalType": "uint256", "name": "_vestingTime", "type": "uint256" }, { "internalType": "uint256", "name": "_vestingPercentage", "type": "uint256" }], "name": "updatePresaleVesting", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "usdtBuyHelper", "outputs": [{ "internalType": "uint256", "name": "usdPrice", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "usdtToTokens", "outputs": [{ "internalType": "uint256", "name": "_tokens", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userClaimData", "outputs": [{ "internalType": "uint256", "name": "claimAt", "type": "uint256" }, { "internalType": "uint256", "name": "claimAbleAmount", "type": "uint256" }, { "internalType": "uint256", "name": "claimedVestingAmount", "type": "uint256" }, { "internalType": "uint256", "name": "claimedAmount", "type": "uint256" }, { "internalType": "uint256", "name": "claimCount", "type": "uint256" }, { "internalType": "uint256", "name": "activePercentAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vesting", "outputs": [{ "internalType": "uint256", "name": "vestingStartTime", "type": "uint256" }, { "internalType": "uint256", "name": "initialClaimPercent", "type": "uint256" }, { "internalType": "uint256", "name": "vestingTime", "type": "uint256" }, { "internalType": "uint256", "name": "vestingPercentage", "type": "uint256" }, { "internalType": "uint256", "name": "totalClaimCycles", "type": "uint256" }], "stateMutability": "view", "type": "function" }]



//Initiate web3---------->
let web3;
let presaleContract;

window.addEventListener('load', async () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));
    }

    presaleContract = new web3.eth.Contract(abi, presaleContractAddress);

    // Update presale information on the webpage
    await updatePresaleInfo();
});


//Update the presale info on website--------->
let currentStage

async function updatePresaleInfo() {
    try {
        //check and show current stage
        currentStage = Number(await presaleContract.methods.currentSale().call());
        document.getElementById('currentStage').innerText = currentStage;

        const presaleData = await presaleContract.methods.presale(currentStage).call();


        //check the current stage price
        const currentPriceRaw = presaleData.price;
        const currentPrice = Number(currentPriceRaw) / 1e18;
        document.querySelectorAll(".token-current-price").forEach((value) => {
            value.innerHTML = "1 Retik = " + "$" + 1 / currentPrice;
        })

        //check the next stage price
        const nextPriceRaw = presaleData.nextStagePrice;
        const nextPrice = Number(nextPriceRaw) / 1e18;
        document.querySelectorAll(".token-next-stage-price").forEach((value) => {
            value.innerHTML = "Next Stage Price = " + "$" + 1 / nextPrice;
        })


        // check and show usdt raised value
        let totalRaisedinUsdtRaw = await presaleContract.methods.overalllRaised().call({
            from: presaleContractAddress
        })
        document.querySelectorAll(".totalUsdtRaisedValue").forEach((value) => {
            value.innerText = "$" + (Number(totalRaisedinUsdtRaw) / 1000000).toFixed(1);
        });


        //check the total token sold
        const totalTokenSold = parseFloat(web3.utils.fromWei(presaleData.Sold, 'ether'))
        document.querySelectorAll(".token-sold").forEach((value) => {
            value.innerText = totalTokenSold.toFixed(1);
        })

        //check the total token to sold
        const totalTokenToSell = parseFloat(web3.utils.fromWei(presaleData.tokensToSell, 'ether'))
        document.querySelectorAll(".token-to-sell").forEach((value) => {
            value.innerText = totalTokenToSell;
        })

        //update progress bar
        const percentageSold = (totalTokenSold / totalTokenToSell) * 100;
        document.querySelectorAll(".progress-bar-width").forEach((value) => {
            value.style.width = percentageSold + "%"
        })
        document.querySelectorAll(".progress-bar-value").forEach((value) => {
            value.innerText = percentageSold.toFixed(1) + "%"
        })

    } catch (error) {
        console.error("Error calling the contract method:", error);
    }
}

//wallet connect-------->
let address;
let connectButton1 = document.querySelectorAll(".connectButton-1");
let connectButton2 = document.querySelectorAll(".connectButton-2");
let buyButton = document.querySelectorAll(".buy-button");


//Set chains
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  }
  
//Create modal
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/'],
    themeMode: 'dark'
}
  
const modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId
})
  
//Trigger modal programaticaly 
connectButton1.forEach(button => {
    button.addEventListener('click', modalOpen);
});
connectButton2.forEach(button => {
    button.addEventListener('click', modalOpen);
});


function modalOpen(){
        modal.open();
  
        modal.subscribeProvider(handleProviderChange);
        const isConnected = modal.getIsConnected()
        //if wallet is already connected it changes buttons right away
        if (isConnected) {
            walletConnected();
        }

        //if wallet is not already connected
        function handleProviderChange({ isConnected }) {
            if (isConnected) {
                walletConnected();
            }
        }
}

async function walletConnected() {

    address = modal.getAddress()
    // Truncate the address to show only the first 5 characters followed by three dots
    var truncatedAddress = address.substring(0, 6) + '...';

    //this loop disable all connect buttons and show address in them. the it hide connect button from dashboard and show buy button
    for (let i = 0; i < connectButton1.length; i++) {
        connectButton1[i].innerText = truncatedAddress;
        connectButton1[i].disabled = true;
    }
    for (let i = 0; i < connectButton2.length; i++) {
        connectButton2[i].classList.add("hidden")
    }
    for (let i = 0; i < connectButton2.length; i++) {
        buyButton[i].classList.remove("hidden")
    }

    document.querySelectorAll(".user-holdings").forEach((value) => {
        value.classList.remove("hidden")
    })
    showUsersHoldings();

    let chain = await web3.eth.getChainId();

    if (chain != "1") {
        await networkHandler();
    }
}

// Function to change the network
const networkHandler = async () => {
    try {

        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: "0x5"
            }],
        });
        console.log("You have switched to the right network")

    } catch (switchError) {

        // The network has not been added to MetaMask
        if (switchError.code === 4902) {
            console.log("Please add the Polygon network to MetaMask")
        }
        console.log("Cannot switch to the network")

    }
};

//show loader----->
function showLoader() {
    document.querySelector(".blur-effect").classList.remove("invisible");
    document.querySelector(".loader").classList.remove("invisible");
}

//show hide----->
function hideLoader() {
    document.querySelector(".blur-effect").classList.add("invisible");
    document.querySelector(".loader").classList.add("invisible");
}

//Function to check user holdings------>
async function showUsersHoldings() {
    try {
        const userTokenHoldingRaw = await presaleContract.methods.claimableAmount(address, currentStage).call();
        const userTokenHolding = parseFloat(web3.utils.fromWei(userTokenHoldingRaw, 'ether')).toFixed(4);

        document.querySelectorAll(".user-holdings").forEach((value) => {
            value.innerHTML = "<a style='color: #FEC5A3; text-decoration:underline;'>Your Holdings: </a><span>" + userTokenHolding + "</span>";
        });

        return userTokenHolding;
    } catch (error) {
        console.error('Error occurred while calling claimableAmount:', error);
    }
}

//check which coin is seclected on dasboard, also changing the coin option, empty previously choosed-------->
const tokensInput = document.querySelectorAll(".get-value");
const amountInput = document.querySelectorAll(".buy-value");
let coinSelectors = document.querySelectorAll(".coin-selector")
let coinSelectorEth = document.querySelectorAll(".coin-selector-eth")
let coinSelectorUsdt = document.querySelectorAll(".coin-selector-usdt")
let coinSelectorUsdc = document.querySelectorAll(".coin-selector-usdc")
let selecedCoin = "eth" //by default set to eth

coinSelectorEth.forEach(button => {
    button.addEventListener('click',  ethSelected);
});
coinSelectorUsdt.forEach(button => {
    button.addEventListener('click',  usdtSelected);
});
coinSelectorUsdc.forEach(button => {
    button.addEventListener('click',  usdcSelected);
});

function ethSelected() {
    selecedCoin = "eth"
    for (let i = 0; i < coinSelectors.length; i++) {
        coinSelectors[i].style.backgroundColor = ""
    }
    this.style.backgroundColor = "rgb(204, 115, 255)"

    document.querySelectorAll(".coin-icon-change").forEach((image) => {
        image.src = "assets/eth-icon.png"
    })
    document.querySelectorAll(".coin-name-change").forEach((text) => {
        text.innerHTML = "Amount in <strong>ETH</strong> You Pay:"
    })
    for (let i = 0; i < tokensInput.length; i++) {
        tokensInput[i].value = "";
    }
    for (let i = 0; i < amountInput.length; i++) {
        amountInput[i].value = "";
    }
}

function usdtSelected() {
    selecedCoin = "usdt"
    for (let i = 0; i < coinSelectors.length; i++) {
        coinSelectors[i].style.backgroundColor = ""
    }
    this.style.backgroundColor = "rgb(204, 115, 255)"

    document.querySelectorAll(".coin-icon-change").forEach((image) => {
        image.src = "assets/usdt-icon.png"
    })
    document.querySelectorAll(".coin-name-change").forEach((text) => {
        text.innerHTML = "Amount in <strong>USDT</strong> You Pay:"
    })
    for (let i = 0; i < tokensInput.length; i++) {
        tokensInput[i].value = "";
    }
    for (let i = 0; i < amountInput.length; i++) {
        amountInput[i].value = "";
    }
}

function usdcSelected() {
    selecedCoin = "usdc"
    for (let i = 0; i < coinSelectors.length; i++) {
        coinSelectors[i].style.backgroundColor = ""
    }
    this.style.backgroundColor = "rgb(204, 115, 255)"

    document.querySelectorAll(".coin-icon-change").forEach((image) => {
        image.src = "assets/usdc-icon.png"
    })
    document.querySelectorAll(".coin-name-change").forEach((text) => {
        text.innerHTML = "Amount in <strong>USDC</strong> You Pay:"
    })
    for (let i = 0; i < tokensInput.length; i++) {
        tokensInput[i].value = "";
    }
    for (let i = 0; i < amountInput.length; i++) {
        amountInput[i].value = "";
    }
}


//checking the users entered amount for eth, usdt, usdc and showing corresponding value in retik---------->
let enteredAmount

document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener for the input field with ID "buy-value-1"
    const inputField1 = document.querySelector("#buy-value-1");
    inputField1.addEventListener("input", function () {
        enteredAmount = inputField1.value
        const inputValue = inputField1.value;
        updateTokensValue(inputValue);

    });

    // Add an event listener for the input field with ID "buy-value-2"
    const inputField2 = document.querySelector("#buy-value-2");
    inputField2.addEventListener("input", function () {
        enteredAmount = inputField2.value
        const inputValue = inputField2.value;
        updateTokensValue(inputValue);

    });


    // Function to update tokens amount for the specified value
    async function updateTokensValue(enteredAmount) {

        let tokens

        if (isNaN(enteredAmount)) {
            // If the value is 0 or not a valid number, set tokens to 0
            for (let i = 0; i < tokensInput.length; i++) {
                tokensInput[i].forEach().value = "0";
            }
        } else {
            try {

                if (selecedCoin == "eth") {
                    const amountInWei = web3.utils.toWei(enteredAmount.toString(), "ether");
                    tokens = await presaleContract.methods.ethToTokens(currentStage, amountInWei).call();
                }
                if (selecedCoin == "usdt") {
                    tokens = await presaleContract.methods.usdtToTokens(currentStage, enteredAmount * 1000000).call();
                }
                if (selecedCoin == "usdc") {
                    tokens = await presaleContract.methods.usdtToTokens(currentStage, enteredAmount * 1000000).call();
                }
                // Update the input field with class "get-value" with the calculated tokens
                for (let i = 0; i < tokensInput.length; i++) {
                    tokensInput[i].value = web3.utils.fromWei(tokens, "ether");
                }

            } catch (error) {
                console.error("Error:", error);
            }
        }

    }
});


//function to buy retik with eth, usdt, usdc
buyButton = document.querySelectorAll(".buy-button")
buyButton.forEach(button => {
    button.addEventListener('click', buyToken);
});
async function buyToken() {


    if (selecedCoin == "usdt") {
        showLoader()
        try {
            await window.ethereum.enable(); // Request user's permission to connect to MetaMask
    
            const web3 = new Web3(window.ethereum);
    
            const gasPrice = await web3.eth.getGasPrice();
    
            // Specify the USDT contract address and ABI
            const usdtTokenContractAddress = "0x11E036D96107575Ae82E955fDEe050A5C75ceb42";
            const usdtContractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "_decimal", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_minter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "address", "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "remaining", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
    
            const usdtContract = new web3.eth.Contract(usdtContractABI, usdtTokenContractAddress);
            const allowance = await usdtContract.methods.allowance(address, presaleContractAddress).call();
            const usdtAmountInWei = Number(enteredAmount) * 1000000;

            console.log(allowance)
    
            if (allowance < usdtAmountInWei) {
                // If the allowance is less than the desired amount, approve allowance for USDT
                const txObject = {
                    from: address,
                    to: usdtTokenContractAddress,
                    data: usdtContract.methods.approve(presaleContractAddress, usdtAmountInWei).encodeABI(),
                    gasPrice: gasPrice,
                };
        
                // Send the approval transaction using MetaMask
                const txReceipt = await web3.eth.sendTransaction(txObject);
                setTimeout(transactionSuccessfull, 500);
                hideLoader()
            }
    
            // Create a transaction object for your presale contract (replace with your specific contract and method)
    
            const txObject2 = {
                from: address,
                to: presaleContractAddress,
                data: presaleContract.methods.buyWithUSDT(usdtAmountInWei).encodeABI(), // Use the correct method name
                gasPrice: gasPrice,
            };
    
            // Send the transaction to the presale contract using MetaMask
            const txReceipt2 = await web3.eth.sendTransaction(txObject2);
            console.log('Presale Transaction Hash:', txReceipt2.transactionHash);
    
            // Update presale information
            updatePresaleInfo();
            hideLoader()
        } catch (error) {
            console.error('Error buying tokens:', error);
            if (error.message.toLowerCase().includes("user denied transaction")) {
                // Display an alert to the user
                setTimeout(transactionDenied, 500);
            }
            if (error.message.toLowerCase().includes("insufficient funds")) {
                // Display an alert to the user
                setTimeout(insuficientFunds, 500);
            }hideLoader()
        }

    }
    if (selecedCoin == "usdc") {
        showLoader()
        try {
            await window.ethereum.enable(); // Request user's permission to connect to MetaMask
    
            const web3 = new Web3(window.ethereum);
    
            const gasPrice = await web3.eth.getGasPrice();
    
            // Specify the USDC contract address and ABI
            const usdtTokenContractAddress = "0x11E036D96107575Ae82E955fDEe050A5C75ceb42";
            const usdtContractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "_decimal", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_minter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "address", "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "remaining", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
    
            const usdtContract = new web3.eth.Contract(usdtContractABI, usdtTokenContractAddress);
            const allowance = await usdtContract.methods.allowance(address, presaleContractAddress).call();
            const usdtAmountInWei = Number(enteredAmount) * 1000000;

            console.log(allowance)
    
            if (allowance < usdtAmountInWei) {
                // If the allowance is less than the desired amount, approve allowance for USDT
                const txObject = {
                    from: address,
                    to: usdtTokenContractAddress,
                    data: usdtContract.methods.approve(presaleContractAddress, usdtAmountInWei).encodeABI(),
                    gasPrice: gasPrice,
                };
        
                // Send the approval transaction using MetaMask
                const txReceipt = await web3.eth.sendTransaction(txObject);
                setTimeout(transactionSuccessfull, 500);
                hideLoader()
            }
    
            // Create a transaction object for your presale contract (replace with your specific contract and method)
    
            const txObject2 = {
                from: address,
                to: presaleContractAddress,
                data: presaleContract.methods.buyWithUSDC(usdtAmountInWei).encodeABI(), // Use the correct method name
                gasPrice: gasPrice,
            };
    
            // Send the transaction to the presale contract using MetaMask
            const txReceipt2 = await web3.eth.sendTransaction(txObject2);
            console.log('Presale Transaction Hash:', txReceipt2.transactionHash);
    
            // Update presale information
            updatePresaleInfo();
            hideLoader()
        } catch (error) {
            console.error('Error buying tokens:', error);
            if (error.message.toLowerCase().includes("user denied transaction")) {
                // Display an alert to the user
                setTimeout(transactionDenied, 500);
            }
            if (error.message.toLowerCase().includes("insufficient funds")) {
                // Display an alert to the user
                setTimeout(insuficientFunds, 500);
            }hideLoader()
        }

    }
    if (selecedCoin == "eth") {
        try {
            showLoader()
            // Check if MetaMask is installed and connected
            if (typeof window.ethereum !== 'undefined') {
                await window.ethereum.enable(); // Request user's permission to connect to MetaMask

                const web3 = new Web3(window.ethereum);

                const gasPrice = await web3.eth.getGasPrice();
                const valueInWei = web3.utils.toWei(enteredAmount.toString(), 'ether');

                // Create a transaction object
                const txObject = {
                    from: address,
                    to: presaleContractAddress,
                    value: valueInWei,
                    gasPrice: gasPrice,
                    data: presaleContract.methods.buyWithEth().encodeABI(), // Use the correct method name
                };

                // Send the transaction using MetaMask's provider
                await web3.eth.sendTransaction(txObject);
                setTimeout(transactionSuccessfull, 500);

                updatePresaleInfo()
                hideLoader()
            } else {
                console.error('MetaMask is not installed or not connected.');
            }
        } catch (error) {
            console.error('Error buying tokens:', error);
            if (error.message.toLowerCase().includes("user denied transaction")) {
                // Display an alert to the user
                setTimeout(transactionDenied, 500);
            }
            if (error.message.toLowerCase().includes("insufficient funds")) {
                // Display an alert to the user
                setTimeout(insuficientFunds, 500);
            }hideLoader()
        }
    }
}