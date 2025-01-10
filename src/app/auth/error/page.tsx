import Link from "next/link";

export default async function AuthError() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <h1 className='text-2xl font-bold'>Error</h1>
      <p>sorry try again</p>
      <Link href='/auth/login'>
        <a className='text-blue-500 hover:underline'>
          <Link size='24' />
          Go back
        </a>
      </Link>
    </div>
  );
}
