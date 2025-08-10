import { useEffect } from "react";

const useDynamicTitle = (pageTitle) => {
  useEffect(() => {
    if(pageTitle==="*homepage") document.title = "Heritra - Timeless Stories";
    else if(pageTitle) document.title = pageTitle + " - Heritra";
    else document.title = "Heritra";
  }, [pageTitle]);
};

export default useDynamicTitle;
