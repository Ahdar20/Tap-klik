let playerScore = 0;
let walletAddress = null;

function playGame() {
  const luckyNumber = Math.floor(Math.random() * 100) + 1;
  const resultEl = document.getElementById("result");

  if (luckyNumber > 90) {
    resultEl.textContent = `🎉 You got ${luckyNumber}! You win a reward!`;
    playerScore += 1;
  } else {
    resultEl.textContent = `😢 You got ${luckyNumber}. Try again!`;
  }
}

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    walletAddress = accounts[0];
    alert("Connected: " + walletAddress);
  } else {
    alert("Please install MetaMask.");
  }
}

function claimReward() {
  if (!walletAddress) {
    alert("Connect your wallet first.");
    return;
  }

  const rewards = JSON.parse(localStorage.getItem("rewards") || "{}");
  rewards[walletAddress] = (rewards[walletAddress] || 0) + 1;

  localStorage.setItem("rewards", JSON.stringify(rewards));
  alert(`Reward saved for ${walletAddress}. Total: ${rewards[walletAddress]}`);
}
let provider, signer, contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    alert("Wallet connected: " + address);

    // Inisialisasi kontrak
    const contractAddress = "0xYourSmartContractAddress";
    const contractABI = [/* ABI dari kontrak */];
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert("Please install MetaMask.");
  }
}
