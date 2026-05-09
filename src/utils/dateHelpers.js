import { format, isPast, isFuture, isWithinInterval, parseISO } from 'date-fns';

export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    return format(parseISO(dateStr), 'MMM d, yyyy h:mm a');
  } catch {
    return 'Invalid Date';
  }
};

export const getScheduleStatus = (startTime, endTime) => {
  const now = new Date();
  const start = parseISO(startTime);
  const end = parseISO(endTime);

  if (isWithinInterval(now, { start, end })) return 'Active';
  if (isFuture(start)) return 'Scheduled';
  if (isPast(end)) return 'Expired';
  return 'Scheduled';
};