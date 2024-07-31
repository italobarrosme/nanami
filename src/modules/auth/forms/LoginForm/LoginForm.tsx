'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, LoginFormSchemaType } from './LoginFormSchema'
import { InputText, Button } from '@developerskyi/react-components'

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex flex-col gap-4"
    >
      <InputText label="E-mail" type="email" {...register('email')} />
      <InputText label="Senha" type="password" {...register('password')} />
      <Button variant="full/regular" type="submit">
        Entrar
      </Button>
    </form>
  )
}
