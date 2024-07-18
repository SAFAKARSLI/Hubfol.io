import Image from "next/image"


export default function Home() {
  return (
    <div className="flex w-full items-center justify-center bg-hubfolio-bg text-center p-6">
      <Image src="/hubfolio-dark-logo.png" alt="Hubfolio Logo" width={100} height={100} />
      {/* <div className='h-full w-full bg-hubfolio-bg-content ' id="main-content">
        <iframe src='https://www.youtube.com' style={{ width: '100%', height: '100%' }} title="YouTube Video" />
      </div> */}
    </div>
  )
}