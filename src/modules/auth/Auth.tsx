import { Text } from '@developerskyi/react-components'
import { LoginForm } from './forms'

export const Auth = () => {
  return (
    <div className="flex h-96 w-full min-w-80 items-center justify-between gap-4 rounded-lg bg-neutral-white shadow-md md:max-w-2xl">
      <div className="flex size-full flex-col items-center justify-center gap-4 p-11">
        <Text tag="h1" variant="3xl/bold" className="text-primary-regular">
          Entrar
        </Text>

        <LoginForm />
      </div>
      <div className="flex size-full items-center justify-center rounded-r-lg bg-primary-regular">
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
