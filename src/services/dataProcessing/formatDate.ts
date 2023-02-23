import formatDistanceToNowStrict from "date-fns/formatDistanceToNow";

export default function formatDate(dateStr: string) {
  const formattedDate = formatDistanceToNowStrict(new Date(dateStr), { addSuffix: true });
  return formattedDate;
}
