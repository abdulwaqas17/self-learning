export default async function Page({ params }) {
    console.log("========params==========",params);
    
  const { slug } = await params
  return <div>My Post: {slug}</div>
}