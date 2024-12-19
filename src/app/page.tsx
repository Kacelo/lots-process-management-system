
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
    {/* Hero Section */}
    <header className="text-center bg-gradient-to-b from-blue-500 to-blue-400 text-white py-16 px-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg max-w-2xl mx-auto">
        A platform to manage your processes, tasks, and analytics efficiently. Join us and simplify your workflow today.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-white text-blue-500 font-medium rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </div>
    </header>

    {/* Features Section */}
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          {/* <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4 mx-auto">
            <Image
              src="/icons/users.svg"
              alt="Users Icon"
              width={32}
              height={32}
              className="dark:invert"
            />
          </div> */}
          <h3 className="text-xl font-bold text-center mb-2 text-gray-600">Manage Users</h3>
          <p className="text-center text-gray-600">
            Easily manage user accounts, roles, and permissions from a centralized dashboard.
          </p>
        </div>
        {/* Feature Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          {/* <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4 mx-auto">
            <Image
              src="/icons/tasks.svg"
              alt="Tasks Icon"
              width={32}
              height={32}
              className="dark:invert"
            />
          </div> */}
          <h3 className="text-xl font-bold text-center mb-2 text-gray-600">Streamline Processes</h3>
          <p className="text-center text-gray-600">
            Track, manage, and update processes with ease. Collaborate effectively with your team.
          </p>
        </div>
        {/* Feature Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          {/* <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4 mx-auto">
            <Image
              src="/icons/analytics.svg"
              alt="Analytics Icon"
              width={32}
              height={32}
              className="dark:invert"
            />
          </div> */}
          <h3 className="text-xl font-bold text-center mb-2 text-gray-600">Advanced Analytics</h3>
          <p className="text-center text-gray-600">
            Gain insights into your data with detailed analytics to make informed decisions.
          </p>
        </div>
      </div>
    </section>
  </div>   
  );
}
