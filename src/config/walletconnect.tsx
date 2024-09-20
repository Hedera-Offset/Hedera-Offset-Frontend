// Import the required libraries
import {
  HashConnect,
  HashConnectConnectionState,
  SessionData,
} from "hashconnect";
import {
  AccountId,
  LedgerId,
  TransferTransaction,
  TokenAssociateTransaction,
} from "@hashgraph/sdk";

// HashPack wallet connection details
const appMetadata = {
  name: "Rabble",
  description: "A description of my dApp",
  icons: ["https://absolute.url/to/icon.png"],
  url: "localhost:5713",
};

let hashconnect: HashConnect;
let state: HashConnectConnectionState = HashConnectConnectionState.Disconnected;
let pairingData: SessionData | null = null;

// Function to set up HashConnect events
export function setUpHashConnectEvents() {
  hashconnect.pairingEvent.on((newPairing) => {
    pairingData = newPairing;
  });

  hashconnect.disconnectionEvent.on((data) => {
    pairingData = null;
  });

  hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
    state = connectionStatus;
  });
}

// Connect to HashPack wallet
export async function connectToHashPack() {
  // Initialize HashConnect
  hashconnect = new HashConnect(
    LedgerId.TESTNET,
    "8bbb02a3d33624385db33107a628106c",
    appMetadata,
    true
  );

  // Set up HashConnect events
  setUpHashConnectEvents();

  // Initialize HashConnect with app metadata
  await hashconnect.init();

  // Open pairing modal
  await hashconnect.openPairingModal();
}
export async function disconnect() {
  console.log("Disconnecting from HashPack...", hashconnect);
  if (hashconnect && state !== HashConnectConnectionState.Disconnected) {
    await hashconnect.disconnect();
    console.log("Disconnected successfully.");
  } else {
    console.error("HashConnect is not initialized or already disconnected");
  }
}
// Send a transaction

export async function sendTransaction() {
  if (!pairingData) {
    console.error(
      "No pairing data available. Please connect to HashPack first."
    );
    return;
  }

  try {
    const accountID = AccountId.fromString(pairingData.accountIds[0]);
    const transaction = new TransferTransaction()
      .addHbarTransfer(accountID, -1) // Subtract 1 HBAR from the connected account
      .addHbarTransfer("0.0.4668483", 1); // Add 1 HBAR to the recipient's account

    const response = await hashconnect.sendTransaction(accountID, transaction);
    console.log("Transaction sent successfully:", response);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

export async function sendNft() {
  if (!pairingData) {
    console.error(
      "No pairing data available. Please connect to HashPack first."
    );
    return;
  }

  try {
    const accountID = AccountId.fromString(pairingData.accountIds[0]);
    // const tokenId = "0.0.4688036";
    const transaction = new TransferTransaction().addNftTransfer(
      "0.0.4688036",
      1,
      "0.0.4668512",
      "0.0.4632260"
    );

    // const transaction = await new TokenAssociateTransaction()
    //   .setAccountId(accountID)
    //   .setTokenIds([tokenId]);
    // // // .freezeWith(client);

    const response = await hashconnect.sendTransaction(accountID, transaction);
    console.log("Transaction sent successfully:", response);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

export async function associate() {
  if (!pairingData) {
    console.error(
      "No pairing data available. Please connect to HashPack first."
    );
    return;
  }

  try {
    const accountID = AccountId.fromString(pairingData.accountIds[0]);
    const tokenId = "0.0.4688036";

    const transaction = await new TokenAssociateTransaction()
      .setAccountId(accountID)
      .setTokenIds([tokenId]);
    // // .freezeWith(client);

    const response = await hashconnect.sendTransaction(accountID, transaction);
    console.log("Transaction sent successfully:", response);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

// Sign a message
// export async function signMessage(pairingData, message) {
//   if (!pairingData) {
//     console.error(
//       "No pairing data available. Please connect to HashPack first."
//     );
//     return;
//   }

//   try {
//     let signedMessage = await this.hashConnect.sign(
//       pairingData.topic,
//       pairingData.accountIds[0],
//       message
//     );
//     console.log("Signed message:", signedMessage);
//     return signedMessage;
//   } catch (error) {
//     console.error("Error signing message:", error);
//   }
// }

// function disconnect() {
//   throw new Error("Function not implemented.");
// }
// Usage example
// export async function main() {
//   let pairingData = await connectToHashPack();
//   if (pairingData) {
//     await sendTransaction(pairingData);
//     await signMessage(pairingData, "Hello, HashPack!");
//   }
// }

// main();
// ACCOUNT2_PRIVATE_KEY = 0x0e839ff4251396b86d204a929af6ed6c0e7ae3f4ffd6b98b1f3574889a74edda;
// ACCOUNT2_ID = 0;
// ACCOUNT2_ID=0.0.4671855
// ACCOUNT_ID=0.0.4668512
