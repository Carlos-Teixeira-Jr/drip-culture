export function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen pb-50 gap-5">
      <div className="w-20 h-20 border-10 border-gray-300 border-t-neutral rounded-full animate-spin"></div>
      <div className="w-[400px] flex justify-center text-neutral">
        <h5>Esta aplicação roda em um servidor gratuito, por isso o primeiro acesso pode levar um pouco mais para carregar.</h5>
      </div>
    </div>
  );
}
