export default function CharacterCounter({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) {
  const remaining = maxLength - text.length;
  return (
    <span className={remaining < 10 ? 'text-red-500' : 'text-gray-500'}>
      {remaining} characters remaining
    </span>
  );
}
