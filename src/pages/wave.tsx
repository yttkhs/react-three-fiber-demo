import dynamic from 'next/dynamic';

const Wave = dynamic(() => import('@/components/canvas/Wave'), { ssr: false });

export default function Page(props) {}

Page.canvas = (props) => <Wave route='/' />;

export async function getStaticProps() {
  return { props: { title: 'Wave' } };
}
