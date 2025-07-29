import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useItemCategoryStore } from "./store";
import ItemCategoryForm from "./component/ItemCategoryForm";
import { IItemCategoryDetails } from "./interface";
import ItemCategoryDeleteModal from "./component/item-category-delete-modal";
import { Edit, Trash } from "lucide-react";
import Back from "@/global/components/back/back";

const ItemCategory = () => {
  const {
    getItemCategorys,
    filteredData,
    itemCategorys,
    setFilteredData,
    search,
    setSearch,
    setCategory,
  } = useItemCategoryStore();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [task, setTask] = useState<"create" | "update">("create");
  const [id, setId] = useState<number>(0);

  const handleEdit = (data: IItemCategoryDetails) => {
    setTask("update");
    setCategory(data?.category);
    setOpen(true);
    setId(data?.id);
  };

  const handleDelete = (data: IItemCategoryDetails) => {
    setDeleteOpen(true);
    setId(data?.id);
  };

  useEffect(() => {
    getItemCategorys();
  }, [getItemCategorys]);

  useEffect(() => {
    if (search) {
      const data = itemCategorys.filter((item) =>
        item?.category?.toLowerCase()?.includes(search.toLowerCase())
      );
      setFilteredData(data);
    } else {
      setFilteredData(itemCategorys);
    }
  }, [itemCategorys, search, setFilteredData]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Item Category List
        <Back />
      </Typography>
      <div className="flex  gap-6 sm:flex  sm:justify-center">
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-[#E26300] text-white  border border-gray-400 hover:scale-105 px-6 rounded-lg border-none "
          onClick={() => {
            setOpen(true);
            setTask("create");
          }}
        >
          Add Category
        </button>
      </div>

      {/* Updated Table Wrapper */}
      <div className="overflow-hidden  rounded-lg shadow-sm mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-[40rem] divide-y divide-gray-200 ml-auto mr-auto">
            <thead className="bg-slate-200 text-gray-800">
              <tr className="text-gray-600">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-left">
                  SN
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider ">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider ">
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
                      {data?.category}
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
                    No Items Category are added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <ItemCategoryForm
          open={open}
          setOpen={setOpen}
          task={task}
          id={id}
          setId={setId}
        />
      )}
      {deleteOpen && (
        <ItemCategoryDeleteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          id={id}
          setId={setId}
        />
      )}
    </Box>
  );
};

export default ItemCategory;
