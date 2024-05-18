import { ImageContainer, SuccessContainer } from '@/styles/pages/success'
import Link from 'next/link'

function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer></ImageContainer>
      <p>
        Uhuul <strong>Anilton Junior</strong>, sua <strong>Camiseta X</strong>{' '}
        já está a caminho da sua casa
      </p>

      <Link href={'/'}>Voltar à Página Inicial</Link>
    </SuccessContainer>
  )
}

export default Success
