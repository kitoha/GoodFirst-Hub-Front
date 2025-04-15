export default function Footer() {
    return (
      <footer className="bg-[#f9fafb] border-t border-gray-200 text-gray-500 text-sm w-full">
        <div className="max-w-screen-xl mx-auto px-4 py-6 text-center">
          © {new Date().getFullYear()} Good First Hub. All rights reserved.
        </div>
      </footer>
    );
  }
  