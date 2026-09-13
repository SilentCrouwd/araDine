import { Link } from "react-router";

function Root() {
  return (
    <div className="min-h-screen bg-background text-foreground lg:max-w-250 lg:mx-auto">
      <h1
        className="text-4xl font-bold text-center my-12 underline decoration-foreground decoration-3
    "
      >
        AraDine
      </h1>
      <div className=" flex flex-col items-center gap-4 px-10">
        <Link
          to="/araDine/order"
          className=" w-40 text-center text-xl bg-accent-foreground text-accent px-4 py-2 rounded-md hover:bg-accent-foreground/70"
        >
          <p>Place Order</p>
        </Link>
        <Link
          to="/araDine/dashboard"
          className=" w-40 text-center text-xl bg-accent-foreground text-accent px-4 py-2 rounded-md hover:bg-accent-foreground/70"
        >
          To Dashboard
        </Link>
      </div>
    </div>
  );
}
export default Root;
