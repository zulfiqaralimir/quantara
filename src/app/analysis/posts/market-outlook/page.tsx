export default function MarketOutlook() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold text-navy">
          Market Outlook
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Published • Quantara Analysis
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="mt-2">
          A high-level overview of current market conditions and key signals.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Key Signals</h2>
        <ul className="mt-2 list-disc pl-6">
          <li>Liquidity trends</li>
          <li>Volatility regimes</li>
          <li>Macro risk factors</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Data & Evidence</h2>
        <p className="mt-2">
          Charts, metrics, and data-backed observations go here.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Conclusion</h2>
        <p className="mt-2">
          What the signals suggest and how to interpret them.
        </p>
      </section>
    </article>
  );
}
