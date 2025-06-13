# 🔗 ReputeChain | ARS-Contracts with AI & Soulbound NFTs

This project introduces a robust, **AI-powered decentralized reputation scoring system** built on the **Algorand blockchain**, leveraging **Soulbound NFTs** (non-transferable tokens). It offers a transparent and verifiable method to evaluate user credibility based on their on-chain interactions, generating dynamic trust scores that are inherently tied to a user's identity and cannot be transferred or easily manipulated.

---

## ✨ Innovation & Utility

In the Web3 landscape, trust is paramount yet often elusive. Our system addresses critical challenges:

* **Sybil Resistance:** Prevents malicious actors from creating multiple identities to manipulate governance or exploit protocols.
* **Enhanced Trust:** Provides verifiable on-chain credibility for users and entities, fostering healthier decentralized ecosystems.
* **Fairer Access & Incentives:** Enables DApps to reward genuine contributors, filter out bad actors, and offer tailored access based on verifiable reputation, moving beyond simple token holdings.

**Web3 Advantage:** Unlike Web2 reputation systems (e.g., social media likes, e-commerce ratings) which are centralized, easily faked, and siloed, ARS provides:
* **On-chain Verifiability:** All data points are transparently recorded on Algorand.
* **Decentralized Control:** Reputation is derived from objective, immutable on-chain activity, not controlled by a single entity.
* **User Ownership:** Reputation is tied to a user's self-custodied wallet and manifested as a Soulbound NFT.
* **Interoperability:** Designed for seamless integration across various Algorand DApps.

---

## 🚀 Key Features

1.  **AI-Powered Reputation Scoring**:
    * Utilizes a **Python FastAPI backend** to host an AI model (trained with **Scikit-learn**) that analyzes extensive Algorand transaction history (pulled via **Algorand Indexer API**) to compute a dynamic, objective trust score for any address.
    * Features extracted include transaction volume, frequency, unique counterparties, smart contract interactions, and more.

2.  **Soulbound NFTs (SBTs) as Reputation Certificates**:
    * Assigns **non-transferable NFTs** (ARC-4 compliant) as immutable proofs of a user's credibility.
    * Smart contract logic allows **minting SBTs based on reputation score thresholds** and includes mechanisms for **revoking or modifying** SBTs if scores significantly drop or other criteria are violated.

3.  **Secure & Transparent On-chain Records**:
    * All core reputation scores and SBT status are recorded and managed directly on the **Algorand blockchain** via PyTeal smart contracts, ensuring security, transparency, and immutability.

4.  **Flexible DApp Integration**:
    * Provides a clear smart contract interface for DApps to query user reputation scores and SBT status, enabling a wide range of reputation-gated functionalities.
    * Supports **IPFS integration** for decentralized storage of rich NFT metadata (e.g., verifiable reputation proofs, images, descriptions), making it **ARC-3 compliant**.

5.  **Smart Contract Automation**:
    * The PyTeal smart contracts automate access control based on reputation (e.g., for DAO voting power or specific DApp features).

---

## 🎯 Use Cases & Impact

* **DeFi Lending Platforms**:
    * **Impact:** Enables risk assessment for uncollateralized or undercollateralized loans based on verifiable on-chain behavior, expanding access to capital beyond traditional collateral models.
    * **Benefits:** Reduces risk for lenders, increases capital efficiency, fosters financial inclusion.

* **DAO Governance**:
    * **Impact:** Implements **weighted voting based on reputation scores** (or SBT tiers), enhancing Sybil resistance and ensuring more meaningful participation from genuinely engaged community members.
    * **Benefits:** Fosters fairer, more informed decision-making, protects against malicious governance attacks.

* **Web3 Marketplaces**:
    * **Impact:** Establishes trust-based filtering for sellers and buyers, reducing fraud and improving transaction quality.
    * **Benefits:** Increases user confidence, promotes fair trading environments.

* **Freelance & Gig Economy**:
    * **Impact:** Employers can assess freelancer credibility based on their verifiable on-chain work history and interactions.
    * **Benefits:** Builds trust in decentralized work platforms, simplifies vetting processes.

---

## 🛠 Tech Stack

| Layer                   | Technologies                                                     |
| :---------------------- | :--------------------------------------------------------------- |
| **Blockchain** | Algorand (Ecosystem: Algorand Indexer, AlgoKit)                  |
| **Smart Contracts** | PyTeal (for ARC-4 SBTs & reputation logic)                       |
| **AI/ML** | Python (Scikit-learn - `RandomForestRegressor`), Pandas, NumPy |
| **Backend** | FastAPI (Python), `python-dotenv`, `joblib`                     |
| **Frontend** | React.js (TypeScript), Pera Wallet Connect                       |
| **Decentralized Storage** | IPFS (via Pinata API)                                            |


---

## 📌 How It Works (Detailed Flow)

1.  **User Onboarding & Wallet Connection**: Users connect their Algorand Pera Wallet to the `ARS-frontend` DApp.
2.  **Reputation Score Calculation**:
    * The `ARS-frontend` sends the user's Algorand address to the `ARS-backend`'s `/ai/predict-reputation` endpoint.
    * The `ARS-backend` uses `algosdk` to connect to the **Algorand Indexer API** and fetches the user's comprehensive transaction history (payments, asset transfers, application calls) via **paginated queries**.
    * This raw transaction data is then processed by `ai_model.py` which extracts key features (e.g., number of transactions, Algo volume, app call frequency, unique counterparties).
    * These features are fed into the **pre-trained Scikit-learn (`RandomForestRegressor`) AI model**, which outputs a dynamic reputation score (0-1000).
    * The `ARS-backend` returns this score to the `ARS-frontend` for display.
3.  **Soulbound NFT Minting**:
    * If a user's reputation score meets a predefined threshold (managed by the smart contract), the `ARS-frontend` allows them to initiate an SBT minting transaction.
    * The SBT's metadata (including a verifiable link to the reputation proof and rich descriptive data) is first uploaded to **IPFS** via `ipfs_utils.py` in the `ARS-backend`.
    * The `ARS-frontend` then calls the PyTeal smart contract (deployed from `ARS-contracts`) to mint the ARC-4 compliant Soulbound NFT, referencing the IPFS CID for metadata.
    * The smart contract enforces the non-transferability of the NFT.
4.  **Smart Contract Enforcement & DApp Integration**:
    * DApps (like our demo DAO voting system) can query the user's on-chain reputation score or check for SBT ownership via the `ARS-contracts` interface.
    * This enables features like reputation-weighted voting, access to exclusive DApp features, or eligibility for specific DeFi products.
5.  **Continuous Updates**: Reputation scores can be re-calculated by the AI model based on new on-chain activity, allowing for dynamic adjustments to a user's standing.

## 📽 Demo

> 🔗 **[Watch the Demo Video]([https://drive.google.com/file/d/1Vl-EtcNIqlm0Xex-sawuhdJD43RuBw54/view])** : https://drive.google.com/file/d/1Vl-EtcNIqlm0Xex-sawuhdJD43RuBw54/view
> 📸 Screenshots and flow diagram below ⬇️

![Demo Screenshot](![image](https://github.com/user-attachments/assets/d3485209-21ee-4077-8f9e-765d88e83e49)
)
![image](https://github.com/user-attachments/assets/e6e8803f-5823-419b-b9ef-d8abc1305a23)

![image](![image](https://github.com/user-attachments/assets/c8e76952-096f-4f2e-abbf-5caecb44687a)
)
![image](![image](https://github.com/user-attachments/assets/4d66f668-b351-4e2e-acf1-0e0d66c189cb)
)
