import dynamic from 'next/dynamic'

const Blob = dynamic(() => import('@/components/canvas/Wave'), { ssr: false })

export default function Page(props) {}

Page.canvas = (props) => <Blob route='/' />

export async function getStaticProps() {
  return { props: { title: 'Wave' } }
}
