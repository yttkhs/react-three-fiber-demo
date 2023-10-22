import dynamic from 'next/dynamic';

const Ball = dynamic(() => import('@/components/canvas/Ball'), { ssr: false });

export default function Page(props) {}

Page.canvas = (props) => <Ball route='/' />;

export async function getStaticProps() {
  return { props: { title: 'Ball' } };
}
