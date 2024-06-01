import LoginForm from "@/components/login/LoginForm";

export const metadata = {
  title: "Login - lose and found",
};

const LoginPage = () => {
  return (
    <main className="my-container flex justify-center items-center h-[calc(100vh-64px)] ">
      <section className=" border backdrop-blur-md p-5 rounded-lg lg:p-10  w-full lg:w-[50%] mx-auto">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
