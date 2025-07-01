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
  if (typeof window.ethereum === "undefined") {
    alert("🦊 Please install MetaMask to continue.");
    return;
  }

  try {
    const somniaChainId = "0xc470"; // 50312 in hex

    // Cek jika sudah di jaringan Somnia
    const currentChain = await ethereum.request({ method: "eth_chainId" });
    if (currentChain !== somniaChainId) {
      // Tambahkan jaringan Somnia
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: somniaChainId,
            chainName: "Somnia Testnet",
            nativeCurrency: {
              name: "Somnia Test Token",
              symbol: "STT",
              decimals: 18
            },
            rpcUrls: ["https://dream-rpc.somnia.network/"],
            blockExplorerUrls: ["https://somnia-testnet.socialscan.io"]
          }
        ]
      });
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    walletAddress = await signer.getAddress();
    alert("✅ Connected to Somnia! Address: " + walletAddress);
  } catch (err) {
    console.error("Wallet connection error:", err);
    alert("❌ Failed to connect wallet.");
  }
}
