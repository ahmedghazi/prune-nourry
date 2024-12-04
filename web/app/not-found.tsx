import Link from "next/link";

function NotFoundPage() {
  return (
    <div className='page-404'>
      <h1 className='mb-md'>Page not found</h1>
      <Link href='/' className='underline'>
        Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
