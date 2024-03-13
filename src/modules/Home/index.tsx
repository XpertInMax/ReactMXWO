import { FC } from 'react';
import Header from '../../components/Header';
import WorkOrderForm from '../WorkOrder';

const HomePage: FC = () => {
  return (
    <div className="w-full p-4">
      <Header />
      <main role="main" className="w-full p-10 flex flex-col content-center justify-center">
        <div className="w-full sm:w-2/3 lg:w-2/3 bg-gray-50 rounded-xl m-auto">
          <div className="bg-white rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <WorkOrderForm />
          </div>
        </div>
      </main >
    </div >
  );
};

export default HomePage;
