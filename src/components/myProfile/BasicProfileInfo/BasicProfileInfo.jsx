import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";

const BasicProfileInfo = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex flex-col gap-4 justify-center items-center ">
        <Avatar className="w-32 md:w-48 h-32 md:h-48 rounded-xs border border-primary/20 p-1 bg-accent/10 pb-0">
          <AvatarImage
            src={user.photoURL}
            className="object-contain object-bottom"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-cinzel text-3xl font-medium">{user.displayName}</h2>
        </div>
      </div>
    </div>
  );
};

export default BasicProfileInfo;
