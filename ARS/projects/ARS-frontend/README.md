# Algorand Reputation System (ARS) Frontend

This is the frontend application for the Algorand Reputation System dApp. It allows users to connect their Algorand wallet, view their reputation score, mint soulbound NFTs, and for the contract creator, manage reputation scores and revoke NFTs.

## Frontend Development Plan for `ARS-frontend`

The goal is to create a user interface that interacts with your Algorand smart contracts, allowing users to:

* Connect their wallet.
* View their reputation score.
* Mint a soulbound NFT if their score meets the threshold.
* Allow the contract creator to set reputation scores and revoke NFTs.
* Display relevant contract information.

### Key Files and Their Purpose:

* `src/App.tsx`: The main application component, likely responsible for routing and overall layout.
* `src/main.tsx`: Entry point for the React application, responsible for rendering the `App` component.
* `src/Home.tsx`: The primary page component where most of the user interaction will happen.
* `src/components/Account.tsx`: Component to display connected account information.
* `src/components/AppCalls.tsx`: This is where you'll house the logic and UI for interacting with your smart contract methods (e.g., `bootstrap`, `get_score`, `set_score`, `mint_nft`, `revoke_nft`, `is_reputable`).
* `src/components/ConnectWallet.tsx`: Component for connecting to an Algorand wallet (e.g., Pera Wallet, WalletConnect).
* `src/components/ErrorBoundary.tsx`: (Placeholder) For gracefully handling errors in the UI.
* `src/components/Transact.tsx`: (Placeholder) Could be used for general transaction handling.
* `src/contracts/`: This directory will likely hold generated client-side code for interacting with your smart contracts, or manual definitions of contract interfaces.
* `src/interfaces/`: For TypeScript interfaces to define data structures (e.g., for account info, contract return types).
* `src/styles/`: For CSS or styling modules.
* `src/utils/`: For utility functions (e.g., helper functions for Algorand SDK interactions).
* `src/assets/logo.svg`: For your application's logo.

### Styling:

You can use various styling approaches:

* **CSS Modules:** (e.g., `src/styles/App.module.css`) - Good for scoped styles.
* **Styled Components / Emotion:** For component-based styling (requires installation).
* **Tailwind CSS:** For a utility-first CSS framework (requires installation and configuration).
* **Basic CSS:** Direct CSS files (used in this project).

### Step-by-Step Frontend Implementation

(This section will detail each file's code)

## Before Running

1.  **Install Dependencies:**
    ```bash
    cd ARS-frontend
    npm install
    npm install algosdk @perawallet/connect
    # If you plan to use AlgoKit's client generation:
    # npm install @algorandfoundation/algokit-utils-client
    ```
2.  **Update `REPUTATION_APP_ID`:** In `src/utils/algorand.ts`, replace `123` with the actual App ID of your deployed `ReputationContract`.
3.  **Update `CONTRACT_CREATOR_ADDRESS`:** In `src/Home.tsx`, replace `"YOUR_CONTRACT_CREATOR_ADDRESS_HERE"` with the Algorand address of the account that deployed your `ReputationContract`. This is crucial for controlling creator-only actions.
4.  **Run Your Algorand LocalNet/TestNet:** Ensure your Algorand node (e.g., AlgoKit LocalNet) is running so your frontend can connect to it.
5.  **Pera Wallet:** Have Pera Wallet installed and configured in your browser or mobile device, as this frontend uses it for wallet connection.

## How to Run

1.  Navigate to your frontend directory:
    ```bash
    cd ARS-frontend
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
    This will usually open your application in your browser at `http://localhost:5173` (or a similar port).

## Further Enhancements and Considerations

* **AlgoKit Generated Client:** Seriously consider using AlgoKit's client generation feature. After you build your smart contract, AlgoKit can generate a TypeScript client in your `artifacts` folder (`smart_contracts/artifacts/alg_rs/alg_rs_client.ts`). This client provides type-safe methods for interacting with your contract's ABI, making `AppCalls.tsx` much cleaner and less error-prone.
* **Error Handling:** Implement more robust error handling and user feedback. Show specific error messages to the user.
* **Loading States:** Add loading indicators for async operations (e.g., fetching data, sending transactions).
* **Notifications:** Use a toast notification library (e.g., `react-toastify`) for better user feedback on transaction success/failure.
* **Input Validation:** Validate user inputs (e.g., Algorand address format, numeric values).
* **State Management:** For larger applications, consider a state management library like Zustand or Redux for managing global state (connected account, contract data).
* **Routing:** If your application grows, implement React Router for navigation between different pages.
* **Asset Opt-in:** The `mint_nft` function in your contract assumes the user has already opted into the NFT asset. In a real dApp, you would need to implement frontend logic for the user to opt-in to the NFT asset before they can receive it. This usually involves a transaction call (similar to `makeAssetOptInTxn` in `algosdk`).
