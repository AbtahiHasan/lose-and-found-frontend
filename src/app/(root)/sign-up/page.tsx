import SignUpForm from "@/components/sign-up/SignUpForm";

export const metadata = {
  title: "Sign up - lose and found",
};
const SignUpPage = () => {
  return (
    <main className="my-container flex justify-center items-center h-[calc(100vh-64px)] ">
      <section className=" border backdrop-blur-md p-5 rounded-lg lg:p-10  w-full lg:w-[50%] mx-auto">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <SignUpForm />
      </section>
    </main>
  );
};

export default SignUpPage;
