import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <main className="my-container flex justify-center items-center h-[calc(100vh-64px)] ">
      <section className=" border backdrop-blur-md p-5 rounded-lg lg:p-10  w-full lg:w-[50%] mx-auto">
        <h1>Login</h1>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
