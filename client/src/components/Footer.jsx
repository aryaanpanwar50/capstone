const Footer = () => {
    return (
      <footer className="bg-[#0b2d72] py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-[#06c1ff] rounded-lg flex items-center justify-center text-[#0b2d72] font-bold text-xl">
                  K
                </div>
                <div className="text-2xl font-bold text-white">Khelzy</div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Khelzy is the ultimate destination for free online games. Play instantly without downloads across all devices and challenge your friends.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#06c1ff] hover:text-[#0b2d72]">
                  <span>📱</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#06c1ff] hover:text-[#0b2d72]">
                  <span>📘</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#06c1ff] hover:text-[#0b2d72]">
                  <span>📸</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-[#06c1ff] hover:text-[#0b2d72]">
                  <span>🐦</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-10 after:h-0.5 after:bg-[#06c1ff]">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Home</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">About Us</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Games</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Featured</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-10 after:h-0.5 after:bg-[#06c1ff]">
                Categories
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Action Games</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Adventure Games</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Puzzle Games</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Racing Games</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Sports Games</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-10 after:h-0.5 after:bg-[#06c1ff]">
                Help & Support
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">FAQs</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Terms of Service</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Privacy Policy</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Support Center</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-[#06c1ff] transition-all duration-300 hover:pl-1">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Khelzy. All Rights Reserved.
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer