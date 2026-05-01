type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="glass-card rounded-[1.35rem] p-5">
          <summary className="cursor-pointer list-none pr-6 text-base font-semibold leading-6 text-white">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-400">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
