
export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="p-4 max-w-5xl w-full font-extrabold tracking-tight text-2xl">Meal AI</h1>
      <div className="z-10 w-full max-w-5xl items-center text-sm lg:flex">
        <ul className="px-4 w-full border-b border-gray-300 pb-6 dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <li className="pb-4">
            <div className="pb-1 text-lg font-medium">Monday</div>
            <div className="">Egg Plant - Rich in vitamins, minerals, and dietary fiber, eggplant is a great source of antioxidants and can help reduce the risk of chronic diseases.</div>
          </li>
          <li className="pb-4">
            <div className="pb-1 text-lg font-medium">Tuesday</div>
            <div className="">Soya Chunks - High in protein, soya chunks are a great source of essential amino acids and can help build muscle mass.</div>
          </li>
          <li className="pb-4">
            <div className="pb-1 text-lg font-medium">Wednesday</div>
            <div className="">Chicken - High in protein and low in fat, chicken is a great source of essential vitamins and minerals and can help boost the immune system.</div>
          </li>
          <li className="pb-4">
            <div className="pb-1 text-lg font-medium">Thursday</div>
            <div className="">Paneer - High in calcium and protein, paneer is a great source of essential vitamins and minerals and can help build strong bones and teeth.</div>
          </li>
          <li className="pb-4">
            <div className="pb-1 text-lg font-medium">Friday</div>
            <div className="">Korameenu Fish - Rich in omega-3 fatty acids, korameenu fish is a great source of essential vitamins and minerals and can help reduce the risk of heart disease.</div>
          </li>
          <li className="pb-4">
            <div className="pb-1 text-lg font-medium">Saturday</div>
            <div className="">Cabbage - High in vitamins, minerals, and dietary fiber, cabbage is a great source of antioxidants and can help reduce the risk of chronic diseases.</div>
          </li>
          <li className="pb-4">
            <div className="pb-1 text-lg font-medium">Sunday</div>
            <div className="">Mutton - High in protein and low in fat, mutton is a great source of essential vitamins and minerals and can help boost the immune system.</div>
          </li>
        </ul>
      </div>
    </main>
  )
}
