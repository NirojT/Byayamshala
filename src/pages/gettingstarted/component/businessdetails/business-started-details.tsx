import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bg from "@/assets/bg.jpg"
import { ArrowLeft } from 'lucide-react';

interface BusinessDetailsProps {
  onPrevious: () => void;
  onNext: (details: BusinessDetailsType) => void;
}

interface BusinessDetailsType {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  panNo: string;
}

const BusinessDetailsForm: React.FC<BusinessDetailsProps> = ({ onPrevious, onNext }) => {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetailsType>({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    panNo: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form whenever inputs change
  useEffect(() => {
    const { businessName, businessAddress, businessPhone } = businessDetails;
    setIsFormValid(!!businessName && !!businessAddress && !!businessPhone);
  }, [businessDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext(businessDetails);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-between w-[96rem] p-4 ml-[20%]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex w-full rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Form Section */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full md:w-6/12 lg:w-4/12 bg-black border border-gray-800 p-8 relative z-10"
        >
          {/* Animated gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 animate-gradient"></div>

          <div className="mb-8">
            <button
              onClick={onPrevious}
              className="flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span className="text-sm">Back</span>
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white tracking-tight">
            Business Details
          </h1>
          <p className="text-gray-500 mb-8">Enter your fitness center information</p>

          <div className="space-y-6">
            <div className="group">
              <label htmlFor="businessName" className="block text-xs text-gray-500 mb-1 ml-1">Business Name</label>
              <div className="relative">
                <input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={businessDetails.businessName}
                  onChange={handleInputChange}
                  placeholder="Ex: Tarahara Fitness Center"
                  className="p-4 bg-gray-900/70 text-gray-200 block w-full rounded-lg focus:outline-none border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-700"
                />
                <div className="absolute top-4 right-4 text-gray-600">
                  <i className="fas fa-dumbbell"></i>
                </div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="businessAddress" className="block text-xs text-gray-500 mb-1 ml-1">Business Address</label>
              <div className="relative">
                <input
                  id="businessAddress"
                  name="businessAddress"
                  value={businessDetails.businessAddress}
                  onChange={handleInputChange}
                  placeholder="Ex: Itahari-20, Tarahara"
                  className="p-4 bg-gray-900/70 text-gray-200 block w-full rounded-lg focus:outline-none border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-700"
                />
                <div className="absolute top-4 right-4 text-gray-600">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="businessPhone" className="block text-xs text-gray-500 mb-1 ml-1">Phone Number</label>
              <div className="relative">
                <input
                  id="businessPhone"
                  type="tel"
                  name="businessPhone"
                  value={businessDetails.businessPhone}
                  onChange={handleInputChange}
                  placeholder="Ex: +977 9899090909"
                  className="p-4 bg-gray-900/70 text-gray-200 block w-full rounded-lg focus:outline-none border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-700"
                />
                <div className="absolute top-4 right-4 text-gray-600">
                  <i className="fas fa-phone"></i>
                </div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="panNo" className="block text-xs text-gray-500 mb-1 ml-1">PAN Number (Optional)</label>
              <div className="relative">
                <input
                  id="panNo"
                  type="text"
                  name="panNo"
                  value={businessDetails.panNo}
                  onChange={handleInputChange}
                  placeholder="Enter your PAN number"
                  className="p-4 bg-gray-900/70 text-gray-200 block w-full rounded-lg focus:outline-none border border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-700"
                />
                <div className="absolute top-4 right-4 text-gray-600">
                  <i className="fas fa-id-card"></i>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!isFormValid}
              className={`w-full p-4 mt-6 rounded-lg font-medium transition-all duration-300 ${isFormValid
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>

        {/* Images Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="hidden md:block md:w-7/12 lg:w-5/12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <img src={bg} alt="Fitness Center" className="overflow-hiddenw-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-75" />
          {/* <div className="grid grid-cols-2 h-full">
            <div className="grid grid-rows-2 h-full">
              <div className="overflow-hidden">
                <img src={bg} alt="Fitness Center" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-75" />
              </div>
              <div className="overflow-hidden">
                <img src={bg} alt="Fitness Equipment" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-75" />
              </div>
            </div>

            <div className="grid grid-rows-2 h-full">
              <div className="overflow-hidden">
                <img src={bg} alt="Training Session" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-75" />
              </div>
              <div className="overflow-hidden">
                <img src={bg} alt="Fitness Results" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-75" />
              </div>
            </div> */}
        {/* </div> */}
      </motion.div>
    </motion.div>
    </div >
  );
};

export default BusinessDetailsForm;