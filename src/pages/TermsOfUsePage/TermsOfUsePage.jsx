import termsOfUse from "@/assets/docs/termsOfUse.json";

const TermsOfUsePage = () => {
  return (
    <section className="flex flex-col gap-4 justify-start items-center my-10 max-w-screen-xl mx-auto px-4">
      <header className="max-w-sm text-center">
        <h2 className="text-3xl font-cinzel font-bold">Terms of Use</h2>
        <p className="text-sm">Conditions for using Heritra</p>
      </header>
      <main className="w-full max-w-3xl space-y-3">
        {termsOfUse.map((term) => (
          <div key={term.title} className="space-y-1">
            <h3 className="text-xl font-medium font-cinzel text-primary">
              {term.title}
            </h3>
            <p className="text-sm text-muted-foreground">{term.content}</p>
          </div>
        ))}
      </main>
    </section>
  );
};

export default TermsOfUsePage;
