export default async function UserSetting({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className='flex justify-center items-center h-screen'>
      <h1>{id} Page</h1>
    </div>
  );
}
