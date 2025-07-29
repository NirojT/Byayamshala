import   { useState } from "react";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";

type PaymentMode = {
  id: number;
  name: string;

  isEditing?: boolean;
};

const defaultModes: PaymentMode[] = [
  { id: 1, name: "CASH" },
  { id: 2, name: "ESWA" },
  { id: 3, name: "COMPLEMENTARY" },
  { id: 4, name: "NIC ASIA" },
  { id: 4, name: "CARD" },
];

export default function PaymentModes() {
  const [modes, setModes] = useState<PaymentMode[]>(defaultModes);
  const [newMode, setNewMode] = useState({ name: "", bankName: "" });
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!newMode.name.trim()) {
      setError("Name is required.");
      return;
    }
    setModes([
      ...modes,
      {
        id: Date.now(),
        name: newMode.name.trim().toUpperCase(),
      },
    ]);
    setNewMode({ name: "", bankName: "" });
    setError("");
  };

  const handleDelete = (id: number) => {
    setModes(modes.filter((m) => m.id !== id));
  };

  const handleEdit = (id: number) => {
    setModes(
      modes.map((m) =>
        m.id === id ? { ...m, isEditing: true } : { ...m, isEditing: false }
      )
    );
    setError("");
  };

  const handleSave = (id: number, name: string, bankName?: string) => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setModes(
      modes.map((m) =>
        m.id === id
          ? {
              ...m,
              name: name.trim().toUpperCase(),
              bankName: bankName?.trim() || undefined,
              isEditing: false,
            }
          : m
      )
    );
    setError("");
  };

  const handleCancelEdit = () => {
    setModes(modes.map((m) => ({ ...m, isEditing: false })));
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto my-8 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Payment Modes
      </h1>

      <div className="flex flex-col gap-3 mb-6 bg-blue-50 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            className="border w-full px-3 py-2 rounded focus:outline-blue-400"
            placeholder="Mode Name (e.g. BANK, UPI)"
            value={newMode.name}
            onChange={(e) =>
              setNewMode((n) => ({ ...n, name: e.target.value }))
            }
          />

          <button
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleAdd}
          >
            <Plus size={18} /> Add
          </button>
        </div>
        {error && (
          <div className="text-sm text-red-600 font-medium">{error}</div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg bg-white shadow-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4 text-left">Mode Name</th>

              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modes.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-400">
                  No payment modes found.
                </td>
              </tr>
            )}
            {modes.map((mode) =>
              mode.isEditing ? (
                <tr key={mode.id} className="bg-yellow-50">
                  <td className="py-2 px-4">
                    <input
                      className="border px-2 py-1 rounded w-full"
                      defaultValue={mode.name}
                      id={`edit-name-${mode.id}`}
                    />
                  </td>

                  <td className="py-2 px-4 flex gap-2 justify-center">
                    <button
                      className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
                      title="Save"
                      onClick={() =>
                        handleSave(
                          mode.id,
                          (
                            document.getElementById(
                              `edit-name-${mode.id}`
                            ) as HTMLInputElement
                          ).value,
                          (
                            document.getElementById(
                              `edit-bank-${mode.id}`
                            ) as HTMLInputElement
                          ).value
                        )
                      }
                    >
                      <Save size={16} />
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400"
                      title="Cancel"
                      onClick={handleCancelEdit}
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={mode.id} className="hover:bg-blue-50">
                  <td className="py-2 px-4 font-semibold">{mode.name}</td>

                  <td className="py-2 px-4 flex gap-2 justify-center">
                    <button
                      className="bg-yellow-400 text-white rounded p-2 hover:bg-yellow-500"
                      title="Edit"
                      onClick={() => handleEdit(mode.id)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
                      title="Delete"
                      onClick={() => handleDelete(mode.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
