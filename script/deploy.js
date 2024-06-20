const { ethers, run, network } = require("hardhat");

async function main() {
  const storeFactory = await ethers.getContractFactory("StoringNo");
  console.log("Deploying contract...");
  const store = await storeFactory.deploy();
  await store.waitForDeployment();
  console.log("Contract deployed to:", store.target);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await store.deploymentTransaction().wait(6);
    await verify(store.target, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract on Etherscan...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified");
    } else {
      console.log("Error verifying contract:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
