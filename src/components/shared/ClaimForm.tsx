"use client";

import { claim } from "@/lib/actions/loseAndFount.action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FC, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
interface IProps {
  id: string;
  user: any;
}
const ClaimForm: FC<IProps> = ({ id, user }) => {
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await claim({
      id: e?.target?.id?.value,
      description: e?.target?.description?.value,
    });
    setLoading(false);
    console.log({ res });
    if (res?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Claimed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log({ res });
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You have already claimed this item",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    ref.current?.reset();
  };
  return (
    <div>
      <form ref={ref} onSubmit={onSubmit} className="space-y-2">
        <Input type="hidden" name="id" value={id} />
        <Input
          type="text"
          name="description"
          required
          placeholder="describe what is prove this is your item"
        />

        {user?.role ? (
          <Button type="submit" disabled={loading || !user}>
            {loading ? "Claiming" : "Claim"}
          </Button>
        ) : (
          <Link href="/login">
            <Button className="mt-[8px]">Login</Button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default ClaimForm;
