import SingleEvent from "./SingleEvent";

const AllEvents: React.FC = () => {
  return (
    <div className='mx-auto max-w-screen-xl'>
      <h1 className='text-center mt-10 text-[#5E47EF] text-3xl font-semibold'>
        All Events Are Displayed Below 
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-10 px-2'>
        <SingleEvent></SingleEvent>
        <SingleEvent></SingleEvent>
        <SingleEvent></SingleEvent>
        <SingleEvent></SingleEvent>
        <SingleEvent></SingleEvent>
        <SingleEvent></SingleEvent>
      </div>
    </div>
  );
};

export default AllEvents;
