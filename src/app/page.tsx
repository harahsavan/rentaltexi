import Form from "@/components/form/Form";
import Header from "@/components/layout/header/Header";

export const runtime = "edge";

export default function Home() {
  return (
    <div>
      <Header />
      <Form />
    </div>
  );
}
