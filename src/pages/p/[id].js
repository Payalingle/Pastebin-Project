import prisma from "../../lib/prisma";

export async function getServerSideProps({ params }) {
  try {
    const paste = await prisma.paste.findUnique({
      where: { id: params.id },
    });

    if (!paste) {
      return { notFound: true };
    }

    return {
      props: {
        content: paste.content,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}

export default function ViewPaste({ content }) {
  return (
    <pre style={{ padding: "2rem", whiteSpace: "pre-wrap" }}>
      {content}
    </pre>
  );
}
