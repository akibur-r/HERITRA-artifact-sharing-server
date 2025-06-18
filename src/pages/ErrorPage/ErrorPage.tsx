import useDynamicTitle from "@/hooks/useDynamicTitle";

const ErrorPage = () => {
  useDynamicTitle("Error 404");
  return <div>error 404</div>;
};

export default ErrorPage;
