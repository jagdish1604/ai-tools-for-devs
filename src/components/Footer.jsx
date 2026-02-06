export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800
                       bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-10
                      flex flex-col md:flex-row
                      items-center justify-between gap-4">

        {/* Left text */}
        <p className="text-sm text-center md:text-left">
          Affiliate Disclosure: Some links on this website are affiliate links.
          If you click and make a purchase, we may earn a commission at no extra cost to you.
        </p>

        {/* Right links */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="/advertise"
            className="hover:text-white transition underline-offset-4 hover:underline"
          >
            Advertise
          </a>

          <span className="text-slate-600">
            © {new Date().getFullYear()} AI Tools for Devs
          </span>
        </div>
      </div>
    </footer>
  );
}
