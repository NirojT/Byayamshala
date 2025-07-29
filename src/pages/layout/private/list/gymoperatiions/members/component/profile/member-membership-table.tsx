 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
import { IMemberships } from "../../interface";
import { useGlobalStore } from "@/global/store";
import { useListMemberStore } from "../../store";

const MemberMemberShipTable = ({sub}: { sub: IMemberships }) => {
  const { setToasterData } = useGlobalStore();
  const { cancelMembership } = useListMemberStore();
  const handleCancel = async (memberShip: IMemberships) => {
    if (memberShip?.facilities?.length === 0) return;
    const res = await cancelMembership(memberShip?.id);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };
  return (
    <div className="sm:block hidden text-white">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="">
          <TableRow className="hover:text-white">
            <TableHead className="w-[100px] text-white">Plan </TableHead>
            <TableHead className="text-white">Duration</TableHead>
            <TableHead className="text-white">Price</TableHead>
            <TableHead className="text-white text-">Remaining Days</TableHead>
            <TableHead className="text-right text-white">Description</TableHead>
            <TableHead className="text-right text-white">Status</TableHead>{" "}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{sub?.planName}</TableCell>
            <TableCell>{sub?.durationInDays}</TableCell>
            <TableCell>{sub?.price}</TableCell>
            <TableCell className="text-center">{sub?.remainingDays}</TableCell>
            <TableCell className="text-right">{sub?.description}</TableCell>
            <TableCell className="text-right">
              {sub?.memberShipStatus}
            </TableCell>
            <TableCell
              className="text-right hover:cursor-pointer"
              onClick={() => handleCancel(sub)}
            >
              {sub?.facilities?.length > 0 && "Cancel"}
            </TableCell>
            {/* {sub?.facilities.map((facility) => (
                          <TableCell key={facility.id} className="text-right">{facility.price}</TableCell>
                        ))} */}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberMemberShipTable