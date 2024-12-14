import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/add-schedule" className="text-blue-500">
            Add Train Schedule
          </Link>
        </li>
        <li>
          <Link href="/admin/assign-staff" className="text-blue-500">
            Assign Staff
          </Link>
        </li>
        <li>
          <Link href="/admin/view" className="text-blue-500">
            View Train Schedules
          </Link>
        </li>
      </ul>
    </div>
  );
}
