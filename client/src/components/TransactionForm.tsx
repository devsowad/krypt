import Input from '@components/Input';
import Loader from '@components/Loader';
import { selectCurrentAccount } from '@store/transactions';
import { shortenAddress } from '@utils/shortenAddr';
import { sendTransaction } from '@utils/transactions';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const initialFormData = {
  addressTo: '',
  amount: 0,
  keyword: '',
  message: '',
};

const TransactionForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const currentAccount = useSelector(selectCurrentAccount);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { addressTo, amount, keyword, message } = formData;
      if (addressTo && amount && keyword && message) {
        if (currentAccount) {
          await sendTransaction({ ...formData, from: currentAccount });
          setFormData(initialFormData);
          setError('');
          setSuccess(
            `Transaction sent successfully to ${shortenAddress(addressTo)}`
          );
        } else {
          setError('Please select an account');
        }
      } else {
        setError('Please fill all fields');
      }
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-start w-full p-5 sm:w-96 blue-glassmorphism'
    >
      <Input
        placeholder='Address To'
        name='addressTo'
        type='text'
        value={formData.addressTo}
        onChange={handleChange}
      />
      <Input
        placeholder='Amount (ETH)'
        name='amount'
        type='number'
        value={formData.amount}
        onChange={handleChange}
      />
      <Input
        placeholder='Keyword (Gif)'
        name='keyword'
        type='text'
        value={formData.keyword}
        onChange={handleChange}
      />
      <Input
        placeholder='Enter Message'
        name='message'
        type='text'
        value={formData.message}
        onChange={handleChange}
      />

      <div className='h-[1px] w-full bg-gray-400 my-2' />

      {error && (
        <p className='w-full px-3 py-2 text-red-100 rounded-md bg-red-500/50'>
          {error}
        </p>
      )}

      {success && (
        <p className='w-full px-3 py-2 text-green-200 rounded-md bg-green-500/50'>
          {success}
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <button
          type='submit'
          className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
        >
          Send now
        </button>
      )}
    </form>
  );
};

export default TransactionForm;
