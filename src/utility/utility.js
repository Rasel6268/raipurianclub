import { Clock, CheckCircle, XCircle, Shield } from "lucide-react";
const getStatusBadge = (status) => {
    const badges = {
      review: { 
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: Clock,
        label: 'Under Review'
      },
      pending: { 
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: Clock,
        label: 'Pending'
      },
      approved: { 
        color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        icon: CheckCircle,
        label: 'Approved'
      },
      rejected: { 
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        icon: XCircle,
        label: 'Rejected'
      },
      active: {
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        icon: Shield,
        label: 'Active'
      }
    };
    return badges[status] || badges.pending;
  };


export default {
  getStatusBadge,
};