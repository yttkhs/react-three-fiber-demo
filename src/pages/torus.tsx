import dynamic from 'next/dynamic';

const Torus = dynamic(() => import('@/components/canvas/Torus'), { ssr: false });

export default function Page(props) {}

Page.canvas = (props) => <Torus route='/' />;

export async function getStaticProps() {
    return { props: { title: 'Torus' } };
}
