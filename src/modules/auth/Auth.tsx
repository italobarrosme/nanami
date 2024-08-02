import { Text } from '@developerskyi/react-components'
import { LoginForm } from './forms'

export const Auth = () => {
  return (
    <div className="flex size-full h-screen items-center justify-between gap-4 rounded-lg bg-neutral-white shadow-md lg:h-[28rem] lg:max-w-2xl">
      <div className="flex size-full flex-col items-center justify-center gap-4 p-11">
        <Text tag="h1" variant="3xl/light" className="text-primary-regular">
          Noble
        </Text>
        <Text
          tag="h2"
          variant="xl/medium"
          className="text-center text-primary-regular"
        >
          Sistema de Crescimento Pessoal
        </Text>

        <LoginForm />
      </div>
      <div className="hidden size-full items-center justify-center rounded-r-lg bg-primary-regular lg:flex">
        <Text
          tag="p"
          variant="md/light"
          className="max-w-52 text-center text-neutral-white"
        >
          Olá, seja bem-vindo! Informe seu e-mail e senha para entrar na
          plataforma.
        </Text>
      </div>
    </div>
  )
}
