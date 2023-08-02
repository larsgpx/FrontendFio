import Head from 'next/head'

export default function HeadTitle({ title, description }) {

  return (
    <>
      <Head>
        <title>{title ? 'Fio | '+ title : 'Fio | Activa tu linea de crédito'}</title>
        <meta name="description" content={description ? description : 'Recibe mensualmente tu linea de efectivo desde S/ 700 con cuotas de 1 semana a 6 meses.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}