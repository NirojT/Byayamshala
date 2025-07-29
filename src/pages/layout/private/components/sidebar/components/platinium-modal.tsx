
import { PrivateRoute } from '@/global/config';
import { X, Crown, ArrowRight, Check } from 'lucide-react'; // Assuming you're using lucide-react icons
import { useNavigate } from 'react-router-dom';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PlatinumUpgradeModal = ({ isOpen, onClose }: Props) => {
    if (!isOpen) return null;
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div
                className="relative bg-white w-11/12 max-w-md rounded-xl shadow-2xl overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Premium gradient top bar */}
                <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500"></div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <X size={18} className="text-gray-600" />
                </button>

                {/* Premium icon header */}
                <div className="flex flex-col items-center justify-center pt-8 pb-2">
                    <div className="p-3 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg mb-2">
                        <Crown size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Premium Feature</h3>
                    <p className="text-gray-500 mt-1 text-sm">Exclusive to Platinum Members</p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 my-4"></div>

                {/* Content */}
                <div className="px-6 py-2 text-center">
                    <p className="text-gray-700 mb-4">
                        Upgrade to our Platinum plan to unlock this premium feature and many more benefits.
                    </p>

                    {/* Benefits */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-gray-700 mb-2">Platinum Benefits</h4>
                        <ul className="space-y-2">
                            {[
                                'Exclusive access to all premium features',
                                'Priority customer support',
                                'Advanced analytics and reporting',
                                'Custom branding options'
                            ].map((benefit, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <Check size={16} className="text-green-500 flex-shrink-0" />
                                    <span className="text-left text-gray-600">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="px-6 pb-7 pt-2">
                    <button
                        onClick={() => {
                            // Add your upgrade navigation logic here
                            navigate(`/${PrivateRoute}/profile/plans`)
                            onClose()
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-200 transition-all duration-300"
                    >
                        Upgrade to Platinum
                        <ArrowRight size={18} />
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlatinumUpgradeModal;