import LoadingLogoDark from "@/assets/gifs/loading_dark.gif";
import LoadingLogoLight from "@/assets/gifs/loading_light.gif";
const LoaderLogoSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src={LoadingLogoDark} className="hidden dark:block w-fit rounded-2xl h-full" alt="" />
      <img src={LoadingLogoLight} className="dark:hidden w-fit rounded-2xl h-full" alt="" />
    </div>
  );
};

export default LoaderLogoSpinner;
