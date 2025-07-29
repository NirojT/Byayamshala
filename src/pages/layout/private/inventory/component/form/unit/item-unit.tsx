import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useItemUnitStore } from "./store";
import ItemUnitForm from "./component/ItemUnitForm";
import { IItemUnitDetails } from "./interface";
import ItemUnitDeleteModal from "./component/item-unit-delete-modal";
import { Edit, Trash } from "lucide-react";
import Back from "@/global/components/back/back";

const ItemUnit = () => {
  const {
    getItemUnits,
    filteredData,
    itemUnits,
    setFilteredData,
    search,
    setSearch,
    setUnit,
  } = useItemUnitStore();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [task, setTask] = useState<"create" | "update">("create");
  const [id, setId] = useState<number>(0);

  const handleEdit = (data: IItemUnitDetails) => {
    setTask("update");
    setUnit(data?.unit);
    setOpen(true);
    setId(data?.id);
  };

  const handleDelete = (data: IItemUnitDetails) => {
    setDeleteOpen(true);
    setId(data?.id);
  };

  useEffect(() => {
    getItemUnits();
  }, [getItemUnits]);

  useEffect(() => {
    if (search) {
      const data = itemUnits.filter((item) =>
        item?.unit?.toLowerCase()?.includes(search.toLowerCase())
      );
      setFilteredData(data);
    } else {
      setFilteredData(itemUnits);
    }
  }, [itemUnits, search, setFilteredData]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Item Unit List
        <Back />
      </Typography>
      <div className="flex gap-6 sm:flex sm:justify-center">
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-[#E26300] text-white border border-gray-400 hover:scale-105 px-6 rounded-lg border-none"
          onClick={() => {
            setOpen(true);
            setTask("create");
          }}
        >
          Add Unit
        </button>
      </div>

      {/* Updated Table Wrapper */}
      <div className="overflow-hidden rounded-lg shadow-sm mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-[40rem] divide-y divide-gray-200 ml-auto mr-auto">
            <thead className="bg-slate-200 text-gray-800">
              <tr className="text-gray-600">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-left">
                  SN
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr
                    key={data?.id ?? index}
                    className="hover:bg-gray-100 even:bg-gray-50 border-t transition-colors duration-200"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {data?.unit}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex justify-center gap-4">
                        <p
                          className="text-sm hover:cursor-pointer"
                          onClick={() => handleEdit(data)}
                        >
                          <Edit color="green" />
                        </p>
                        <p
                          className="text-sm hover:cursor-pointer"
                          onClick={() => handleDelete(data)}
                        >
                          <Trash color="red" />
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-[14px] p-3 text-center text-red-400"
                  >
                    No Items Unit are added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <ItemUnitForm
          open={open}
          setOpen={setOpen}
          task={task}
          id={id}
          setId={setId}
        />
      )}
      {deleteOpen && (
        <ItemUnitDeleteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          id={id}
          setId={setId}
        />
      )}
    </Box>
  );
};

export default ItemUnit;
