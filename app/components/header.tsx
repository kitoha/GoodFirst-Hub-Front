export default function Header() {
  return (
    <header className="w-full shadow h-64 py-12 flex items-center justify-center border-b border-gray-300">
      <div className="w-full max-w-screen-xl px-4">
        <img
          src="/goodfirsthub-logo.png"
          alt="Good First Hub Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </header>
  );
}
