import { getMyLoseItems } from "@/lib/actions/loseAndFount.action";
import MyFoundItemSelect from "./MyFoundItemSelect";

const MyFoundItems = async () => {
  const data = await getMyLoseItems();
  return (
    <section>
      <table className="w-full border mt-5 mb-5">
        <thead>
          <tr className="backdrop-blur-sm">
            <th className="p-5 border">SL</th>
            <th className="p-5 border">Description</th>
            <th className="p-5 border">Location</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.data) && data?.data?.length === 0 && (
            <tr>
              <td className="text-center py-10" colSpan={3}>
                No data available
              </td>
            </tr>
          )}
          {Array.isArray(data?.data) &&
            data?.data?.map((item: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.description}</td>
                <td>{item?.location}</td>
                <td>
                  <MyFoundItemSelect />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default MyFoundItems;
