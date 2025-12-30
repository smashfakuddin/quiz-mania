import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/image/404-computer.svg" alt="" />
      <div className="text-center space-y-3">
        <h3 className=" text-blue-700  text-2xl font-semibold">
          404 Not found
        </h3>
        <h2 className="text-5xl font-semibold">
          Whoops! That page doesn’t exist
        </h2>
        <p>Here are some helpful links instead:</p>
        <div className=" space-x-3 text-blue-600 dark:text-amber-200">
          <Link href={"/"}>Home</Link>
          <Link href={"/admin"}>Admin</Link>
          <Link href={"/login"}>Log In</Link>
        </div>
      </div>
    </div>
  );
}
