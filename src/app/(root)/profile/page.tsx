import ChangePassword from "@/components/profile/ChangePassword";
import EditProfile from "@/components/profile/EditProfile";
import MyClaimRequests from "@/components/profile/MyClaimRequests";
import MyFoundItems from "@/components/profile/MyFoundItems";
import MyLoseItems from "@/components/profile/MyLoseItems";
import { getUser } from "@/lib/actions/auth.action";

const ProfilePage = async () => {
  const user = await getUser();
  return (
    <main className="my-container">
      <h1 className="text-2xl font-bold text-center mt-10">Profile</h1>
      <h2 className="text-xl mt-5">Edit Profile</h2>
      <EditProfile user={user} />
      <h2 className="text-xl mt-20">Change Password</h2>
      <ChangePassword />
      <h2 className="text-xl mt-20">My Claim Requests</h2>
      <MyClaimRequests />
      <h2 className="text-xl mt-20">My Lost Items</h2>
      <MyLoseItems />
      <h2 className="text-xl mt-20">My Found Items</h2>
      <MyFoundItems />
    </main>
  );
};

export default ProfilePage;
