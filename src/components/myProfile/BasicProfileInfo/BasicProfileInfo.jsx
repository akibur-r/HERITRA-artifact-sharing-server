import useUsersApi from "@/api/usersApi";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useUserFromDBStore from "@/hooks/stores/userFromDBStore";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import DeleteUserButton from "../DeleteUserButton/DeleteUserButton";
import UpdateBasicInfoButton from "../UpdateBasicInfoButton/UpdateBasicInfoButton";

const BasicProfileInfo = () => {
  const { userFromDB, setUserFromDB, userFromDBLoading, setUserFromDBLoading } =
    useUserFromDBStore();

  const { user } = useAuth();
  const { getUserInfoPromise } = useUsersApi();

  useEffect(() => {
    setUserFromDBLoading(true);
    getUserInfoPromise()
      .then((res) => {
        // console.log(user);
        setUserFromDB(res);
        setUserFromDBLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [user]);

  return (
    <div>
      {userFromDBLoading ? (
        <div>
          <LoaderLogoSpinner className={"h-48"} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center my-4 relative">
          <div className="absolute top-0 right-0 z-10">
            <UpdateBasicInfoButton
              showText={false}
            />
          </div>
          <Avatar className="relative w-32 md:w-48 h-32 md:h-48 rounded-xs ring-3 ring-secondary/50 bg-accent/10">
            <AvatarImage src={user.photoURL} className="object-cover" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="font-cinzel text-3xl font-medium">
              {user.displayName}
            </h2>
            <p className="text-sm">{user.email}</p>
          </div>
          <div className="w-full space-y-2">
            <h3 className="font-cinzel">Details</h3>
            <Separator />
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="border-r w-32 md:w-48">
                      Gender
                    </TableCell>
                    <TableCell className="pl-4">
                      {userFromDB?.gender === "unspecified"
                        ? "*Not updated"
                        : userFromDB?.gender === "male"
                        ? "Male"
                        : userFromDB?.gender === "female"
                        ? "Female"
                        : "Prefer Not to Say"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border-r w-32 md:w-48">
                      Phone Number
                    </TableCell>
                    <TableCell className="pl-4">
                      {userFromDB?.phoneNumber ? userFromDB.phoneNumber : "*Not Added"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border-r w-32 md:w-48">
                      Artifacts Liked
                    </TableCell>
                    <TableCell className="pl-4">
                      {userFromDB?.likes?.length}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="w-full space-y-2">
            <h3 className="font-cinzel text-destructive">Danger Zone</h3>
            <Separator />
            <div>
              <span className="text-destructive">Delete Account: </span>
              <DeleteUserButton showText={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicProfileInfo;
