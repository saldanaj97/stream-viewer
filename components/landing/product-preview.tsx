export default function ProductPreview() {
  return (
    <section className="relative mt-8 flex h-screen w-full items-center justify-center 2xl:px-64">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
        <h2 className="mb-4 text-center text-3xl font-bold">Product Preview</h2>
        <p className="mb-8 text-center text-lg">The preview will go here.</p>
        <div className="justify-cente flex">
          <img
            alt="Product Preview"
            className="w-full max-w-md"
            src="/images/product-preview.png"
          />
        </div>
      </div>
    </section>
  );
}
