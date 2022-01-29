declare let window: any;

import { transactionsSlice } from '@store/transactions';
import { CONTRACT_ABI, CONTRACT_ADDR } from '@utils/constants';
import { ethers } from 'ethers';

const { ethereum } = window;

export const checkWallet = async () => {
  try {
    if (!ethereum) return alert('Please install MetaMask');
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts[0] || null;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to connect to wallet');
  }
};

export const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install MetaMask');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) return alert('No accounts found');
    return accounts[0];
  } catch (error) {
    console.log(error);
    throw new Error('No ethereum provider found');
  }
};

export const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    CONTRACT_ADDR,
    CONTRACT_ABI,
    signer
  );
  return transactionContract;
};

interface FormData {
  from: string;
  addressTo: string;
  amount: number;
  keyword: string;
  message: string;
}

export const sendTransaction = async ({
  from,
  addressTo,
  amount,
  keyword,
  message,
}: FormData) => {
  try {
    if (!ethereum) return alert('Please install MetaMask');

    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther(amount.toString());

    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: from,
          to: addressTo,
          gas: '0x5208', // 0.0009 ETH
          value: parsedAmount._hex,
        },
      ],
    });

    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount._hex,
      message,
      keyword
    );
    transactionHash.wait();
    console.log({ hash: transactionHash.hash });
    const transactionCount = await transactionContract.getTransactionCount();
    console.log({ transactionCount: transactionCount.toNumber() });
  } catch (error) {
    console.log(error);
    throw new Error('Unable to complete transaction');
  }
};
