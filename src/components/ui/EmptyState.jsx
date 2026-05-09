import { InboxIcon } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({ title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <InboxIcon className="w-16 h-16 text-gray-300 mb-4" />
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-sm text-gray-500 mt-1 mb-6">{description}</p>
    {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
  </div>
);