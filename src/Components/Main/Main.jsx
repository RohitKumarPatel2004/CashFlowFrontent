import banner from '..//..//Assets/HeaderImages/banner.png';

export default function LandingPage() {
  return (
    <>
      <section id="main" className=' bg-sky-50 mt-16'>
        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="px-6 lg:px-28 lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold lg:py-20">Unlock Your Potential<br /> And {" "}<span className="text-blue-600">Build Your Future</span></h1>
            <p className="font-semibold mb-4">Explore our flexible learning options and choose the path to<br /> success that suits you best. Start investing in your future today!</p>
            <button className="bg-sky-600 text-white py-2 px-4 font-bold rounded-lg">Get Started</button>
          </div>
          <div className="max-w-full lg:max-w-md pt-4 ">
            <img className="" src={banner} alt="" />
          </div>
        </div>

        <div className="w-full md:pl-8 md:pr-8 lg:pl-28 lg:pr-28 xl:pl-40 xl:pr-40">
          <div className="flex flex-col md:flex-row justify-center md:justify-around bg-white font-bold text-2xl rounded-xl items-center space-y-4 md:space-y-0 md:space-x-8 h-auto md:h-28">
            <div className="flex flex-col items-center">
              <h1>500+</h1>
              <h1>Online Courses</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1>Expert</h1>
              <h1>Instruction</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1>Lifetime</h1>
              <h1>Access</h1>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}