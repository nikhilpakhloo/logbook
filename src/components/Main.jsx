import backgroundImage from '../assets/background1.jpg'

const Main = () => {
  return (
    <>
  
    <section className="h-screen md:flex md:w-full justify-between items-center  lg:px-40 px-4 md:py-0 py-4 "    style={{
      backgroundImage: `url(${backgroundImage})`,
 
  
   
    }}>
      <div className="md:w-1/2 w-full  ">
        <div className="md:w-[750px] md:h-[450px]   flex-wrap bg-white rounded-[60px] container bg-opacity-5 shadow-2xl md:py-3 md:px-4 px-6 py-3 flex flex-col justify-between ">
          <div className="flex flex-col gap-y-8">
            <h1 className="md:text-2xl text-xl text-white md:text-start text-center"> Own your Daily Routine</h1>
            <h1 className="md:text-7xl text-5xl text-white md:text-start text-center">
              {" "}
              Universal Pro & <br /> mini
            </h1>
            <h1 className="md:text-2xl text-xl text-white md:text-start text-center">
              {" "}
              DIVEROID | Turn your smartphone into a Dive gear! Kickstarter
              $522,097, Indiegogo Total $1,065,775!!
            </h1>
            <button className="text-white bg-violet-500 px-7 py-2 rounded-3xl ml-4 shadow-violet-drop hover:bg-white hover:text-black w-40  md:self-start self-center">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='w-1/2'></div>
    </section>
    </>
  );
};

export default Main;
