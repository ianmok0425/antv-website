const tokenAddress = '0x60a5445ff3c1a8398770f0d27305752f017211b8';
const tokenSymbol = 'ANTV';
const tokenDecimals = 18;
const tokenImage = 'https://antvcoin.com/assets/img/logo.png';

const initialize = () => {
    //Basic Actions Section
    const onboardButton = document.getElementById('connectButton');

    //Created check function to see if the MetaMask extension is installed
    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const {
            ethereum
        } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
    const addANTVTokenToWallet = async () => {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                onboardButton.disabled = true
                onboardButton.innerHTML = 'Added ANTV To Wallet';
            } else {
                onboardButton.innerHTML = 'Add ANTV To Wallet';
            }
        } catch (error) {
            console.log(error);
        }
    }
    const connectToWallet = async () => {
        try {
            console.log("connecting to the wallet")
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            const rsp = await ethereum.request({
                method: 'eth_requestAccounts'
            });
            console.log("rsp: " + rsp)
            onboardButton.innerHTML = 'Add ANTV To Wallet';
            onboardButton.onclick = addANTVTokenToWallet;
        } catch (error) {
            onboardButton.innerHTML = 'Fail To Connect Wallet';
            onboardButton.onclick = connectToWallet;
            console.error(error);
        }
    };
    //------Inserted Code------\\
    const MetaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            //If it isn't installed we ask the user to click to install it
            onboardButton.innerText = 'Please install MetaMask';
            //The button is now disabled
            onboardButton.disabled = true;
        } else {
            //If MetaMask is installed we ask the user to connect to their wallet
            onboardButton.innerText = 'Connect To Wallet';
            //When the button is clicked we call this function to connect the users MetaMask Wallet
            onboardButton.onclick = connectToWallet;
            //The button is now disabled
            onboardButton.disabled = false;
        }
    };
    MetaMaskClientCheck();
    //------/Inserted Code------\\
};

window.addEventListener('DOMContentLoaded', initialize);