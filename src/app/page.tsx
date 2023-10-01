'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

import { InputError } from '@/components/InputError'
import { api } from '@/lib/axios'

const loginAdministratorFormSchema = z.object({
  email: z
    .string()
    .nonempty('Informe seu email')
    .email('Formato de email inválido'),

  password: z.string().nonempty('Informe sua senha'),
})

type LoginAdministratorFormData = z.infer<typeof loginAdministratorFormSchema>

export default function Home() {
  const router = useRouter()

  const loginAdministratorForm = useForm<LoginAdministratorFormData>({
    resolver: zodResolver(loginAdministratorFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = loginAdministratorForm

  async function onSubmit(data: LoginAdministratorFormData) {
    try {
      const response = await api.post(
        'https://vitorads.com.br/authentication/authenticate',
        {
          email: data.email,
          password: data.password,
          user_type: 0,
        },
      )

      const token = response.data.token

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      router.push('/dashboard')

      Cookie.set('auth_token', token)

      toast.success('Bem vindo!')
    } catch (error) {
      toast.error('Incorrect credentials.')
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex items-center h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image
            className=""
            src={logo}
            alt="Your Company"
            width={200}
            height={200}
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('email')}
                />
                <div className="h-1 mt-1">
                  <InputError errors={errors.email?.message} />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('password')}
                />
                <div className="h-1 mt-1">
                  <InputError errors={errors.password?.message} />
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a
              // href={process.env.STORE_URL}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Go to the store
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
