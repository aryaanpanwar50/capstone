const AppCta = () => {
    return (
      <section className="py-20 bg-gradient-to-br from-[#0b2d72] to-[#0f3b8f] relative">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/600')] bg-center bg-no-repeat bg-cover opacity-10 z-0"></div>
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
              Take Your Gaming Experience On The Go
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Download our mobile app and enjoy thousands of games anywhere, anytime. Stay connected with friends and never miss a gaming challenge.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                <div className="text-3xl">
                  🍎
                </div>
                <div className="text-left">
                  <span className="block text-xs text-white/80">Download on the</span>
                  <span className="block text-lg font-semibold">App Store</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
                <div className="text-3xl">
                  🤖
                </div>
                <div className="text-left">
                  <span className="block text-xs text-white/80">Get it on</span>
                  <span className="block text-lg font-semibold">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default AppCta