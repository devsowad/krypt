import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import Services from '@components/Services';
import Transactions from '@components/Transactions';
import Welcome from '@components/Welcome';
import { setCurrentAccount } from '@store/transactions';
import { checkWallet } from '@utils/transactions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const main = async () => {
      const account = await checkWallet();
      if (account) {
        dispatch(setCurrentAccount(account));
      }
    };
    main();
  }, []);

  return (
    <div className='min-h-screen text-gray-400 bg-gray-900'>
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
