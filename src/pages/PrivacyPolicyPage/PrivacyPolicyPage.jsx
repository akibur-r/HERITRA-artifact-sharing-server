import privacyPolicy from "@/assets/docs/privacyPolicy.json";

const PrivacyPolicyPage = () => {
  return (
    <section className="flex flex-col gap-4 justify-start items-center my-10 max-w-screen-xl mx-auto px-4">
      <header className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">Privacy Policy</h2>
        <p className="text-sm">How we process your data at Heritra</p>
      </header>
      <main className="w-full max-w-3xl space-y-3">
        {privacyPolicy.map((policy) => (
          <div key={policy.title} className="space-y-1">
            <h3 className="text-xl font-medium font-cinzel text-primary">
              {policy.title}
            </h3>
            <p className="text-sm text-muted-foreground">{policy.content}</p>
          </div>
        ))}
      </main>
    </section>
  );
};

export default PrivacyPolicyPage;
