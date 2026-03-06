// Toast notification utility (placeholder)
import { toast } from 'react-hot-toast';

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  if (type === 'success') toast.success(message);
  else toast.error(message);
}
