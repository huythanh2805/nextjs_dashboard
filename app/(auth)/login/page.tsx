import { LoginAnimation } from "@/components/animation"
import LoginForm from "@/components/auth/LoginForm"
import AuthCardWrapper from "@/components/AuthCardWrapper"
interface LoginPageProps {
  searchParams: {
    error?: string;
  };
}

const LoginPage: React.FC<LoginPageProps> = async ({searchParams}) => {
  const { error } = searchParams
  return (
    <main className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-slate-400 to-blue-500">
       <section className="max-w-screen-2xl flex items-center justify-between gap-16 ">
        <div className="flex-1">
          <LoginAnimation/>
        </div>
       <AuthCardWrapper title="Login">
        <LoginForm error={error} />
      </AuthCardWrapper>
       </section>
    </main>
  )
}

export default LoginPage