import useUsersApi from "@/api/usersApi";
import ArtifactRow from "@/components/artifacts/ArtifactRow";
import LoaderLogoSpinner from "@/components/shared/LoaderLogoSpinner/LoaderLogoSpinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const LikedArtifactsPage = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [artifactsLoading, setArtifactsLoading] = useState(false);

  const { getLikedArtifacts } = useUsersApi();
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setArtifactsLoading(true);
    getLikedArtifacts(user.email)
      .then((res) => {
        setArtifacts(res);
        console.log(res);
        setArtifactsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArtifactsLoading(false);
      });
  }, []);

  // console.log(artifacts);

  return (
    <section className="flex flex-col gap-4 justify-center items-center my-10 max-w-screen-xl mx-auto px-4">
      {artifactsLoading ? (
        <div className="h-48">
          <LoaderLogoSpinner />
        </div>
      ) : (
        <>
          <header className="max-w-sm text-center">
            <h2 className="text-3xl font-cinzel font-bold">Liked Artifacts</h2>
            <p className="text-sm">Your liked artifacts are listed here.</p>
          </header>
          <main className="w-full">
            <Table>
              <TableCaption>A list of artifacts that you liked.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 hidden md:table-cell">#</TableHead>
                  <TableHead>Artifact</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Discovered By
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Currently At
                  </TableHead>
                  <TableHead className="w-32 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {artifacts.map((artifact, idx) => (
                  <ArtifactRow
                    artifact={artifact}
                    idx={idx + 1}
                    key={artifact._id}
                  />
                ))}
              </TableBody>
            </Table>
          </main>
        </>
      )}
    </section>
  );
};

export default LikedArtifactsPage;
