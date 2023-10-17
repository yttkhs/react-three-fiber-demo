import dynamic from 'next/dynamic';

const Edit = dynamic(() => import('@/components/canvas/Edit'), { ssr: false });

export default function Page(props) {}

Page.canvas = (props) => <Edit route='/' />;

export async function getStaticProps() {
  return { props: { title: 'Edit' } };
}
