import { FiFileText } from "react-icons/fi";
import { useAddTaskFormStore } from "../store";

const Notes = () => {
  const { data, setData } = useAddTaskFormStore();
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="h-px bg-gray-700 flex-grow"></div>
        <h3 className="mx-4 text-lg text-gray-300 font-medium">
          Additional Details
        </h3>
        <div className="h-px bg-gray-700 flex-grow"></div>
      </div>

      <div>
        <label className="text-gray-300 font-medium mb-2 flex items-center">
          Notes
        </label>
        <div className="relative mt-1">
          <div className="absolute left-3 top-3 text-teal-500">
            <FiFileText />
          </div>
          <textarea
            className="pl-10 pr-3 py-3 text-white bg-gray-800/70 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 resize-none"
            rows={4}
            placeholder="Additional notes for the training session..."
            name="notes"
            value={data?.notes || ""}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
          />
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Include any special requirements, fitness goals, or specific training
          instructions.
        </p>
      </div>
    </div>
  );
};

export default Notes;
