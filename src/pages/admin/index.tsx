import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/reservations">
          <a className="block p-4 border rounded bg-gray-100 hover:bg-gray-200">
            Manage Reservations
          </a>
        </Link>
        <Link href="/admin/staff">
          <a className="block p-4 border rounded bg-gray-100 hover:bg-gray-200">
            Assign Staff
          </a>
        </Link>
        <Link href="/admin/waitlist">
          <a className="block p-4 border rounded bg-gray-100 hover:bg-gray-200">
            Promote Passengers
          </a>
        </Link>
      </div>
    </div>
  );
}
