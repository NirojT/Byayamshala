import { TbReceiptRefund } from "react-icons/tb";

const Header: React.FC = () => {
  return (
    <div className="mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
      <div className="p-6 md:p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
          <TbReceiptRefund className="mr-3 text-orange-500" size={28} />
          Sales Return
        </h1>
        <p className="text-gray-400">
          Process returns for previously completed sales
        </p>
      </div>
    </div>
  );
};

export default Header;