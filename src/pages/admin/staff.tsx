import { useForm } from 'react-hook-form';

export default function AssignStaff() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await fetch('/api/staff-assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Staff assigned successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assign Staff to Train</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('staffId')}
          placeholder="Staff ID"
          className="border p-2 rounded w-full"
        />
        <input
          {...register('trainId')}
          placeholder="Train ID"
          className="border p-2 rounded w-full"
        />
        <input
          {...register('date')}
          type="date"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Assign
        </button>
      </form>
    </div>
  );
}
