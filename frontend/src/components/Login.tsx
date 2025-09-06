
const Login = () => {
  return (
    <div className="text-center h-screen flex flex-col justify-center items-center bg-purple-50">
      <h1 className="text-purple-600 text-4xl font-bold mb-5">Login to CodeX</h1>
      <form className="flex flex-col gap-4 mt-4 bg-white p-8 rounded-2xl shadow-md w-80">
        <input type="email" placeholder="Email" className="border border-gray-300 p-2 rounded outline-none" />
        <input type="password" placeholder="Password" className="border border-gray-300 p-2 rounded outline-none" />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login