type Props = {
  items: string[];
};

export default function CaseStudyBulletList({ items }: Props) {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-[#3f3f46]">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#a1a1aa]" />
          <span className="leading-7 md:text-lg">{item}</span>
        </li>
      ))}
    </ul>
  );
}