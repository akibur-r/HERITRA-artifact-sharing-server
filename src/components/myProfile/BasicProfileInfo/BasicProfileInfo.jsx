import useUsersApi from "@/api/usersApi";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import DeleteUserButton from "../DeleteUserButton/DeleteUserButton";
import UpdateBasicInfoButton from "../UpdateBasicInfoButton/UpdateBasicInfoButton";

const BasicProfileInfo = () => {
  const [basicProfileInfoLoading, setBasicProfileInfoLoading] = useState(false);
  const [userFromDB, setUserFromDB] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const { user } = useAuth();
  const { getUserInfoPromise } = useUsersApi();

  useEffect(() => {
    setBasicProfileInfoLoading(true);
    getUserInfoPromise()
      .then((res) => {
        // console.log(user);
        setUserFromDB(res);
        setBasicProfileInfoLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [user, profileUpdated]);

  return (
    <div>
      {basicProfileInfoLoading ? (
        <div className="h-48">
          <LoaderLogoSpinner />
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center my-4 relative">
          <div className="absolute top-0 right-0 z-10">
            <UpdateBasicInfoButton
              setProfileUpdated={setProfileUpdated}
              showText={false}
            />
          </div>
          <Avatar className="relative w-32 md:w-48 h-32 md:h-48 rounded-xs ring-3 ring-secondary/50 bg-accent/10">
            <AvatarImage
              src={user.photoURL}
              className="object-cover"
            />
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
                      {user.phoneNumber ? user.phoneNumber : "*Not Added"}
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
              <DeleteUserButton showText={false}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicProfileInfo;
