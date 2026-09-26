export default async function TestLoading() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Page Loaded Successfully ✅
      </h1>
    </div>
  );
}