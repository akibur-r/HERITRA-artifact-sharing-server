import BasicProfileInfo from "@/components/myProfile/BasicProfileInfo/BasicProfileInfo";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import MyArtifactsPage from "../MyArtifacts/MyArtifactsPage";

const MyProfilePage = () => {
  useDynamicTitle("My Profile");
  return (
    <section className="my-10 space-y-4">
      <header className="flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-cinzel font-bold">My Profile</h2>
        <p className="text-sm max-w-sm">Access and edit your information.</p>
      </header>

      <section className="w-8 mx-auto">
        <Separator className="border-3 rounded-full" />
      </section>

      <main className="flex flex-col gap-4 justify-center items-center max-w-screen-xl mx-auto px-4">
        <Tabs defaultValue="basicInfo" className="w-full">
          <TabsList className="w-full h-fit pb-0 justify-start bg-accent/5">
            <TabsTrigger value="basicInfo">Basic Info</TabsTrigger>
            <Separator orientation="vertical" />
            <TabsTrigger value="myArtifacts">My Artifacts</TabsTrigger>
          </TabsList>
          <TabsContent value="basicInfo">
            <BasicProfileInfo />
          </TabsContent>
          <TabsContent value="myArtifacts">
            <MyArtifactsPage showHeader={false} />
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
};

export default MyProfilePage;
