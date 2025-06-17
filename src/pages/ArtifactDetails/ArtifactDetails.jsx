import useArtifactsApi from "@/api/artifactsApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ArtifactDetails = () => {
  const { id } = useParams();
  const { getOneArtifactPromise } = useArtifactsApi();
  const [artifactLoading, setArtifactLoading] = useState(false);
  const [artifact, setArtifact] = useState({});
  //   console.log(id);

  useEffect(() => {
    getOneArtifactPromise(id)
      .then((res) => {
        setArtifact(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return <section>
    {artifact.name}
  </section>;
};

export default ArtifactDetails;
