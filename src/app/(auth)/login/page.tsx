import { Auth } from '@/modules/auth/Auth'

export default async function Login() {
  return (
    <section className="flex min-h-screen w-screen flex-col items-center justify-center">
      <Auth />
    </section>
  )
}
