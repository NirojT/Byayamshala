import { AppUserRoles } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useSuperPlansStore } from "../../plans/store";
import { useSuperAppUserStore } from "../store";
 

const SuperAppUserFormModal: React.FC = () => {
  const {
    data,
    setData,
    clearData,
    createSuperAppUser,
    updateSuperAppUser,
    setOpen,
    open,
    id,
    // deactivateUser,
  } = useSuperAppUserStore();
  const { superPlans } = useSuperPlansStore();
  const { setToasterData } = useGlobalStore();

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // const handleDeactivate = async () => {
  //   const res = await deactivateUser();
  //   setToasterData({
  //     message: res.message,
  //     severity: res.severity,
  //     open: true,
  //   });
  // };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let res;
    if (id) {
      res = await updateSuperAppUser(id);
    } else {
      res = await createSuperAppUser();
    }

    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });

    if (res.severity === "success") {
      clearData();
      setOpen(false);
    }
  };

 

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="flex items-center ">
          <DialogTitle className="text-xl font-semibold text-center text-gray-800">
            📦{id ? "Update" : "Add"} AppUsers
          </DialogTitle>

          <div>
            {/* {id > 0 && (
              <div className="flex flex-col items-center space-x-2">
                <Switch onClick={handleDeactivate} id="airplane-mode" />
                <Label htmlFor="airplane-mode">Deactivate user</Label>
              </div>
            )} */}
          </div>
        </div>

        <DialogContent className="flex flex-col gap-4 mt-2">
          {/* email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={data?.email}
            onChange={handleChange}
            margin="dense"
          />
          {/* password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={data?.password}
            onChange={handleChange}
            margin="dense"
          />
          {/* roles */}
          <TextField
            select
            fullWidth
            type="number"
            label="Role"
            name="role"
            value={data?.role}
            onChange={handleChange}
            margin="dense"
          >
            {Object.values(AppUserRoles)
              ?.filter((role) => role !== AppUserRoles.ROLE_SUPER_ADMIN)

              ?.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
          </TextField>
          {/* affiliateCode */}

          {data.role === AppUserRoles.ROLE_AFFILIATE && (
            <TextField
              fullWidth
              label="affiliateCode"
              name="affiliateCode"
              value={data?.affiliateCode}
              onChange={handleChange}
              margin="dense"
            />
          )}
          {/* planType  hide it if updating */}
          {id <= 0 && (
            <TextField
              select
              className="mb-10"
              fullWidth
              type="number"
              label="Plan Type"
              name="planType"
              value={data?.planType}
              onChange={handleChange}
              margin="dense"
            >
              {superPlans?.map((plan) => (
                <MenuItem key={plan?.id} value={plan?.type}>
                  {plan?.type}
                </MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>
        <DialogActions className="p-4 flex justify-between">
          <button
            className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default SuperAppUserFormModal;
