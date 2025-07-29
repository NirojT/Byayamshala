import { useEffect, useState } from "react";
import { useStaffProfileStore } from "../../store";

const SearchSalaryAdj = ({ id }: { id: number }) => {
  const { adjustments, getAdjustments, setSalaryAdjFilterdata } =
    useStaffProfileStore();

  const staffId = Number(id);

  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  // search
  useEffect(() => {
    if (search) {
      const filtered = adjustments.filter((adj) =>
        adj?.adjustmentDate?.toLowerCase()?.includes(search.toLowerCase())
      );

      setSalaryAdjFilterdata(filtered);
    } else {
      setSalaryAdjFilterdata(adjustments);
    }
  }, [search, adjustments]);

  // filter
  useEffect(() => {
    if (selectedFilter) {
      const filtered = adjustments.filter((adj) =>
        adj?.type?.toLowerCase()?.includes(selectedFilter.toLowerCase())
      );

      setSalaryAdjFilterdata(filtered);
    } else {
      setSalaryAdjFilterdata(adjustments);
    }
  }, [selectedFilter, adjustments]);

  useEffect(() => {
    if (staffId) getAdjustments(staffId);
  }, [staffId, getAdjustments]);
  return (
    <div className="mt-8 mb-6  flex items-center max-w-[95%] mx-auto justify-between">
      <div className="flex flex-col  gap-1">
        <label className="tracking-wide" htmlFor="search">
          Search By Date:
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Date"
          className="border border-orange-300 rounded-xl outline-none px-3 py-2"
        />
      </div>

      <div className="flex gap-3 items-center ">
        <h2 className="text tracking-wide">Filter By:</h2>
        <div>
          <select
            onChange={(e) => setSelectedFilter(e.target.value)}
            name="select"
            id=""
            className="py-2 border rounded-xl border-orange-500 px-3"
          >
            <option value="">All</option>
            <option value="ADVANCE">Addition</option>
            <option value="DEDUCTION">Deduction</option>
            <option value="BONUS">Bonus</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchSalaryAdj;
