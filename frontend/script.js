let connectBtn = document.getElementById("connectButton");
let write = document.getElementById("write");
let storeBtn = document.getElementById("storeButton");
let retrieveBtn = document.getElementById("retrieveButton");
let len = document.getElementById("len");
let connected = false;
let contractInstance = null;
connectBtn.addEventListener("click", async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let contractAddress = "0x5a0E82ce1D51111Db2C9422D2E6FBaCebD39cE01";
    let contractABI = [
      {
        inputs: [{ internalType: "uint256", name: "_no", type: "uint256" }],
        name: "addNo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
        name: "getNo",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getNoLength",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ];
    contractInstance = await new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    organizationAddress = await signer.getAddress();
    console.log(await provider.listAccounts());
    connected = true;
    connectBtn.style.width = "150px";
    connectBtn.style.height = "50px";
    connectBtn.innerHTML = "Connected";
    connectBtn.style.fontSize = "20px";
    connectBtn.style.backgroundColor = "lightgreen";
    write.style.display = "block";
  } catch (error) {
    console.log(error);
  }
});

storeBtn.addEventListener("click", async () => {
  console.log("store button clicked");
  let no = Number(document.querySelectorAll("input")[0].value);
  try {
    await contractInstance.addNo(no);
    console.log("Number stored successfully");
  } catch (error) {
    console.log(error);
  }
});
retrieveBtn.addEventListener("click", async () => {
  let index = Number(document.querySelectorAll("input")[1].value);
  try {
    let no = await contractInstance.getNo(index);
    alert(no);
  } catch (error) {
    console.log(error);
  }
});
len.addEventListener("click", async () => {
  try {
    let length = await contractInstance.getNoLength();
    alert(length);
  } catch (error) {
    console.log(error);
  }
});
