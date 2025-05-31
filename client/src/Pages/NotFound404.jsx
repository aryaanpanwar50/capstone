export default function NotFound404() {
  return (
    <section className="py-10 bg-white font-serif">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl text-center">
            <div
              className="h-[400px] bg-center bg-no-repeat bg-cover flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              }}
            >
              <h1 className="text-6xl md:text-8xl font-bold">404</h1>
            </div>

            <div className="mt-[-50px]">
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                Look like you're lost
              </h3>
              <p className="text-gray-600 mb-4">
                The page you are looking for is not available!
              </p>
              <a
                href="/home"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
