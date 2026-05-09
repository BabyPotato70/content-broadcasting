import { STATUS } from '../../utils/constants';

const statusColors = {
  [STATUS.PENDING]: 'bg-gray-100 text-gray-800',
  [STATUS.APPROVED]: 'bg-green-100 text-green-800',
  [STATUS.REJECTED]: 'bg-red-100 text-red-800',
  'Active': 'bg-blue-100 text-blue-800',
  'Scheduled': 'bg-yellow-100 text-yellow-800',
  'Expired': 'bg-gray-100 text-gray-600',
};

export const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100'}`}>
    {status}
  </span>
);