"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateFoundItemStatus } from "@/lib/actions/loseAndFount.action";
import { useState } from "react";
import Swal from "sweetalert2";

const MyFoundItemSelect = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const changeStatus = async (value: any) => {
    setLoading(true);
    const res: any = await updateFoundItemStatus({ id, status: value } as any);

    setLoading(false);
    if (res?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <Select onValueChange={(value) => changeStatus(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Change status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MyFoundItemSelect;
