const SummaryCard = ({
  account,
  savingBalance,
}: {
  account: any;
  savingBalance: any;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
      {/* Opening Balance */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          Opening Balance: {""}
        </h3>
        <p className="text-md text-[#2E2E2E]">
          Rs <span className="font-medium">{account?.openingBalance || 0}</span>
        </p>
      </div>

      {/* Saving Balance */}
      {Object.keys(savingBalance || {})?.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Saving Balance
          </h3>
          <p className="text-md text-[#2E2E2E]">
            <span>Total Added Balance: </span>
            <span className="font-medium">
              Rs {savingBalance?.addedAmt || 0}
            </span>
          </p>
          <p className="text-md text-[#2E2E2E] mt-2">
            <span>Total Withdraw Balance: </span>
            <span className="font-medium">
              Rs {savingBalance?.withDrawAmt || 0}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;